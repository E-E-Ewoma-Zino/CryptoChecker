// configure passport
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../model/Users");


module.exports = (passport) => {
	passport.use(Users.createStrategy());
	// // THIS WAS WHAT I USE IN FIXING THE PASSPORT AUTHENTICATION ISSUE
	// passport.use(new LocalStrategy({
	// 	usernameField: 'email',
	// }, Users.authenticate()));

	// passport.serializeUser(Users.serializeUser());
	// passport.deserializeUser(Users.deserializeUser());
	// This methode works better than the one above
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function (id, done) {
		Users.findById(id, function (err, user) {
			done(err, user);
		});
	});
}

/* While using this passport you require */
// passport
// passport-local
// A user Schema
/* In user model file you need */
// passport-local-mongoose
// then add this: userSchema.plugin(passportLocalMongoose);