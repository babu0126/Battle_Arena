import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import {
  randomPositionGenerator,
  randomColourGenerator,
  getRandomPos,
} from "./Helper.js";

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

const PLAYER_LIMIT = 4;
const MAX_X_BOARDER = 1344;
const MAX_Y_BOARDER = 736;

let players = {};
let playerInRooms = {};

io.on("connection", (socket) => {
  console.log("A player has connected: ", socket.id);
  let posX = getRandomPos(32, MAX_X_BOARDER);
  let posY = getRandomPos(144, MAX_Y_BOARDER);
  let colour = randomColourGenerator();

  // Create a new room
  socket.on("create_room", (room, playerName) => {
    players[socket.id] = {
      room: room,
      playerName: playerName,
      x: posX,
      y: posY,
      health: 100,
      direction: "down",
      colour: colour,
    };
    playerInRooms[room] = [];
    io.emit("room_created", room, playerName, socket.id);
  });

  // Validate room existance and set number of players below 4
  socket.on("join_room", (room, playerName) => {
    if (playerInRooms[room] && playerInRooms[room].length < PLAYER_LIMIT) {
      players[socket.id] = {
        room: room,
        playerName: playerName,
        x: posX,
        y: posY,
        health: 100,
        direction: "down",
        colour: colour,
      };
      playerInRooms[room].push({ playerName, socket: socket.id, room });
      socket.join(room);
      io.to(socket.id).emit("room_validated", true);
      io.to(room).emit("room_joined", playerInRooms[room], room);
    } else socket.emit("room_validated", false);
  });

  socket.on("gameStarted", (room) => {
    io.to(room).emit("initPlayersInGame", players, room);
  });

  // Add the new player to the game state
  socket.on("move", (data) => {
    console.log("Server move Data line 55:", data);
    // Update the player's position in the game state
    players[socket.id].x = data.x;
    players[socket.id].y = data.y;

    // Broadcast the updated position to all other players
    socket.broadcast.emit("playerMoved", {
      id: socket.id,
      x: data.x,
      y: data.y,
      direction: data.playerDirection,
    });
  });

  socket.on("attack", (data) => {
    // Check if the attack hit another player
    for (let id in players) {
      if (id !== socket.id) {
        let player = players[id];
        let dx = player.x - data.x;
        let dy = player.y - data.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
          // Reduce the hit player's health
          player.health -= 100;
          if (player.health <= 0) {
            // Broadcast the player is killed, and remove the player from the game state
            io.emit("playerKilled", id);
            delete players[id];
          } else {
            // Broadcast the player is hit
            io.emit("playerHit", id);
          }
        }
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("A player has disconnected: ", socket.id);
    // Remove the player from the game state
    delete players[socket.id];
  });
});
