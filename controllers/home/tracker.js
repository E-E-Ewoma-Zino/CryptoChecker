// home route controller
const CryptoValue = require("../../model/CryptoValue");
const _bird = require("../../middleware/messageBird");
const email = require("../../config/email");
const { userOnly } = require("../auth/authentication");

module.exports = {
	get: (req, res) => {
		// if user is loged in, pass here
		if(!userOnly(req)) return res.redirect("/login");

		res.render("tracker", {
			bird: _bird.fly
		});
	},
	post: (req, res) => {
		let cryptoValue = req.body.value;

		CryptoValue.find({}, (crypto_err, values) => {
			if (crypto_err) {
				console.log("::crypto_err:", crypto_err);
			}
			else {
				// console.log("prev crypto values", values[values.length - 1].cryptoValue);
				if (values[values.length - 1].cryptoValue != Number(req.body.value)) {
					// console.log("prev crypto values", values[values.length - 1].cryptoValue, req.body.value);

					CryptoValue.create({
						cryptoValue: req.body.value
					}, (createCryptoValue_err) => {
						if (createCryptoValue_err) {
							console.log(":::", createCryptoValue_err);
						}
						else {
							console.log("New Crypto value %d", cryptoValue);
							// for sending messages using nodemailer
							email({
								from: {
									email: "eewoma75@gmail.com",
									name: "Ewoma Zino😁"
								},
								to: 'eewoma75@gmail.com',
								subject: 'BTC changed value',
								text: "from " + values[values.length - 1].cryptoValue + " to " + req.body.value,
								html: `<h1 style="color: red;">From ${values[values.length - 1].cryptoValue} to ${req.body.value}</h1>`
							})
								.then(result => console.log("Email sent..."))
								.catch(err => console.error("emailSend_err::", err));
						}
					});
					return res.send(true);
				} else {
					return res.send(false);
				}
			}
		});
	}
}