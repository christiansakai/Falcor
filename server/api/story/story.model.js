'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StorySchema = new Schema({
  name: String,
  active: {type: Boolean, default: true},
  date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Story', StorySchema);
