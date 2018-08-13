const moviesModel = require('../models/movies');


module.exports = {
	all: function(req,res,next){
		// console.log()
		moviesModel.find({},function(err,result){
			if (!err) {
				res.json({
					result
				});
			}
		})
	},
	store: function(req,res,next){
		console.log("ok")
		moviesModel.create({name:req.body.name,realesed_on:req.body.realesed_on},function(err,result){
			console.log("x");
			if (!err) {
				res.json({
					status:"success",
					message: "successfully",
					data:null
				});
			}
			else{
				console.log(err);
			}
		});
	},
	getById: function(req,res,next){
		moviesModel.findById(req.params.movieId,function(err,movieInfo){
			if (err) {
				next(err);
			}
			else{
				res.json({
					status: "success",
					message: "Movie Found",
					data : {
						movie:movieInfo
					}
				})
			}
		});
	},
	updateById: function(req,res,next){
		moviesModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name},function(err,movieInfo){
			if (err) {
				next(err);
			}
			else{
				res.json({
					status:"succes",
					message: "Successfully Updated",
					data: null
				});
			}
		})
	},
	deleteById: function(req,res,next){
		moviesModel.findByIdAndRemove(req.params.movieId,function(err,movieInfo){
			// console.log(req.params.movieId);
			// console.log("ok");
			if (err) {
				next(err);
			}
			else{
				res.json({
					status:"succes",
					message: "Successfully Deleted",
					data: null
				})
			}
		})
	}
}