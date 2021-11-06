// controll the user Schema
const Users = require("../model/Users");

module.exports = {
	all: (callback) => {
		Users.find({}, (err, users) => {
			if (err) {
				console.log("findAllUser_err::", err);
				return callback(err, null);
			}
			else {
				return callback(null, users);
			}
		});
	},
	getById: (user, callback) => {
		Users.findOne({ _id: user }, (err, user) => {
			if (err) {
				console.log("findUserById_err::", err);
				return callback(err, null);
			}
			else {
				return callback(null, user);
			}
		});
	},
	getUserTrack: (userId, callback)=>{
		Users.findById({_id: userId}).populate("tracks").exec((err, tracks)=>{
			if(err){
				console.error("getUserTracks_err:::", err);
				callback(err, null);
			}
			else{
				callback(null, tracks);
			}
		});
	},
	addTrack (user, data, callback) {
		console.log("data", data);
		this.getById(user, (getUserById_err, user) => {
			if (getUserById_err) {
				console.log("getUserById_err::", getUserById_err);
				return callback(getUserById_err, null);
			}
			else {
				// console.log("W", user);
				user.tracks.push(data);
				user.save((saveUserTrack_err) => {
					if (saveUserTrack_err) {
						console.log("updateTrack_err::", saveUserTrack_err);
						return callback(saveUserTrack_err, null);
					}
					else {
						return callback(null, true);
					}
				});
			}
		});
	},
	removeTrack (userId, trackId, callback) {
		this.getById(userId, (getTrack_err, user)=>{
			if(getTrack_err){
				console.error("getTrack_err", getTrack_err);
				callback(getTrack_err, null);
			}
			else{
				user.tracks.forEach((track, index) => {
					// comparing two ObjectId : new ObjectId("617b246f86092c978d7d33ee") == new ObjectId("617b246f86092c978d7d33ee")
					if(track.equals(trackId)){
						console.log(user.tracks[index].equals(trackId));
						console.log(user.tracks.splice(index, 1));
						console.log(user.tracks, trackId);
						user.save((save_err)=>{
							if(save_err){
								console.error("save_err::", save_err);
								return callback(save_err, null);
							}else{
								callback(null, true);
							}
						});
					}
					else{
						callback(null, false);
					}
				});
			}
		});
	}
}
