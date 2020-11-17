const sql = "INSERT INTO WEATHER (time_summary, lowest_tempature, highest_tempature, precipitation, feel, location, start_time, end_time) VALUES ?;";
var values = [];

var crawl_insert = function(location_array=['%E6%96%B0%E5%8C%97%E5%B8%82', '%E6%A1%83%E5%9C%92%E5%B8%82', '%E8%87%BA%E5%8C%97%E5%B8%82']) {
    location_array.forEach(location => 
      request(
        {
          url : 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?locationName='+location+'&offset=0&format=JSON&limit=1',
          headers : {
              "Authorization" : config.token
          },
          method: "GET"
        },
        function (error, response, body) {
          if(error || !body) {
            console.log(error);
          }

          let time_summary = JSON.parse(body)['records']['location'][0]['weatherElement'][0]['time'][0]['parameter']['parameterName'];
          let lowest = JSON.parse(body)['records']['location'][0]['weatherElement'][2]['time'][0]['parameter']['parameterName'];
          let highest = JSON.parse(body)['records']['location'][0]['weatherElement'][4]['time'][0]['parameter']['parameterName'];
          let precipitation = JSON.parse(body)['records']['location'][0]['weatherElement'][1]['time'][0]['parameter']['parameterName'];
          let feel = JSON.parse(body)['records']['location'][0]['weatherElement'][3]['time'][0]['parameter']['parameterName'];
          let place = JSON.parse(body)['records']['location'][0]['locationName'];
          let st_time = JSON.parse(body)['records']['location'][0]['weatherElement'][0]['time'][0]['startTime'];
          let end_time = JSON.parse(body)['records']['location'][0]['weatherElement'][0]['time'][0]['endTime'];

          values.push([time_summary, lowest, highest, precipitation, feel, place, st_time, end_time]);
          if(values.length==location_array.length) insert();
        }
        )
    );  
    function insert() {
        db.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log('Number of records inserted: ' + result.affectedRows);
            values = [];
          });  
    }
    
};

module.exports = crawl_insert;

