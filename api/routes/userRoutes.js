'use strict';

  
var validate = require('express-validation');
var validator = require('express-validator');
var cors = require('cors'); 
var decodetokendata='';
const checkauth=require('../middleware/check-auth');
module.exports = function(app) {
  var user = require('../controllers/UserController');

  app.use(cors())
    app.route('/login')
       .post(user.login);
    app.route('/logout')
       .post(user.logout);
  app.use(checkauth);
    app.route('/user')
       .get(user.uselist)
       .post(user.adduser);
  

};
