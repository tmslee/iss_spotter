const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) callback(error, null);
    else {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
      } else {
        let ip = JSON.parse(body).ip;
        callback(null, ip);
      }
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, resp, body) => {
    if (err) callback(err, null);
    else if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP geolocation info. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const raw = JSON.parse(body);
      const coord = {latitude: raw.latitude, longitude: raw.longitude};
      callback(null, coord);
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, resp, body) => {
    if (err) callback(err, null);
    else if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP geolocation info. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const times = JSON.parse(body).response;
      callback(null, times);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) return console.log(err);
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) return console.log(err);
      fetchISSFlyOverTimes(coords, (err, times) => {
        if (err) return console.log(err);
        callback(null, times);  
       });
    });
  });
}

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};