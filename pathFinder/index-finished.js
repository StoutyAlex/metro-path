const _ = require('lodash');

const stations = require('../data/stations');

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

const stationFromName = 'ladywell';
const stationToName = 'ashtonUnderLyne';

const stationFrom = stations[stationFromName];
const stationTo = stations[stationToName];

const stopToTake = findStationsWithService(stationFrom, stationTo).map(station => {
  const mappedStation = {};
  mappedStation.stops = stationFrom.connectingStationStops[station];
  mappedStation.name = station;
  return mappedStation;
}).sort((station1, station2) => {
  if (station1.stops > station2.stops) return 1;
  if (station1.stops < station2.stops) return -1;
  return 0
});

const stopsFromChangingStation = stationTo.connectingStationStops[stopToTake[0].name];

const result = {
  startLocation: stationFromName,
  endLocation: stationToName,
  changeAt: stopToTake[0].name,
  stopsTillChange: stopToTake[0].stops,
  stopsAfterChange: stopsFromChangingStation,
};

console.log(result);