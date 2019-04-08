const { send, error } = require('./util/response');

exports.handler = (event, context, callback) => {
  send(callback, {
    hello: 'world',
  })
};