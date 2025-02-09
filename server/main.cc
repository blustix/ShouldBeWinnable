#include <iostream>
#include <cstdlib>
#include <cstring>
#include <curl/curl.h>
#include <memory>



// Structure to hold response data
struct ResponseData {
    std::string content;
};

// Write callback for CURL
static size_t WriteCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    size_t realsize = size * nmemb;
    ResponseData* data = static_cast<ResponseData*>(userp);
    data->content.append(static_cast<char*>(contents), realsize);
    return realsize;
}

std::string getOddsApiResponse(const std::string& url) {
    CURL* curl;
    CURLcode res;
    std::string readBuffer;
    ResponseData responseData;

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    
    if(curl) {
        std::string fullUrl = url + "?api_key=" + API_KEY;
        
        curl_easy_setopt(curl, CURLOPT_URL, fullUrl.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
        
        res = curl_easy_perform(curl);
        
        if(res != CURLE_OK) {
            std::cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << std::endl;
        }
        
        curl_easy_cleanup(curl);
    }
    
    curl_global_cleanup();
    return responseData.content;
}

int main() {
    std::string response = getOddsApiResponse("https://api.the-odds-api.com/v4/sports");
    std::cout << response << std::endl;
    return 0;
}
