// controlls all the authentication for the users
const _bird = require("../../middleware/messageBird");
const Users = require("../../model/Users");
const passport = require("passport");

module.exports = {
	register: (req, res) => {
		console.log("body", req.body);

		// Here the user is being created and the authLevel is set to 0 to give user auth to only user pages
		Users.register({ username: req.body.username, name: req.body.name, authLevel: 0 }, req.body.password, (register_err, user) => {
			if (register_err) {
				console.log(":::register_err", register_err);
				_bird.message("danger", register_err);
				res.redirect("back");
			} else {
				passport.authenticate("local")(req, res, () => {
					_bird.message("success", "Successful Registered");
					res.redirect("/tracker");
				});
			}
		});
	},
	login: (req, res, next) => {
		// LogIn a user
		// I am using the passport custom callback to authenticate the user
		passport.authenticate("local", function (logIn_err, user, info) {
			// if any exceptions happen, come here
			if (logIn_err) {
				_bird.message("danger", logIn_err, info.message);
				console.log("::logIn_err:", logIn_err, info.message);
				return next(logIn_err);
			}
			// if user is not found, come here
			if (!user) {
				_bird.message("danger", info.message);
				console.log("NO USER FOUND!", info.message);
				return res.redirect("back");
			}
			// if everything goes well, come here
			req.logIn(user, function (reqLogIn_err) {
				if (reqLogIn_err) {
					_bird.message("danger", reqLogIn_err);
					console.log("::reqLogIn_err:", reqLogIn_err);
					return next(reqLogIn_err);
				}

				// checking where the auth is coming from
				if (req.body.auth) {
					// because i have done the authLevel checker function i can do this here
					if (!user.authLevel) {
						_bird.message("success", "Welcome back " + req.user.username);
						return res.redirect("/tracker");
					}
					else {
						_bird.message("success", "Welcome back Admin " + req.user.username);
						return res.redirect("/admin/dashboard");
					}
				}
				else {
					_bird.message("success", "Welcome back " + req.user.username);
					return res.redirect("tracker");
				}
			});
		})(req, res, next);
	},
	logOut: (req, res) => {
		_bird.message("primary", "Bye " + req.user.username);
		req.logOut();
		res.redirect("/");
	},
	// Check the auth level for the user and the authlevel from the form used to send the req then send to the user pages if 0 or the admin page if 1
	adminOnly: (req) => {
		// Checks if user is authenticated and then redirect to the destination
		// IF user does not have auth validation then send back
		if (req.isAuthenticated()) {
			if (!req.user.authLevel) {
				_bird.message("warning", "You do not have permission to view this page.");
				return false;
			}
			else return true;
		}
		else {
			_bird.message("warning", "You are not logIn yet.");
			return false;
		}
	},
	// Check the auth level for the user and the authlevel from the form used to send the req then send to the user pages if 0 or the admin page if 1
	userOnly: (req) => {
		// Checks if user is authenticated and then redirect to the destination
		// IF user does not have auth validation then send back
		if (req.isAuthenticated()) {
			return true;
		}
		else {
			_bird.message("warning", "You are not logIn yet.");
			return false;
		}
	}
}