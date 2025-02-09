#include <drogon/drogon.h>
#include <drogon/HttpClient.h>
#include <nlohmann/json.hpp>
#include <vector>
#include <map>
#include <algorithm>

using namespace drogon;
using json = nlohmann::json;

// Arbitrage calculation structure
struct ArbitrageOpportunity {
    std::string event_id;
    std::string market_type;
    double profit_margin;
    std::map<std::string, std::pair<std::string, double>> best_odds; // outcome: (bookmaker, odds)
    std::map<std::string, double> stake_percentages;
    double total_investment;
    double guaranteed_return;
};

class ArbitrageCalculator {
public:
    static std::vector<ArbitrageOpportunity> findOpportunities(const json& events) {
        std::vector<ArbitrageOpportunity> opportunities;
        
        for (const auto& event : events) {
            // Process Moneyline markets
            auto moneylineOpp = processMarket(event, "moneyline");
            if (moneylineOpp.profit_margin > 0) {
                opportunities.push_back(moneylineOpp);
            }

            // Process Totals markets
            auto totalsOpp = processMarket(event, "total");
            if (totalsOpp.profit_margin > 0) {
                opportunities.push_back(totalsOpp);
            }
        }
        
        return opportunities;
    }

private:
    static ArbitrageOpportunity processMarket(const json& event, const std::string& marketType) {
        ArbitrageOpportunity opp;
        opp.event_id = event["id"].get<std::string>();
        opp.market_type = marketType;
        
        std::map<std::string, std::pair<double, std::string>> bestOdds;
        
        // Find best odds for each outcome
        for (const auto& outcome : event["markets"][marketType]["outcomes"]) {
            std::string outcomeType = outcome["type"].get<std::string>();
            for (const auto& bookmaker : outcome["bookmakers"]) {
                double currentOdds = bookmaker["odds"].get<double>();
                if (currentOdds > bestOdds[outcomeType].first) {
                    bestOdds[outcomeType] = {currentOdds, bookmaker["name"].get<std::string>()};
                }
            }
        }

        // Calculate arbitrage potential
        double totalImpliedProbability = 0.0;
        for (const auto& [outcome, oddsInfo] : bestOdds) {
            totalImpliedProbability += 1.0 / oddsInfo.first;
            opp.best_odds[outcome] = {oddsInfo.second, oddsInfo.first};
        }

        if (totalImpliedProbability < 1.0) {
            opp.profit_margin = (1.0 - totalImpliedProbability) * 100;
            calculateStakes(opp, totalImpliedProbability);
        }
        
        return opp;
    }

    static void calculateStakes(ArbitrageOpportunity& opp, double totalProbability) {
        const double totalInvestment = 100.0; // Base calculation on $100
        opp.total_investment = totalInvestment;
        opp.guaranteed_return = totalInvestment / totalProbability;
        
        for (const auto& [outcome, oddsInfo] : opp.best_odds) {
            double stake = (1.0 / oddsInfo.second) / totalProbability * totalInvestment;
            opp.stake_percentages[outcome] = stake;
        }
    }
};

class ArbitrageController : public drogon::HttpController<ArbitrageController> {
public:
    METHOD_LIST_BEGIN
    ADD_METHOD_TO(ArbitrageController::calculate, "/arbitrage", Get);
    METHOD_LIST_END

    void calculate(const HttpRequestPtr& req,
                   std::function<void(const HttpResponsePtr&)>&& callback) const {
        // Fetch odds from your existing endpoint
        auto client = HttpClient::newHttpClient("http://localhost:8080"); // Your odds API endpoint
        auto request = HttpRequest::newHttpRequest();
        request->setPath("/odds");
        request->setMethod(Get);

        client->sendRequest(request, [callback](ReqResult result, const HttpResponsePtr& response) {
            if (result != ReqResult::Ok || response->getStatusCode() != k200OK) {
                auto errorResp = HttpResponse::newHttpResponse();
                errorResp->setStatusCode(k500InternalServerError);
                errorResp->setBody("Error fetching odds data");
                callback(errorResp);
                return;
            }

            try {
                json oddsData = json::parse(response->getBody());
                auto opportunities = ArbitrageCalculator::findOpportunities(oddsData["events"]);
                
                json result;
                for (const auto& opp : opportunities) {
                    json opportunityJson;
                    opportunityJson["event_id"] = opp.event_id;
                    opportunityJson["market_type"] = opp.market_type;
                    opportunityJson["profit_margin"] = opp.profit_margin;
                    opportunityJson["total_investment"] = opp.total_investment;
                    opportunityJson["guaranteed_return"] = opp.guaranteed_return;

                    json bestOddsJson;
                    for (const auto& [outcome, oddsInfo] : opp.best_odds) {
                        bestOddsJson[outcome] = {
                            {"bookmaker", oddsInfo.first},
                            {"odds", oddsInfo.second}
                        };
                    }
                    opportunityJson["best_odds"] = bestOddsJson;

                    json stakesJson;
                    for (const auto& [outcome, stake] : opp.stake_percentages) {
                        stakesJson[outcome] = stake;
                    }
                    opportunityJson["stake_allocation"] = stakesJson;

                    result.push_back(opportunityJson);
                }

                auto resp = HttpResponse::newHttpJsonResponse(result);
                callback(resp);
            } catch (const std::exception& e) {
                auto errorResp = HttpResponse::newHttpResponse();
                errorResp->setStatusCode(k500InternalServerError);
                errorResp->setBody(std::string("Error processing data: ") + e.what());
                callback(errorResp);
            }
        });
    }
};

int main() {
    app().registerController(std::make_shared<ArbitrageController>());
    app().addListener("0.0.0.0", 8080);
    app().setThreadNum(4);
    app().run();
}