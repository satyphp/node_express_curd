'use strict';

var bcrypt = require('bcrypt');
const Bcrypt = require("bcryptjs");
var mongoose = require('mongoose');
var path = require('path'),
Blogs = mongoose.model('Blogs');
const fs = require('fs');
exports.bloglist = function (req, res) {
  Blogs.find({}, function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  });

};

exports.addblog = function (req, res) {
  console.log(req.body);
  var obj = {};
  obj.title = req.body.title;
  obj.description = req.body.description;
  obj.author = req.body.author;
  obj.status = req.body.status;
  if (req.file !== undefined) {
    obj.image = req.file.path;
  }
  obj.date = req.body.date;
  var blog = new Blogs(obj);
  blog.save(function (err, task) {

    if (err) {

      res.status(422)
      res.send(err);
    } else {
      console.log(task);
      res.status(200)
      res.json(task);
    }
  });
};

exports.updateblog = function (req, res) {

  Blogs.findById({ _id: req.body.id }, function (err, response) {

    var imagename = (req.file) ? req.file.path : req.body.imagename;
    if (response) {
      response.title = req.body.title;
      response.description = req.body.description;
      response.author = req.body.author;
      response.status = req.body.status;
      response.image = imagename;
      response.date = req.body.date;
      response.save(function (err, data) {
        if (err)
          console.log('error', err)
        else
          res.status(200)
        res.json(data);
      });
    } else {
      res.status(403);
      res.send(err);
    }
  })

  // obj.title=req.body.title;
  // obj.description=req.body.description;
  // obj.author=req.body.author;
  // obj.status=req.body.status;
  // obj.image=req.file.path;
  // obj.date=req.body.date;
  // var blog = new Blogs(obj);
  // blog.save(function (err, task) {
  //   if (err) {
  //     res.status(422)
  //      res.send(err);
  //   } else {
  //     res.status(200)
  //      res.json(task);
  //   }
  // });
};

exports.delblog = function (req, res) {

  Blogs.findOne({ _id: req.body.id }, function (err, task) {
    task.remove();
    if(task.image!== undefined){
    fs.access(task.image, fs.F_OK, (err) => {
      if (err) {
        console.error('dddddddd',err)
        
      }
      fs.unlinkSync(task.image);
    }) 
  }
    if (err)
      res.send(err);
    console.log(task);
    // fs.unlink(task.image);
    res.json('Successfully removed');

  });
};

exports.getblog = function (req, res) {
  var id = req.params.id
  console.log('id', id);
  Blogs.findById({ _id: req.params.id }, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500)

      res.send(err);
    } else {
      res.status(200)
      res.json(data);
    }
  });
};