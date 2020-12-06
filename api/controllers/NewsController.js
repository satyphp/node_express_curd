'use strict';


var mongoose = require('mongoose'),
News = mongoose.model('News');
const fs = require('fs');


exports.newsList = function(req, res) {
    News.find({}, function(err, response) {
        if (err)
          res.send(err);
        res.json(response);
      });
  
};

exports.addNews=function(req,res) { 
    
    var obj=req.body; 
    obj.image=(req.file)?req.file.path:''; 
    var news = new News(obj);
    news.save(function (err, response) {
        if (err)
        res.send(err);
      res.json(response);
    });
}
  exports.deletNews=function(req,res) { 
    News.findOne({_id:req.body.id},function (err, response) {
            if (err) {
               res.status(500) 
               res.send(err);
             } else {
                response.remove();
                fs.unlinkSync(response.image);
               res.status(200)
               res.json({message:"data deleted"});
             }
        });
}

exports.getNews=function(req,res) { 
    var id = req.params.id
    News.findOne({_id:id},function (err, response) {
            if (err) {
               res.status(500) 
               res.send(err);
             } else {
                
               res.status(200)
               res.json({response});
             }
        });
}