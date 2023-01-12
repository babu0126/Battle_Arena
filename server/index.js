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

const io = new Server(server);
let players = {};
let rooms = {};
let roomId;
let playerName = "";

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("create_room", (data) => {
    roomId = data[0];
    playerName = data[1];
    rooms[roomId] = [];
    rooms[roomId].push(playerName);
    console.log("CreateGame:", rooms);
    console.log("RoomId:", roomId);
    socket.join(roomId);
    io.to(roomId).emit("FirstPlayer", playerName);
  });

  socket.on("join_room", (data) => {
    roomId = data[0];
    playerName = data[1];
    if (rooms[roomId] && rooms[roomId].length < 4) {
      rooms[roomId].push(playerName);
      socket.join(roomId);
      console.log("JoinGame", rooms);
      socket.emit("validate", true);
      io.to(roomId).emit("JoinPlayers", rooms[roomId]);
      players[socket.id] = { x: 0, y: 0, direction: 'up' };
      io.to(roomId).emit("updatePlayers", players);
    } else {
      socket.emit("validate", false);
    }
    socket.on("playerMovement", (movementData) => {
      players[socket.id] = movementData;
      io.to(roomId).emit("updatePlayers", players);
    });

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} disconnected`);
      delete players[socket.id];
      io.to(roomId).emit("updatePlayers", players);
      socket.leave(roomId);
    });
  });
});
