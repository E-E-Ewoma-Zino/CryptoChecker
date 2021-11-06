// controlls any action that would happen to the tracker db
const Tracker = require("../model/Tracker");

module.exports = {
	add: (data, callback)=>{
		const track = new Tracker(data);

		track.save((err)=>{
			if(err){
				console.error("trackCreate_err", err);
				callback(err, null);
			}
			else{
				// console.log("track", track);
				callback(null, track);
			}
		});
	},
	all: (callback)=>{
		Tracker.find({}, (err, tracks)=>{
			if(err){
				console.error("trackFind_err", err);
				callback(err, null);
			}
			else{
				// console.log("tracks", tracks);
				callback(null, tracks);
			}
		});
	},
	findById: (trackId, callback)=>{
		Tracker.findById({_id: trackId}, (err, track)=>{
			if(err){
				console.error("trackFindById_err", err);
				callback(err, null);
			}
			else{
				// console.log("track", track);
				callback(null, track);
			}
		});
	},
	delete: (trackId, callback)=>{
		Tracker.deleteOne({_id: trackId}, (err)=>{
			if(err){
				console.error("trackDelete_err", err);
				callback(err, null);
			}
			else{
				// console.log("track", track);
				callback(null, true);
			}
		});
	}
}