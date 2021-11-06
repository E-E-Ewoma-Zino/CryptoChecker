const authentication = require("../controllers/auth/authentication");
const tracker = require("../controllers/home/tracker");
const myTracks = require("../controllers/home/myTracks");
const login = require("../controllers/home/login");
const index = require("../controllers/home/index");
const express = require("express");

const router = express.Router();

// @desc	Get route for login
// @route	/
router.get("/", (req, res) => index(req, res));

// @desc	Get route for tracker
// @route	/tracker
router.get("/tracker", (req, res) => tracker.get(req, res));

// @desc	Post route for tracker
// @route	/tracker
router.post("/tracker", (req, res) => tracker.post(req, res));

// @desc	Get route for myTracks
// @route	/myTracks
router.get("/mytracks", (req, res) => myTracks.get(req, res));

// @desc	Delete route for myTracks
// @route	/myTracks
router.delete("/mytracks", (req, res) => myTracks.delete(req, res));

// @desc	Get route to register a user
// @route	/register
router.get("/register", (req, res) => login.get.register(req, res));

// @desc	Get route to login a user
// @route	/login
router.get("/login", (req, res) => login.get.logIn(req, res));

// @desc	Post route to register a user
// @route	/register
router.post("/register", (req, res) => authentication.register(req, res));

// @desc	Post route to login a user
// @route	/login
router.post("/login", (req, res, next) => authentication.login(req, res, next));

// @desc	LogOut User. For when someone wants to logOut
// @route	Get /logout
router.get("/logout", (req, res) => authentication.logOut(req, res));

module.exports = router;