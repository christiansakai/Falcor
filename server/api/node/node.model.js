'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NodeSchema = new Schema({
  text: String,
  likes: {type: Number, default: 0},
  children: [{type: Schema.Types.ObjectId, ref: 'Node'}],
  ancestors: [{type: Schema.Types.ObjectId, ref: 'Node'}],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  isPrivate: {type: Boolean, default: false}, 
  firstNode: {type: Boolean, default: false},
  parentId: {type: Schema.Types.ObjectId, ref: 'Node'},
  date: {type: Date, default: Date.now}, 
  storyId: {type: Schema.Types.ObjectId, ref: 'Story'}
});

// NodeSchema.methods.sortNodes = function(){

// }


module.exports = mongoose.model('Node', NodeSchema);