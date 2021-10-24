// controls for login
const _bird = require("../../middleware/messageBird");

module.exports = {
	get: {
		logIn: (req, res) => {
			res.render("logIn", {
				bird: _bird.fly
			});
		},
		register: (req, res) => {
			res.render("register", {
				bird: _bird.fly
			});
		}
	}
}