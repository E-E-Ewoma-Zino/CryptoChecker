// script for api calls

let stop = false;

function stopit() {
	stop = true;
	console.log("Stoped");
}

function call() {
	if (stop) return;
	let value = 0;

	console.log("Checking...");
	axios.get("https://api.nomics.com/v1/currencies/ticker?key=97cc5a20fc6fc97989201e69ffea80ea2b9a290f&ids=BTC&interval=1h&convert=USD&per-page=100&page=1").then((res) => {
		value = res.data[0].price;
		console.log("res", value);
		document.getElementById("currentValue").innerHTML = "$" + value;
		// axios post
		// axios.post("/", { value: value }).then(function (response) {
		// 	// console.log("response", response);
		// 	console.log("Restartintg in 10s...");
		// 	if (response.data) setInterval(() => {
		// 		// every 10sec do this
		// 		call();
		// 	}, 10000);
		// }).catch(function (error) {
		// 	console.error("::Err! ", error);
		// 	document.getElementById("currentValue").innerHTML = error;
		// });
	}).catch((err) => {
		console.log(":::ERr ", err);
		document.getElementById("currentValue").innerHTML = err;
		// console.log("response", response);
		console.log("Restartintg in 10s...");
		setInterval(() => {
				// every 10sec do this
				call();
			}, 10000);
	});
}
// start
call();