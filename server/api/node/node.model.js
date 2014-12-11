'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NodeSchema = new Schema({
  text: String,
  likes: {
    numLikes: {type: Number, default: 0}, //is there a reason for this field? do you query by it? can't you just access length of the likedBy array
    likedBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
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
    if (this.likes.likedBy.indexOf(obj.userId) === -1){
      this.likes.likedBy.push(obj.userId)
      this.likes.numLikes = this.likes.likedBy.length; 
      this.save(callback) //this will likely break things because err will be param 1. you'll have to refactor whatever uses this method
    }
    else {
      callback(this)
    }
  }
}

NodeSchema.index({ text: 'text'}, {weights: {name: 1}});

module.exports = mongoose.model('Node', NodeSchema);
