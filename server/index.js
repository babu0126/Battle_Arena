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
    origin: "http://localhost:3002",
    method: ["GET", "POST"],
  },
});

let rooms = {}; // roomid1 {[names1,name2]}
let roomId, playerName = "";

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  // listening to create_room
  socket.on("create_room", (data) => {
    roomId = data[0];
    playerName = data[1];
    rooms[roomId]=[];
    rooms[roomId].push(playerName);
    console.log("CreateGame:", rooms);
    console.log("RoomId:", roomId);
    socket.join(roomId);
    io.to(roomId).emit("FirstPlayer", playerName);
    
  });

  // listening to join_room
  socket.on("join_room", (data) => {
    roomId = data[0];
    playerName = data[1];
    if (rooms[roomId] && rooms[roomId].length < 4) {
      rooms[roomId].push(playerName);
      socket.join(roomId);
      console.log("JoinGame",rooms)
      socket.emit("validate", true); // Home.js
      io.to(roomId).emit("JoinPlayers", rooms[roomId]); // Lobby.js
    } else {
      socket.emit("validate", false);
    }
    // listening to disconnect
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} disconnected`);
      socket.leave(roomId);
    })
  }); 
});
