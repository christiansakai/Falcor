'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NodeSchema = new Schema({
  text: String,
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  children: [{type: Schema.Types.ObjectId, ref: 'Node'}],
  ancestors: [{type: Schema.Types.ObjectId, ref: 'Node'}],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  isPrivate: {type: Boolean, default: false}, 
  firstNode: {type: Boolean, default: false},
  parentId: {type: Schema.Types.ObjectId, ref: 'Node'},
  date: {type: Date, default: Date.now}, 
  storyId: {type: Schema.Types.ObjectId, ref: 'Story'}
});

NodeSchema.methods = {

  likeNodes: function(obj, callback){
    if (this.likes.indexOf(obj.userId) === -1){
      this.likes.push(obj.userId)
      this.save(callback)
    }
    else {
      callback(this)
    }
  }
}

NodeSchema.set('toJSON', {
  virtuals: true
});


//cannot sort by virtuals for obvious reasons so sorting on front end
NodeSchema.virtual('numLikes').set(function(){
  return this.likes.length;
}).get(function(){
  return this.likes.length;
}); 

NodeSchema.index({ text: 'text'}, {weights: {name: 1}});

module.exports = mongoose.model('Node', NodeSchema);