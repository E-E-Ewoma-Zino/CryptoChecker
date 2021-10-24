// controls for login
const _bird = require("../../middleware/messageBird");

module.exports =  (req, res) =>	res.render("index", {
	bird: _bird.fly
});