// The module for the cryptoValues
const mongoose = require("mongoose");

const cryptoValueSchema = mongoose.Schema({
	// Things needed for all cryptoValue Schema
	cryptoValue: Number,
	// Things needed for all cryptoValue Schema
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = new mongoose.model("CryptoValue", cryptoValueSchema);