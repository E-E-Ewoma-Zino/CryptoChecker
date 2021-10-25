// home route controller
const { userOnly } = require("../auth/authentication");
const _bird = require("../../middleware/messageBird");
const _user = require("../../middleware/user");

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
		// get tracking values
		const trackData = {
			crypto: req.body.crypto,
			condution: req.body.condution,
			value: req.body.value,
			url: req.body.url
		}

		_user.addTrack(req.user._id, trackData, (getUser_err, done) => {
			if (getUser_err) {
				// _bird.message("danger", getUser_err);
				return res.send(false);
			} else {
				console.log("Done adding track");
				res.send(done);
			}
		});
	}
}