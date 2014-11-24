'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NodeSchema = new Schema({
  text: String,
  likes: Number,
  children: [{type: Schema.Types.ObjectId, ref: 'Node'}],
  ancestors: [{type: Schema.Types.ObjectId, ref: 'Node'}],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  isPublic: Boolean, 
  firstNode: Boolean
});

module.exports = mongoose.model('Node', NodeSchema);