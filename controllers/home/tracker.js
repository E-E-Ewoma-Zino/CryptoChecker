// home route controller
const { userOnly } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _user = require("../../middleware/user");
const tracker = require("../../middleware/tracker");

module.exports = {
	get: (req, res) => {
		// if user is loged in, pass here
		if (!userOnly(req)) return res.redirect("/login");

		res.render("tracker", {
			bird: _bird.fly
		});
	},
	post: (req, res) => {
		// console.log(req.body);
		
		_user.getById(req.user._id, (user_err, user) => {
			if (user_err) {
				console.error("user_err::", user_err);
				return res.send(false);
			}
			else {
				// get tracking values
				const trackData = {
					crypto: req.body.crypto,
					condition: req.body.condition,
					value: req.body.value,
					url: req.body.url,
					user: user._id
				}

				// create the track for the user
				tracker.add(trackData, (addTrack_err, track) => {
					if (addTrack_err) {
						res.send(false);
					} else {
						_user.addTrack(req.user._id, track._id, (getUser_err, done) => {
							if (getUser_err) {
								return res.send(false);
							} else {
								console.log("Done adding track");
								res.send(done);
							}
						});
					}
				});
			}
		});
	}
}