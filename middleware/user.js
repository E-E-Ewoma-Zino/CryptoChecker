// controll the user Schema

const Users = require("../model/Users")

module.exports = {
	all: (callback)=>{
		Users.find({}, (err, users)=>{
			if(err){
				console.log("findAllUser_err::", err);
				return callback(err, null);
			}
			else{
				return callback(null, users);
			}
		});
	},
	getById: (user, callback) => {
		Users.findOne({_id: user}, (err, user)=>{
			if(err){
				console.log("findUserById_err::", err);
				return callback(err, null);
			}
			else{
				return callback(null, user);
			}
		});
	},
	addTrack: (user, data, callback) =>{
		Users.updateOne({_id: user}, {$push: {tracks: data}}, (err)=>{
			if(err){
				console.log("updateTrack_err::", err);
				return callback(err, null);
			}
			else{
				return callback(null, true);
			}
		});
	}
}
