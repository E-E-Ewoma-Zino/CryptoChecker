// home route controller
const { userOnly } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _user = require("../../middleware/user");
const _tracker = require("../../middleware/tracker");
const error500 = require("../errors/error500");

module.exports = {
	get: (req, res) => {
		// if user is loged in, pass here
		if (!userOnly(req)) return res.redirect("/login");

		_user.getUserTrack(req.user._id, (userTrack_err, user)=>{
			if(userTrack_err){
				_bird.message("danger", userTrack_err);
				return error500(req, res);
			}
			else{
				return res.render("myTracks", {
					bird: _bird.fly,
					tracks: user.tracks
				});
			}
		});
	},
	delete: (req, res) => {
		console.log("ytrertyuik", req.query);
		
			// remove the track when it has checked true
			_user.removeTrack(req.user._id, req.query.q, (removeTrack_err, done) => {
				if (removeTrack_err) {
					return;
				}
				else if (done) {
					console.log("remove track");
					_tracker.delete(req.query.q, (deleteTrack_err, deletedTrack) => {
						if (deleteTrack_err) {
							return;
						}
						else if (deletedTrack) {
							console.log("deleted track");
						}
						else {
							console.warn("Warning! :::Check the track because it looks like the deletedTrack did not come...");
						}
					});
				}
				else {
					console.log("track no match");
				}
			});
		
		res.send(true);
	}
}