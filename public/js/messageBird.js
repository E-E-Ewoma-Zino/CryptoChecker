// Message Bird js

// using messageBird
const messageBox = document.getElementById("littleMessageBox");
const messageBird = document.getElementById("littleMessage");

// message sender
function messager(data) {
	$("#littleMessageBox").fadeIn(() => {
		setTimeout(() => {
			$("#littleMessageBox").fadeOut();
		}, 7000);
	});

	messageBox.classList.replace(`alert-${data.replace[0]}`, `alert-${data.replace[1]}`);
	messageBird.innerHTML = data.message;
}
