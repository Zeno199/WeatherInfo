/*
 require modules
*/
const cron = require('node-cron');
const express = require('express');
const WeatherInfo = require('./models/WeatherInfo');
const crawl_insert  = require('./crawler/crawl');
const ts_compare  = require('./crawler/ts_compare');
const config = require('./config.json');
global.config = require('./config.json');
const db = require('./libs/db');
global.db = db;
const request = require('request');
global.request = request;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const mappingDict = {
    '桃園': '桃園市',
    '新北': '新北市',
    '台北': '臺北市',
    '台北市': '臺北市',
    'Taipei': '臺北市',
    'New Taipei': '新北市',
    'Taoyuan': '桃園市'
};

var app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


cron.schedule('*/60 * * * *', function() {
    params = {'location': '臺北市'};
    WeatherInfo.get(params, function(err, result) {
        if(err) {
          res.status = err.code;
          res.status(err.code).send(err.toString());
        }
        else{
            watermark = JSON.stringify(result[0]['start_time'])
            ts_compare(watermark, '%E8%87%BA%E5%8C%97%E5%B8%82')
            .then((data)=> {
                if(data == true)  {
                    console.log('Repeat data, No update');
                }
                else {
                    crawl_insert();
                }
            });
            /*ts_compare(watermark, '%E8%87%BA%E5%8C%97%E5%B8%82', function(data){
                if(data == true)  {
                    console.log('Repeat data, No update');
                }
                else {
                    crawl_insert();
                }
            });*/
        }
      });
});
  
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/weather', (req, res) => {
    var params = req.query;
    if(params['location']) params['location'] = mappingDict[params['location']];
    WeatherInfo.get(params, function(err, result) {

        if(err) {
          res.status = err.code;
          res.status(err.code).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
      });
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
