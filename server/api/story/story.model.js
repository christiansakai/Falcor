'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StorySchema = new Schema({
  name: String,
  active: Boolean
});

module.exports = mongoose.model('Story', StorySchema);