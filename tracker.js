// script handles the tracking
const email = require("./config/email");
const _user = require("./middleware/user");
const { default: axios } = require("axios");
const _tracker = require("./middleware/tracker");

// Get all users from db
_user.all((user_err, users) => {
	if (user_err) {
		console.log("user_err::", user_err);
		return 0;
	}
	else {
		// Get each user
		users.forEach(user => {
			// track_counter keeps track of the numbers of tracks to loop for
			let track_counter = 0;
			
			// Here the axios will return error if a request is sent more than once in a sec
			// so this function will send request after every 5sec
			// this function calls its self
			// the function is built so that it will wait for a certain time before it will run
			// and it keeps checking if track_counter has reach it's limit so it will stop 
			// This is basically a for loop but this one allows you use the setTimeout
			(function delayLoop() {
				console.log("Tracking", user.username);
				// if user has no tracks in db stop
				if (!user.tracks.length) return console.warn(user.username, "has no track");
				// set the current track to use
				const track = user.tracks[track_counter];

				_tracker.findById(track, (findTrack_err, track) => {
					if (findTrack_err) {
						return;
					}
					else {
						// timeout for delayLoop
						setTimeout(() => {
							console.log("track", track.crypto);
							if (track.condition) {// max : gets above
								// console.log("track_url", track.url);

								axios.get(track.url, { timeout: 4500 }).then((res) => {
									if (track.crypto == "WDGLD") {
										console.log("res", res.data.market_data.current_price.usd, "val", track.value, "cond", track.condition);
										if (Number(res.data.market_data.current_price.usd) > Number(track.value)) {
											console.log(track.crypto, "has gone above", track.value);
											// Sending mail. If the mail sending fails the track will not be deleted
											email({
												from: "'Crypto Tracker' <eewoma75@gmail.com>",
												to: "eewoma75@gmail.com",
												subject: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`,
												text: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`,
												html: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`
											}, (accessToken_err, sendEmail_err, info) => {
												if (accessToken_err) {
													return console.error("accessToken_err::", accessToken_err.message);
												}
												else if (sendEmail_err) {
													return console.error("sendEmail_err::", sendEmail_err);
												}
												else {
													console.log("Sending mail...");
													// remove the track when it has checked true
													_user.removeTrack(user._id, track._id, (removeTrack_err, done) => {
														if (removeTrack_err) {
															return;
														}
														else if (done) {
															console.log("remove track");
															_tracker.delete(track, (deleteTrack_err, deletedTrack) => {
																if (deleteTrack_err) {
																	return;
																}
																else if (deletedTrack) {
																	console.log("deleted track");
																}
																else {
																	console.warn("Warning! :::Check the track because it looks like the deletedTrack did not come...");
																}
															});
														}
														else {
															console.log("track no match");
														}
													});
												}
											});

										}
										else {
											console.log("stable");
										}
									}
									else {
										console.log("res", res.data[0].price, "val", track.value, "cond", track.condition);

										if (Number(res.data[0].price) > Number(track.value)) {
											console.log(track.crypto, "has gone above", track.value);
											// Sending mail. If the mail sending fails the track will not be deleted
											email({
												from: "'Crypto Tracker' <eewoma75@gmail.com>",
												to: "eewoma75@gmail.com",
												subject: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`,
												text: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`,
												html: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`
											}, (accessToken_err, sendEmail_err, info) => {
												if (accessToken_err) {
													return console.error("accessToken_err::", accessToken_err.message);
												}
												else if (sendEmail_err) {
													return console.error("sendEmail_err::", sendEmail_err);
												}
												else {
													console.log("Sending mail...");
													// remove the track when it has checked true
													_user.removeTrack(user._id, track._id, (removeTrack_err, done) => {
														if (removeTrack_err) {
															return;
														}
														else if (done) {
															console.log("remove track");
															_tracker.delete(track, (deleteTrack_err, deletedTrack) => {
																if (deleteTrack_err) {
																	return;
																}
																else if (deletedTrack) {
																	console.log("deleted track");
																}
																else {
																	console.warn("Warning! :::Check the track because it looks like the deletedTrack did not come...");
																}
															});
														}
														else {
															console.log("track no match");
														}
													});
												}
											});

										}
										else {
											console.log("stable");
										}
									}
									// save the work done
									user.save((err) => {
										if (err) {
											console.error("userSave_err::", err);
										} else {
											console.log("done");
										}
									});
								}).catch((err) => {
									console.error("axios_err::", err.message);
								});
							}
							else { // min
								// console.log("track_url", track.url);

								axios.get(track.url, { timeout: 4500 }).then((res) => {
									// console.log(res);
									if (track.crypto == "WDGLD") {
										console.log("res", res.data.market_data.current_price.usd, "val", track.value, "cond", track.condition);

										if (Number(res.data.market_data.current_price.usd) < Number(track.value)) {
											console.log(track.crypto, "has gone below", track.value);
											// Sending mail. If the mail sending fails the track will not be deleted
											email({
												from: "'Crypto Tracker' <eewoma75@gmail.com>",
												to: "eewoma75@gmail.com",
												subject: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`,
												text: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`,
												html: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`
											}, (accessToken_err, sendEmail_err, info) => {
												if (accessToken_err) {
													return console.error("accessToken_err::", accessToken_err.message);
												}
												else if (sendEmail_err) {
													return console.error("sendEmail_err::", sendEmail_err);
												}
												else {
													console.log("Sending mail...");
													// remove the track when it has checked true
													_user.removeTrack(user._id, track._id, (removeTrack_err, done) => {
														if (removeTrack_err) {
															return;
														}
														else if (done) {
															console.log("remove track");
															_tracker.delete(track, (deleteTrack_err, deletedTrack) => {
																if (deleteTrack_err) {
																	return;
																}
																else if (deletedTrack) {
																	console.log("deleted track");
																}
																else {
																	console.warn("Warning! :::Check the track because it looks like the deletedTrack did not come...");
																}
															});
														}
														else {
															console.log("track no match");
														}
													});
												}
											});

										}
										else {
											console.log("stable");
										}
									}
									else {
										console.log("res", res.data[0].price, "val", track.value, "cond", track.condition);

										if (Number(res.data[0].price) < Number(track.value)) {
											console.log(track.crypto, "has gone below", track.value);
											// Sending mail. If the mail sending fails the track will not be deleted
											email({
												from: "'Crypto Tracker' <eewoma75@gmail.com>",
												to: "eewoma75@gmail.com",
												subject: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`,
												text: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`,
												html: `${track.crypto} has gone ${track.condition ? "above" : "below"} ${track.value}`
											}, (accessToken_err, sendEmail_err, info) => {
												if (accessToken_err) {
													return console.error("accessToken_err::", accessToken_err.message);
												}
												else if (sendEmail_err) {
													return console.error("sendEmail_err::", sendEmail_err);
												}
												else {
													console.log("Sending mail...");
													// remove the track when it has checked true
													_user.removeTrack(user._id, track._id, (removeTrack_err, done) => {
														if (removeTrack_err) {
															return;
														}
														else if (done) {
															console.log("remove track");
															_tracker.delete(track, (deleteTrack_err, deletedTrack) => {
																if (deleteTrack_err) {
																	return;
																}
																else if (deletedTrack) {
																	console.log("deleted track");
																}
																else {
																	console.warn("Warning! :::Check the track because it looks like the deletedTrack did not come...");
																}
															});
														}
														else {
															console.log("track no match");
														}
													});
												}
											});

										} else {
											console.log("stable");
										}
									}
									// save the work done
									user.save((err) => {
										if (err) {
											console.error("userSave_err::", err);
										} else {
											console.log("done");
										}
									});
								}).catch((err) => {
									console.error("axios_err::", err.message);
								});
							}
							// increment 
							track_counter++;
							// check if it should continue
							if (track_counter < user.tracks.length) {
								delayLoop();
							}
						}, 5000);
					}
				});
			})();
		});
	}
});