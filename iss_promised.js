const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = (body) => {
  const raw = JSON.parse(body);
  const lat = raw.latitude;
  const long = raw.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    })
}

const printTimes = (times) => {
  for(const time of times){
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds`);
  }
};

module.exports = {nextISSTimesForMyLocation, printTimes};