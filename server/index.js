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

const PLAYER_LIMIT = 4;
let rooms = {}; // roomid: { players:[name], sockets[id]}
let roomId,
  playerName,
  socketId = "";

  io.on("connection", (client) => {
    console.log(`User connected: ${client.id}`);
    client.on("create_room", handleCreateRoom);
    client.on("join_room", handleJoinRoom);
    client.on("disconnect", () => {
      client.leave(roomId);
    });

    function handleCreateRoom(data_room_player) {
      roomId = data_room_player[0];
      playerName = data_room_player[1];
      socketId = client.id;
      rooms[roomId] = { players: [], sockets: [] };
      rooms[roomId]["players"].push(playerName);
      rooms[roomId]["sockets"].push(socketId);
      console.log("Createroom data", rooms);
      client.join(roomId);
      io.to(roomId).emit("InitPlayerRoom", [playerName, roomId]);
    }
    function handleJoinRoom(data_room_player) {
      roomId = data_room_player[0];
      playerName = data_room_player[1];
      socketId = client.id;
      console.log("playerlength", rooms[roomId]["players"].length);

      if (rooms[roomId] && rooms[roomId]["players"].length < PLAYER_LIMIT) {
        rooms[roomId]["players"].push(playerName);
        rooms[roomId]["sockets"].push(socketId);
        console.log("Joinroom data", rooms);
        client.join(roomId);
        client.emit("validate_room", true); // Validate room is full / existed
        io.to(roomId).emit("JoinedPlayers", [
          rooms[roomId],
          Object.keys(rooms)[0],
        ]);
      } else {
        client.emit("validate_room", false);
      }
    }
  });
