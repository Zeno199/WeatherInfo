/*var ts_compare = function (watermark, location='%E8%87%BA%E5%8C%97%E5%B8%82', cb) {
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
        let st_time = JSON.parse(body)['records']['location'][0]['weatherElement'][0]['time'][0]['startTime'];
        if(st_time) {
          watermark = watermark.replace(/"/g, '');
          if(watermark==st_time) cb(true);
          else {
            cb(false);
          }
        }
      });
}*/

var ts_compare = async function(watermark, location='%E8%87%BA%E5%8C%97%E5%B8%82') {
  const options = {
    url : 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?locationName='+location+'&offset=0&format=JSON&limit=1',
    headers : {
        "Authorization" : config.token
    },
    method: "GET"
  };

  return new Promise(function(resolve) {
    request.get(options, function(error, response, body) {
      if(error || !body) console.log(error);

      let st_time = JSON.parse(body)['records']['location'][0]['weatherElement'][0]['time'][0]['startTime'];
      if(st_time) {
        watermark = watermark.replace(/"/g, '');
        if(watermark==st_time) resolve(true);
        else resolve(false);
      }
    });
  });
}

module.exports = ts_compare;