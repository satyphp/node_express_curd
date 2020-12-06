'use strict';
 
var bcrypt = require('bcrypt');
const Bcrypt = require("bcryptjs");
var mongoose = require('mongoose'),
 
Users = mongoose.model('Users');

exports.uselist = function(req, res) {
    Users.find({},{"name":1, "email":1, "status":1}, function(err, response) {
    if (err)
      res.send(err);
    res.json(response);
  });
};

exports.adduser = function(req, res) {
  
  var user = new Users(req.body); 
  user.password= bcrypt.hashSync(req.body.password, 10);
  user.save(function(err, task) {
    if (err)
    {
        res.status(422).send(err);
        
    }
   });
};
exports.deleteuser=function(req,res){

};
exports.logout=function(req,res){
  req.user.deleteToken(req.token,(err,user)=>{
    if(err) return res.status(400).send(err);
    res.sendStatus(200);
});
} 
exports.login = function(req, res) {
  console.log(req.body);
   if(!req.body.email)
   {
    res.status(401).json({ message: 'please fill user id' });
   }
   if(!req.body.password)
   {
    res.status(401).json({ message: 'please fill password' });
   }
    Users.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(401).json({ message: 'Authentication failed. User not found.' });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) {
          res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        } else {
          return res.json({token: jwt.sign({ email: user.email,_id: user._id}, 'secrate',{expiresIn:'9h'}),'user':{'name':user.name,'email':user.email,'id':user.id}});
          //res.json(jwt.sign({email: user.email},'secrate',{expiresIn:'3d'}));
          //return token;
        }
      }
    });
  };