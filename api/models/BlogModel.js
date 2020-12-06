'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var blogchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the title'
  },
  description: {
    type: String,
    required: 'Kindly enter the Description'
  },

  image: {
    type: String,     
  },
  
  author: {
    type: String,
    required: 'Author enter the author'
  },
  date: {
    type: Date
     
  },
  Created_at: {
    type: Date,
    default: Date.now
  },
  
  status: {
    type: [{
      type: Number,
      enum: [0, 1]
    }],
    default: [0]
  }
});
 

module.exports = mongoose.model('Blogs', blogchema);
