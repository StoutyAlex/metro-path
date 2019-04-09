const _ = require('lodash');

const stations = require('../data/stations');
const services = require('../data/services');

const changingStops = [
  "cornbrook",
  "stPetersSquare",
  "deansgateCastlefield",
  "piccadilly",
  "piccadillyGardens",
  "stWerburghsRoad",
  "traffordBar",
  "victoria"
];

const intersection = (setA, setB) => {
  let _intersection = new Set();
  for (let elem of setB) {
      if (setA.has(elem)) {
          _intersection.add(elem);
      }
  }
  return _intersection;
}

const hasValidServiceForRoute = (from, to, services) => {

}

const findStationsWithService = (stationFrom, stationTo) => {
  const stationWithFromService = [];
  const stationWithToService = [];
  const stationFromService = stationFrom.service;
  const stationToService = stationTo.service;

  changingStops.forEach(station => {
    const changingStopService = new Set(stations[station].service);
    const stationFromConnectingStop = intersection(new Set(stationFromService), changingStopService);
    const stationToConnectingStop = intersection(new Set(stationToService), changingStopService);

    if (stationFromConnectingStop.size != 0) {
      stationWithFromService.push(station);
    }

    if (stationToConnectingStop.size != 0) {
      stationWithToService.push(station);
    }
  });
  return [...intersection(new Set(stationWithFromService), new Set(stationWithToService))];
};

const stationFrom = stations['ladywell'];
const stationTo = stations['bury'];

console.log(findStationsWithService(stationFrom, stationTo));