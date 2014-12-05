/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Alchemy = require('./alchemy.model');

exports.register = function(socket) {
  Alchemy.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Alchemy.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('alchemy:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('alchemy:remove', doc);
}