require("dotenv").config();
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const express = require("express");

const app = express();
const server = require("http").createServer(app);

// initialisers
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// session setup
// tell app to use express session
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

// passport config
app.use(passport.initialize());
app.use(passport.session());

// configure passport
require(__dirname + "/config/passport")(passport);

// Initialise mongoss
require("./config/db.js")(mongoose);

// // track
// setInterval(() => {
// 	console.log("Tracking");
// 	// require("./tracker");
// }, 10000);

// @desc	routes for home page are here
app.use("/", require("./router/index"));

// @desc	404
app.use(require("./controllers/errors/error404"));

server.listen("8080", () => console.log("app running at port 8080\nWaiting..."));