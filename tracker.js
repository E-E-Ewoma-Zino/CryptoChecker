// script handles the tracking

const { default: axios } = require("axios");
const user = require("./middleware/user");

// Get all users from db
user.all((user_err, users) => {
	if (user_err) {
		console.log("user_err::", user_err);
		return 0;
	}
	else {
		// Get each user
		users.forEach(user => {
			console.log(user.username);
			// track_counter keeps track of the numbers of tracks to loop for
			let track_counter = 0;

			// Here the axios will return error if a request is sent more than once in a sec
			// so this function will send request after every 5sec
			// this function calls its self
			// the function is built so that it will wait for a certain time before it will run
			// and it keeps checking if track_counter has reach it's limit so it will stop 
			// This is basically a for loop but this one allows you use the setTimeout
			(function delayLoop() {
				// set the current track to use
				const track = user.tracks[track_counter];

				// timeout for delayLoop
				setTimeout(() => {
					console.log("track", track.crypto);
					if (track.condition) {// max : gets above
						// console.log("track_url", track.url);

						axios.get(track.url).then((res) => {
							if (track.crypto == "WDGLD") {
								console.log("res", res.data.market_data.current_price.usd);
								if (res.data.market_data.current_price.usd > track.value) {
									console.log(track.crypto, "has gone above", track.value);
									// remove the track when it has checked true
									user.tracks.splice(track_counter, 1);
								}
								else {
									console.log("stable");
								}
							}
							else {
								console.log("res", res.data[0].price);
								if (res.data[0].price > track.value) {
									console.log(track.crypto, "has gone above", track.value);
									// remove the track when it has checked true
									user.tracks.splice(track_counter, 1);
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

						axios.get(track.url).then((res) => {
							// console.log(res);
							if (track.crypto == "WDGLD") {
								console.log("res", res.data.market_data.current_price.usd);
								if (res.data.market_data.current_price.usd < track.value) {
									console.log(track.crypto, "has gone below", track.value);
									// remove the track when it has checked true
									user.tracks.splice(track_counter, 1);
								}
								else {
									console.log("stable");
								}
							}
							else {
								console.log("res", res.data[0].price);
								if (res.data[0].price < track.value) {
									console.log(track.crypto, "has gone below", track.value);
									// remove the track when it has checked true
									user.tracks.splice(track_counter, 1);
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
			})();

		});
	}
});