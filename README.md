# WeatherInfo

A nodejs module for crawling weather information and present by Swagger.


## Usage 

```
npm install
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
|   │   WeatherInfo.js # Schema for recording data
|
|
|
└───libs
    |   db.js  # database setting
```
