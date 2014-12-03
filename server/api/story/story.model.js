'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
   	User = require('../user/user.model').schema;

var StorySchema = new Schema({
  name: String,
  active: {type: Boolean, default: true},
  date: {type: Date, default: Date.now}
});

//

StorySchema.methods = {
	// joinRoom: function(stories, roomId){
	// 	User.findById(req.user._id, function(err, user){
	// 		this.rooms.push(roomId)
	// 		for (var i = 0; i < this.rooms.length; i++){
	// 			socket.join(this.rooms[i])
	// 		} 
	// 	})
	// }
}

// StorySchema.index({ name: 'text'}, {weights: {name: 1}});

module.exports = mongoose.model('Story', StorySchema);