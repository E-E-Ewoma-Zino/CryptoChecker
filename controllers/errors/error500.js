// This page is called by any server errors
const _bird = require("../../middleware/messageBird");

module.exports = (req, res) => {

	return res.render("errors/error500", {
		bird: _bird.fly,
	});
}