const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

module.exports  = {

	destroy: function(req,res,next){
		userModel.remove({},function(err,result){
			if (err) {
				console.log(err);
			}
			else{
				res.json({
					data: result
				});
			}

		})
	},
	all: function(req,res,next){
		userModel.find({},function(err,result){
			if (err) {
				console.log(err);
			}
			else{
				res.json({
					data: result
				});
			}

		})
	},
	create: function(req,res,next){

		// userModel.findOne({email:req.body.email},function(err,result){
		// 	if (!err) {
		// 		var count = result.length;
		// 		// console.log(count);
		// 		res.json({data:count});
		// 	}
		// });
		userModel.count({name:req.body.name},function(err,c){
			console.log(c);
			if (c==0) {
			userModel.create({name:req.body.name,email:req.body.email,password:req.body.password},function(err,result){				
				if (err) {
					next(err);
				}
				else{
					res.json({
						status:'success',
						message: 'User Added Successfully',
						data:null
					});
				}
			});

			}
			else{
			res.json({
						status:'error',
						message: 'Email sudah dipakai',
						data:null
					});
			}
			// if (c==1) {
			// userModel.create({name:req.body.name,email:req.body.email,password:req.body.password},function(err,result){				
			// 	if (err) {
			// 		next(err);
			// 	}
			// 	else{
			// 		res.json({
			// 			status:'success',
			// 			message: 'User Added Successfully',
			// 			data:null
			// 		});
			// 	}
			// });
			// }
			// else{

			// 		res.json({
			// 			status:'error',
			// 			message: 'Email sudah dipakai',
			// 			data:null
			// 		});
			// }
		})
		// userModel.create({name:req.body.name,email:req.body.email,password:req.body.password},function(err,result){
		// 	if (err) {
		// 		// next(err);
		// 		console.log(err);
		// 	}
		// 	else{
		// 		res.json({
		// 			status: "success",
		// 			message: "User Added Successfully",
		// 			data:null
		// 		});
		// 	}
		// });
	},

	authenticate: function(req,res,next){
		console.log(req.body.email);
		userModel.count({email:req.body.email},function(err,c){
			if (c==1) {
		userModel.findOne({email:req.body.email},function(err,userInfo){
			if (err) {
				// next(err);
				console.log("gagal");
			}
			else{
				console.log(userInfo.password);
				if (bcrypt.compareSync(req.body.password,userInfo.password)) {
					const token = jwt.sign({id:userInfo._id},req.app.get('secretKey'),
						{expiresIn:'1h'});
					res.json({
						status:"Success",
						message: "User Found",data:{
							user:userInfo,
							token: token
						}
					})
				}
				else{
					res.json({
						status:"error",
						message:"Invalid email/password",
						data:null
					});
				}
			}
		});
			}
			else{

					res.json({
						status:"error",
						message:"Invalid email/password",
						data:null
					});
			}
		})

	},
	updateById: function(req,res,next){
		moviesModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name},function(err,movieInfo){
			if (!err) {
				res.json({
					status:"success",
					message: "Movie update",
					data:null
				});
			}
			else{
				console.log(err);
			}
		})
	}
}