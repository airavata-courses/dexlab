cURL request for APIs for Dashboard:

1. Fetch radar API:-

Request-type- 'GET'
URL - localhost:3001/radar/get

Header:-
uniqueid: c0696a04-be8a-5f18-84e2-dcb565dc18c6
date: 2022-01-30

2. Plot API:-

Request-type - 'POST'
URl - localhost:3001/radar/plot

Body-
{
"date": "2022-01-05",
"radar": "KTLX"
}
