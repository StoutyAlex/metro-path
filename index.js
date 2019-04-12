require('dotenv').config();
const { send, error } = require('./util/response');
const pathFinder = require('./pathFinder');

exports.handler = async (event, context, callback) => {
  send(callback, await pathFinder(event.to, event.from));
};