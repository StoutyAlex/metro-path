const { send, error } = require('./util/response');
const pathFinder = require('./pathFinder');

exports.handler = (event, context, callback) => {
  send(callback, pathFinder(event.to, event.from));
};