const { send, error } = require('./util/response');
const pathFinder = require('./pathFinder/older_index');

exports.handler = (event, context, callback) => {
  send(callback, pathFinder(event.from, event.to));
};