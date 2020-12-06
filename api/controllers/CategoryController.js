'use strict';


var mongoose = require('mongoose'),
  Category = mongoose.model('Category');
const fs = require('fs');


exports.CategoryList = function (req, res) {
  Category.find({}, function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  });

};

exports.addCategory = function (req, res,next) {

  var obj = req.body;
  if (req.file !== undefined) {
    obj.image = req.file.path;
  }
  var Catboj = new Category(obj);
  Catboj.save(function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  });
}
exports.deleteCategory = function (req, res) {
  Category.findOne({ _id: req.body.id }, function (err, response) {
    if (err) {
      res.status(500)
      res.send(err);
    } else {
      response.remove();
      fs.unlinkSync(response.image);
      res.status(200)
      res.json({ message: "data deleted" });
    }
  });
}

exports.getCategory = function (req, res) {
  var id = req.params.id
  Category.findOne({ _id: id }, function (err, response) {
    if (err) {
      res.status(500)
      res.send(err);
    } else {

      res.status(200)
      res.json({ response });
    }
  });
}

exports.updatecategory = function(req, res) {
   
  Category.findById({ _id: req.body.id } , function (err, response){
     
    if (req.file !== undefined) {
      var imagename = req.file.path;
    }else{
      var imagename =response.image;
    }
     if(response){
      response.category_name=req.body.category_name;
      response.description=req.body.description;
      response.metatitle=req.body.metatitle;
      response.metatag=req.body.metatag;
      response.metadesc=req.body.metadesc;

      response.order=req.body.order;
      response.status=req.body.status;
      response.image=imagename;
       
      response.save(function(err,data) {
        if (err)
          console.log('error',err)
        else
        res.status(200)
        res.json(data);
      });
     }else{
      res.status(403);
      res.send(err);
     }
     });
  }