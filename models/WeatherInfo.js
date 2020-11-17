var WeatherInfo = function(options){

  this.time_summary = options.time_summary;
  this.lowest_tempature = options.lowest_tempature;
  this.highest_tempature = options.highest_tempature;
  this.precipitation = options.precipitation;
  this.feel= options.feel;
  this.location = options.location;
  this.start_time = options.start_time
  this.end_time= options.end_time;
};

WeatherInfo.get = function(params, callback) {
  values = []
  sql = `SELECT * FROM WEATHER WHERE 1=1`;
  for(entry of Object.entries(params)) {
    if(entry[0]== 'records') continue;
    sql += ` AND ${entry[0]} = ?`;
    values.push(entry[1]);
  }
  if(params['records']) {
    sql += ` ORDER BY start_time DESC LIMIT ${params['records']};`
  }
  else {
    sql += ` ORDER BY start_time DESC LIMIT 100;`; 
  }
  //sql = "SELECT * FROM WEATHER WHERE location = ? ORDER BY start_time DESC LIMIT 100";
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    callback(null, result)
  });
}

module.exports = WeatherInfo;

