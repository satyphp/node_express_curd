'use strict';

var validate = require('express-validation');
var validator = require('express-validator');
var cors = require('cors');
const checkauth = require('../middleware/check-auth');
//const upload = require('../middleware/uploadMiddleware');
//const Resize = require('../middleware/Resize');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }

});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    filesize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter

});
module.exports = function (app) {
  var blog = require('../controllers/BlogController');

  app.use(cors())
  app.use(checkauth);
  app.route('/blog')
    .get(blog.bloglist);
  app.route('/delblog')
    .post(blog.delblog);
  app.route('/getblog/:id')
    .get(blog.getblog);
  app.post('/blog', upload.single('image'), (req, res, next) => {
    
    blog.addblog(req, res, next);
  });
  app.post('/blogupdate', upload.single('image'), (req, res, next) => {

    blog.updateblog(req, res);
  })

};