# ShouldBeWinnable

Matched betting project 

Sports betting does not have to be gambling; using matched betting, there is a guaranteed way to always turn a profit.
The basic idea is to bet on both sides of a head to head bet, no matter what happens, your bet will always hit.
However, implementing this is not so simple, the winnings are always taxed by the bookmaker, so the winning must also beat this tax.

There are two main ideas:

1. Using free credits: 
Betting services often give away free credits. We can use the free credits on multiple different services to guarantee extract value from these.

2. Arbitraging: Finding discrepencies in different matchbooks' odds:
Sometimes, different services may have different odds for the same event, and thus different payouts. We can find and use these discrepencies to make a profit.

Some Screenshots from the App:

![landing page of Should Be Winnable](https://github.com/blustix/ShouldBeWinnable/blob/main/shouldBeWinnable/images/landingpage.png "Graph 1")

![Getting Started Section of Should Be Winnable](https://github.com/blustix/ShouldBeWinnable/blob/main/shouldBeWinnable/images/landingpage2.png "Graph 2")

How to Use

Free Credits:
Insert the necessary information, how many credits you have, and on which sportsbooks
Use calculator to maximize extracted value, turning free credits into real money

Arbitrage:
WIP: Limited by API calls from the platform I am using, coverage is not yet ideal.
Automatically calls API to check for latest odds at certain time intervals.
Notifications are sent out when opportunities are found, must act quickly as odds for these may change quickly.
Note: Backend code out of date, working on adding features to avoid getting caught.

Running locally: Need to set your own API key. I'm using the-odds-api but there are other choices as well
Docker should take care of all of the yucky C++ overhead, but there might be a bunch of local stuff I did that's not documented
Built originally on windows, definitely would not recommend 💀
