# WeatherInfo

A nodejs module for crawling weather information and present by Swagger.

http://54.150.93.188:3000/api-docs/?fbclid=IwAR1lEYjtWin0GaxRgkB8kNSCZQ0OrurBi_RNMG2dqMUDowZ-LhuQU1WsF6w#/Weather%20information/get_weather

## Usage 

```
node app.js
```

## Structure

```
project
│   app.js  # Main progrgram run cronJob for crawling every 1 hour.
|   config.json # Settings
|   package.json  # npm package
|   swagger.json  # Swagger Sturcture
│
└───crawler
│   │   crawl.js  # Crawl from central weather and insert record.
│   │   ts_compare.js # Compare the reocrd of lastest time from database. If it is latest, it won't insert the new record
│
│   
└───models
|   │   WeatherInfo.js # Schema as ORM for recording data
|
|
|
└───libs
    |   db.js  # database setting
```
