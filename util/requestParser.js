const { get, camelCase } = require('lodash');

module.exports = (request) => {
  const  error = [];

  let stationTo = camelCase(get(request, 'body.to', null));
  if (!stationTo) {
    stationTo = camelCase(get(request, 'queryStringParameters.to', null));
    if (!stationTo) {
      error.push('destination station not defined');
    }
  }

  let stationFrom = camelCase(get(request, 'body.from', null));
  if (!stationFrom) {
    stationFrom = camelCase(get(request, 'queryStringParameters.from', null));
    if (!stationFrom) {
      error.push('destination station not defined');
    }
    error.push('origin station not defined');
  }

  if (error.length >= 1) {
    throw error.join(', ');
  }

  return {
    stationFrom,
    stationTo
  }
};
