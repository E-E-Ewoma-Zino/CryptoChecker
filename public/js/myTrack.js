// for my tracks
const trackInfo = document.getElementsByClassName("trackInfo");
const cryptoLogo = document.getElementsByClassName("cryptoLogo");
const currentValue = document.getElementsByClassName("currentValue");


// get the crypto value every 7sec
setInterval(() => {
	console.log(trackInfo.length);
	for (let i = 0; i < trackInfo.length; i++) {
		const track = trackInfo[i];
		const data = {
			crypto: track.value,
			url: track.nextElementSibling.value
		}

		getCryptoValue(data, i);
	}
}, 7000);

// use axios to get the value of crypto
function getCryptoValue(data, num) {
	try {
		axios.get(data.url).then((res) => {
			if (data.crypto == "WDGLD") {
				// console.log("res", res);
				currentValue[num].innerHTML = "$" + res.data.market_data.current_price.usd;
				cryptoLogo[num].setAttribute("src", res.data.image.large);
			} else {
				value = res.data[0];
				// console.log("res", value);
				currentValue[num].innerHTML = "$" + value.price;
				cryptoLogo[num].setAttribute("src", value.logo_url);
			}
		}).catch((err) => {
			console.log(":::ERr ", err);
			messager({
				replace: ["success", "danger"],
				message: "Bad Network Connection"
			});
		});
	} catch (err) {
		window.location.reload();
	}
}

// delete track
function deleteTrack(data) {
	axios.delete("/mytracks?q=" + data.trackId).then((res) => {
		console.log(res);
		if (res.data) {
			messager({
				replace: ["danger", "success"],
				message: "Deleted"
			});
			data.e.parentElement.parentElement.parentElement.parentElement.style.display = "none"
		}
		else {
			messager({
				replace: ["success", "danger"],
				message: "Failed to delete"
			});
		}
	}).catch((err) => {
		console.error(err);
		messager({
			replace: ["success", "danger"],
			message: "Bad Network Connection"
		});
	});
}