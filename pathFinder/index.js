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
  const intersectionServices = [...intersection(toServices, fromServices)];

  console.log(intersectionServices);
};