const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) console.log(err);
//   else console.log(ip);
// });

// fetchCoordsByIP("aaa.90.211", (err, coords) => {
//   if (err) console.log(err);
//   else console.log(coords);
// });

// fetchISSFlyOverTimes({latitude: 43.6667, longitude: -79.3804}, (err, coords) => {
//   if (err) console.log(err);
//   else console.log(coords);
// });

const printTimes = (times) => {
  for(const time of times){
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds`);
  }
};


nextISSTimesForMyLocation((err, passTimes) => {
  if(err) return console.log(err);
  printTimes(passTimes);
});