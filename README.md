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
│   README.md
│   file001.txt    
│
└───folder1
│   │   file011.txt
│   │   file012.txt
│   │
│   └───subfolder1
│       │   file111.txt
│       │   file112.txt
│       │   ...
│   
└───folder2
    │   file021.txt
    │   file022.txt
```
.
+-- _config.yml
+-- _drafts
|   +-- begin-with-the-crazy-ideas.textile
|   +-- on-simplicity-in-technology.markdown
+-- _includes
|   +-- footer.html
|   +-- header.html
+-- _layouts
|   +-- default.html
|   +-- post.html
+-- _posts
|   +-- 2007-10-29-why-every-programmer-should-play-nethack.textile
|   +-- 2009-04-26-barcamp-boston-4-roundup.textile
+-- _data
|   +-- members.yml
+-- _site
+-- index.html
.
├── app.js  # Main progrgram run cronJob for crawling every 1 hour.

├── config.json # Settings

├── package.json  # npm package

├── swagger.json  # Swagger Sturcture

├── _crawler

│   ├── crawl.js  # Crawl from central weather and insert record.

│   └── ts_compare.js # Compare the reocrd of lastest time from database. If it is latest, it won't insert the new record

├── _libs

│   └── db.js # db settings

└── _models
    └── WeatherInfo.js # Schema as ORM for recording data
    
