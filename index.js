require('dotenv').config();
const { send, error } = require('./util/response');
const pathFinder = require('./pathFinder');
const requestParser = require('./util/requestParser');

exports.handler = async (event, context, callback) => {
  try {
    const { stationTo, stationFrom } = requestParser(event);
    send(callback, await pathFinder(stationTo, stationFrom));
  } catch (err) {
    console.log(err);
    error(callback, err);
  }
};