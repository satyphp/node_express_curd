'use strict';

const { check, validationResult } = require('express-validator');
var cors = require('cors');

const checkauth = require('../middleware/check-auth');
module.exports = function (app) {
  var News = require('../controllers/NewsController');
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

  app.use(cors())
  app.use(checkauth);
  app.route('/news')
    .get(News.newsList);
  app.route('/getnews/:id')
    .get(News.getNews);
  app.post('/news', upload.single('image'),
    [
      check("title", "Title must have a value.").isLength({ min: 3 }),
      check("description", "Description must have a value.").not().isEmpty()
    ],
    function (req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        });
      } else {
        if (req.file) {
          upload.single('image');
        } else {
          upload.none()
        }
        News.addNews(req, res, next);
      }

    });

  app.post('/deleteNews', function (req, res) {
    News.deletNews(req, res);
  });

  app.post('/updatenews',upload.single('image'),(req, res, next) => {
    News.updateblog(req, res);
 })

};
