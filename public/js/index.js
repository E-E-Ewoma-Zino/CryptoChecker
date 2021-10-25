// script for api calls

// get the selected crypto value
const cryptoVal = document.querySelector("#crypto");

// url for crypto apis
const cryptoApis = {
	BTC: "https://api.nomics.com/v1/currencies/ticker?key=97cc5a20fc6fc97989201e69ffea80ea2b9a290f&ids=BTC&interval=1h&convert=USD&per-page=100&page=1",
	ETH: "https://api.nomics.com/v1/currencies/ticker?key=97cc5a20fc6fc97989201e69ffea80ea2b9a290f&ids=ETH&interval=1h&convert=USD&per-page=100&page=1",
	DODG: "https://api.nomics.com/v1/currencies/ticker?key=97cc5a20fc6fc97989201e69ffea80ea2b9a290f&ids=DOGE&interval=1h&convert=USD&per-page=100&page=1",
	WDGLD: "https://api.coingecko.com/api/v3/coins/wrapped-dgld"
}

// check if user switched crypto value
cryptoVal.addEventListener("click", e => {
	messager({
		replace: ["danger", "success"],
		message: `<img src="assets/gif/1484.gif" style="width: 2.2rem">`
	});
	document.getElementById("cryptoTxt").innerText = cryptoVal.value + " value(USD):";
	getCryptoValue(cryptoApis[cryptoVal.value]);
});

// get the crypto value every 10sec
setInterval(() => {
	getCryptoValue(cryptoApis[cryptoVal.value]);
}, 7000);

// use axios to get the value of crypto
function getCryptoValue(crypto) {
	// console.log("Checking...");

	axios.get(crypto).then((res) => {
		if (cryptoVal.value == "WDGLD") {
			// console.log("res", res);
			document.getElementById("currentValue").innerHTML = "$" + res.data.market_data.current_price.usd;
			document.getElementById("cryptoLogo").setAttribute("src", res.data.image.large);
		} else {
			value = res.data[0];
			// console.log("res", value);
			document.getElementById("currentValue").innerHTML = "$" + value.price;
			document.getElementById("cryptoLogo").setAttribute("src", value.logo_url);
		}
	}).catch((err) => {
		console.log(":::ERr ", err);
		messager({
			replace: ["success", "danger"],
			message: "Bad Network Connection"
		});
	});
}

// when use wants to track
function trackValue() {
	// get tracking values
	const data = {
		crypto: document.querySelector("#crypto").value,
		condution: document.getElementById("min").checked ? 0 : 1,
		value: document.getElementById("track").value,
		url: cryptoApis[cryptoVal.value]
	}

	console.log(data);
	// post
	axios.post("/tracker", data).then((res) => {
		value = res;
		// console.log("res", value);
		messager({
			replace: ["danger", "success"],
			message: "Tracking " + cryptoVal.value
		});
	}).catch((err) => {
		console.log(":::ERr ", err);
		messager({
			replace: ["success", "danger"],
			message: "Failed to track currency"
		});
	});
}

// as page loads get values
getCryptoValue(cryptoApis[cryptoVal.value]);