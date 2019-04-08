const _ = require('lodash');

const stations = require('../data/stations.json');
const services = require('../data/services.json');

const intersection = (setA, setB) => {
  let _intersection = new Set();
  for (let elem of setB) {
      if (setA.has(elem)) {
          _intersection.add(elem);
      }
  }
  return _intersection;
}

module.exports = (from, to) => {
  const toServices = new Set(stations[to].service);
  const fromServices = new Set(stations[from].service);
  let intersectionServices = [...intersection(toServices, fromServices)];
  console.log(intersectionServices);

  var current = stations[from];
  var changeAt = 'same line';
  let i = 0;

  while(intersectionServices.length === 0 && i != 10) {
    console.log('Checking ', current.east);
    let nextStop = stations[current.east];
    const nextStopServices = new Set(nextStop.service);
    intersectionServices = [...intersection(nextStopServices, toServices)];
    if (intersectionServices.length != 0) {
      changeAt = current.east;
      console.log(changeAt);
    }
    i++;
    current = nextStop;
  }

  return changeAt;
};