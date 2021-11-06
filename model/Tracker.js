// The module for the trackers
const mongoose = require("mongoose");

const trackerSchema = mongoose.Schema({
	// Things needed for all tracker Schema
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	crypto: String,
	condition: Number,
	value: Number,
	url: String,
	// Things needed for all tracker Schema
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = new mongoose.model("Tracker", trackerSchema);
