// This script is in-charge of sending mails to users
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// CREATE AUTHORISATION
const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIERCT_URL);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// for sending messages using nodemailer
module.exports = async ({ from: from, to: to, subject: subject, text: text, html: html }) => {
	try {
		// Generate and Get access token
		const accessToken = await oauth2Client.getAccessToken();
	
		// console.log("Generated access token:", accessToken);
		console.log(from);
		
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: from.email,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refresh_token: process.env.REFRESH_TOKEN,
				accessToken: accessToken.token
			}
		});

		const result = await transporter.sendMail({
			from: `"${from.name}" <${from.email}>`,
			to: to,
			subject: subject,
			text: text,
			html: html
		});

		return result;
	} catch (err) {
		return console.error("accessToken_err::", err);
	}
}