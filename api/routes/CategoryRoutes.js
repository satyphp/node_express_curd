'use strict';

const { check, validationResult } = require('express-validator');
var cors = require('cors');

const checkauth = require('../middleware/check-auth');
module.exports = function (app) {
  var Category = require('../controllers/CategoryController');
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
  app.route('/category')
    .get(Category.CategoryList);
  app.route('/category/:id')
    .get(Category.getCategory);
  app.post('/category', upload.single('image'),
    [
      check("category_name", "category must have a value.").isLength({ min: 5 }),
      check("description", "Description must have a value.").not().isEmpty()
    ],
    function (req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        });
      }  
        Category.addCategory(req, res, next);
      

    });
    app.post('/updatecategory', upload.single('image'),
    [
      check("category_name", "category must have a value.").isLength({ min: 5 }),
      check("description", "Description must have a value.").not().isEmpty()
    ],
    function (req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        });
      }  
        Category.updatecategory(req, res, next);
      

    });

     
    

  app.post('/deleteCategory', function (req, res) {
    Category.deleteCategory(req, res);
  });

};
