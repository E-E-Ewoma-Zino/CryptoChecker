// This script is in-charge of sending mails to users
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// CREATE AUTHORISATION
const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIERCT_URL);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// for sending messages using nodemailer
module.exports = ({ from: from, to: to, subject: subject, text: text, html: html }, callback) => {
	// Generate and Get access token
	oauth2Client.getAccessToken((accessToken_err, accessToken, tokenResponse) => {
		if(accessToken_err){
			console.error("accessToken_err::", accessToken_err);
			console.error("accessToken_err::", accessToken);
			console.error("accessToken_err::", tokenResponse);
			return callback(accessToken_err, null, null);
		}
		else{	
			console.log("Generated access token:", accessToken);
	
			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					type: "OAuth2",
					user: "eewoma75@gmail.com",
					clientId: process.env.CLIENT_ID,
					clientSecret: process.env.CLIENT_SECRET,
					refresh_token: process.env.REFRESH_TOKEN,
					accessToken: accessToken
				}
			});
	
			transporter.sendMail({
				from: from,
				to: to,
				subject: subject,
				text: text,
				html: html
			},(email_err, info)=>{
				if(email_err){
					console.error("email_err::", email_err);
					return callback(null, email_err, null);
				}
				else{
					callback(null, null, info);
				}
			});
		}
	});
}