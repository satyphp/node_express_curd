'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var NewsSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the  new title'
  },
  description: {
    type: String,
    required: 'Kindly enter News Description'
  },

  metatitle: {
    type: String,
    
  },
  metatag: {
    type: String,
    
  },
  metadesc: {
    type: String,
    
  }, 
  image: {
    type: String,     
  },
  
  order: {
    type: Number,
    default: 1
  },
  newdate: {
    type: Date
     
  },
  Created_at: {
    type: Date,
    default: Date.now
  },

  Updaed_at: {
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
 

module.exports = mongoose.model('News', NewsSchema);
