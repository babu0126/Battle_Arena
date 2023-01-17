import "./App.scss";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import io from "socket.io-client";
import background from "./sounds/backgroundMusic.mp3";

const socket = io.connect("http://localhost:3001");

function App(props) {
  const [user, setUser] = useState("");
  const [players, setPlayers] = useState({});
  const [room, setRoom] = useState("");
  let song = new Audio(background);

  useEffect(() => {
    socket.on("room_joined", (playerList, room) => {
      console.log("room_joined line 27:", playerList);
      setRoom(room);
      updatePlayerList(playerList, room);
      socket.emit("joined_lobby", room);
    });
  });
  function updatePlayerList(playerList, room) {
    const newPlayers = {};
    playerList.forEach((player) => {
      return (newPlayers[player.socket] = {
        playerId: player.socket,
        playerName: player.playerName,
        roomId: room,
      });
    });
    setPlayers((prev) => ({
      ...prev,
      ...newPlayers,
    }));
  }

  return (
    <main className="main">
      <Routes>
        <Route
          path="/"
          element={
            <Home socket={socket} user={user} setUser={setUser} song={song} />
          }
        />
        <Route
          path="/lobby/:id"
          element={<Lobby room={room} socket={socket} players={players} />}
        />
        <Route path="/game/:id" element={<Game socket={socket} />} />
      </Routes>
    </main>
  );
}

export default App;
