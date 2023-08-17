const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:19000",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("createRoom", (name) => {
		console.log("Room", name);
		socket.join(name);
		chatRooms.unshift({ id: generateID(), name, messages: [] });
		socket.emit("roomsList", chatRooms);
	});

	socket.on("findRoom", (id) => {
		let result = chatRooms.filter((room) => room.id == id);
		// console.log(chatRooms);
		if (result[0])
			socket.emit("foundRoom", result[0].messages);
		else
			socket.emit("foundRoom", result[0]);
		// console.log("Messages Form", result[0].messages); 
	});

	socket.on("newMessage", (data) => {
		const { room_id, message, user, timestamp } = data;
		let result = chatRooms.filter((room) => room.id == room_id);
		const newMessage = {
			id: generateID(),
			text: message,
			user: user,
			time: `${timestamp.hour}:${timestamp.mins}`,
		};
		console.log("New Message", newMessage);
		console.log("chatRooms", chatRooms);
		console.log("data", data);
		socket.to(result[0].name).emit("roomMessage", newMessage);
		result[0].messages.push(newMessage);

		console.log("Room", result);
		console.log("Message", result[0].messages);
		socket.emit("roomsList", chatRooms);
		socket.emit("foundRoom", result[0].messages);
	});
	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});

app.get("/api", (req, res) => {
	console.log("conection");
	res.json(chatRooms);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
