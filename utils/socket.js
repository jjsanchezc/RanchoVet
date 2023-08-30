import { io } from "socket.io-client";
const socket = io.connect("http://34.125.202.209:4000");
export default socket;
