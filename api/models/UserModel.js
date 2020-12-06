'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var userschema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name'
  },
  email: {
    type: String,
    required: 'Kindly enter the email'
  },
  
  password: {
    type: String,
    required: 'Kindly enter the password'
  },
  Created_at: {
    type: Date,
    default: Date.now
  },
  Updated_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: Number,
      enum: [0, 1, 2]
    }],
    default: [0]
  }
});
userschema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('Users', userschema);