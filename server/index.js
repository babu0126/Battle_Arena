import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
server.listen(3001, () => {
  console.log("Server is running on Port: 3001");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

let rooms = {};
let roomId, playerName = "";

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  // listening to create_room
  socket.on("create_room", (data) => {
    roomId = data[0];
    playerName = data[1];
    rooms[roomId]=[playerName];
    socket.join(roomId);
    socket.emit("validate", rooms);
  });
  // listening to join_room
  socket.on("join_room", (data) => {
    console.log("server is working");
    roomId = data[0];
    playerName = data[1];
    if (rooms[roomId]) {
      console.log("JoinGame",rooms)
      rooms[roomId]=[playerName];
      socket.join(roomId);
      socket.emit("validate", true);
    } else {
      socket.emit("validate", false);
    }
  });
  
  

})