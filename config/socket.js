// All things that has to do with WebSocket


// BACK END
// const webSocket = require("ws");
// Initialise WebSocket
// const wss = new webSocket.Server({ server: server });

// wss.on("connection", stream =>{
// 	console.log("New Client Connected");
// 	stream.send("Welcome new Client");

// 	// Listens for messages from the client
// 	stream.on("message", data =>{
// 		console.log("Message from Client:", data);

// 	});
// });

// FRONT END
// // connecting websocket
		// const ws = new WebSocket("ws://localhost:8080");

		// // open the connection
		// ws.addEventListener("open", event => {
		// 	console.log("Client Connected to Server");
		// });

		// // Listens for messages from the server
		// ws.addEventListener("message", ({ data }) => {
		// 	console.log("Got message from server:", data);
		// });

		// function sendMessage() {
		// 	ws.send("Message from Client");
		// }