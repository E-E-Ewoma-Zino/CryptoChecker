// This page is called by any missing page or page not found

module.exports = (req, res) => {
	return res.render("errors/error404");
}