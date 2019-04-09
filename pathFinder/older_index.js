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

const getPossibleStations = station => {
  const possibleStations = {};
  possibleStations.east = [...station.east];
  possibleStations.west = [...station.west];
  return possibleStations;
};

const doesStationHaveService = (station, desiredServices) => {
  const intersectedStation = [...intersection(new Set(station.service), new Set(desiredServices))];
  return intersectedStation.length >= 1;
};

const traverseEast = (station, desiredService) => {
  const possibilities = [];
  let intersectedStation = [];
  let currentStation = station;

  currentStation.east.forEach((station) => {
    console.log(station);
    if (doesStationHaveService(stations[station], desiredService)) {
      possibilities.push(station);
    } else {
      let secondLevelStation = stations[station];
      secondLevelStation.east.forEach((secondStation) => {
        console.log(secondStation);
        if (doesStationHaveService(secondLevelStation, desiredService)) {
          possibilities.push(secondStation);
        } else {
          let thirdLevelStation = stations[secondStation];
          thirdLevelStation.east.forEach((thirdStation) => {
            console.log(thirdStation);
            if (doesStationHaveService(thirdLevelStation, desiredService)) {
              possibilities.push(thirdStation);
            }
          })
        }
      });
    }
  });
  console.log(possibilities);
};

module.exports = (from, to) => {
  const toStation = stations[to];
  const fromStation = stations[from];
  const desiredService = toStation.service;
  const fromService = fromStation.service;

  let possibleStations = getPossibleStations(fromStation);
  
  const test = traverseEast(fromStation, desiredService);
  let possibilities = [];
  let currentStation = fromStation;
  let stopper = 0;
  while (possibilities.length === 0 && stopper != 10) {
    possibilities.push(...traverseEast(fromStation, desiredService));
    currentStation = stations[fromStation.east[0]];
    stopper++;
  }
};