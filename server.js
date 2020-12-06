express = require('express'),
errorhandler = require('errorhandler'),
bodyParser = require('body-parser'); 
app = express(),

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "50mb",extended: true})); 
app.use('/upload',express.static('upload'))
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
require('./api/models/UserModel'),
require('./api/models/BlogModel'), 
require('./api/models/NewsModel'),
require('./api/models/CategoryModel'),
jwt=require('jsonwebtoken'); 
const morgan = require('morgan');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/College', { useNewUrlParser: true });
app.use(morgan('dev'));
var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route 
var blogroutes=require('./api/routes/Blogroutes');
blogroutes(app); //register the route

var newsoutes=require('./api/routes/NewsRoutes');
newsoutes(app); //register the route
var category=require('./api/routes/CategoryRoutes');
category(app); //

/// exception handling
app.use((error,req,res,next) => {
    res.status(error.status||500);  
    res.json({error:{error

    }});
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);