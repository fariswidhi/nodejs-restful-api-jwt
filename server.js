const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const users = require('./routes/users');
const jwt = require('jsonwebtoken');
const mongoose = require('./config/database');
const movies = require('./routes/movies');

app.set('secretKey','nodeRestApi');

mongoose.connection.on('error',console.error.bind(console,'MongoDB connection error'));


// app.use(express.bodyParser())

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users',users)
app.use('/movies',movies)

app.get('/', function(req, res){
 res.json({"tutorial" : "Build REST API with node.js"});
});

// function validateUser(req,res,next) {
// 	// body...
// 	jwt.verify(req.headers['x-access-token'],
// 		req.app.get('secretKey'),
// 		function(err,decoded){
// 			if (err) {
// 				res.json({
// 					status:"error",
// 					message: err.message,
// 					data:null
// 				})
// 			}
// 			else{
// 				req.body.userId = decoded.id;
// 				next();
// 			}
// 		}
// 		)
// }
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
