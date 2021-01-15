const {nextISSTimesForMyLocation, printTimes} = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(times => printTimes(times))
  .catch(err => console.log("Error: ", err.message));