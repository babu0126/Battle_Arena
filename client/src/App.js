import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Lobby } from "./pages/Lobby";
import { Game } from "./pages/Game";
import { useState, useEffect } from "react";
import { randomRoomGenerator } from "./Helper";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");

  const [players, setPlayers] = useState({});
  const [currentPlayerId, setCurrentPlayerId] = useState(null);

  const moveDown = (currentPlayerId) => {
    const currentPlayer = players[currentPlayerId];
    const newPosY = currentPlayer.posY + 16;
    updatePlayer(
      currentPlayerId,
      currentPlayer.posX,
      newPosY,
      currentPlayer.direction
    );
  };
  const moveUp = (currentPlayerId) => {
    const currentPlayer = players[currentPlayerId];
    const newPosY = currentPlayer.posY - 16;
    updatePlayer(
      currentPlayerId,
      currentPlayer.posX,
      newPosY,
      currentPlayer.direction
    );
  };
  
  function updatePlayer(playerid, x = 32, y = 160, direction = "down") {
    const playerObject = {
      posX: x,
      posY: y,
      direction: direction,
    };
    const updatedPlayers = {
      ...players,
      [playerid]: playerObject,
    };
    setPlayers(updatedPlayers);
    socket.emit("playerUpdated", updatedPlayers);
  }

  useEffect(() => {
    const playerid = randomRoomGenerator();
    setCurrentPlayerId(playerid);
    updatePlayer(playerid);
    socket.on("InitPlayerRoom", (array) => {
      console.log("FirstPlayer~~~~", array);
      setPlayer1(array[0]);
      setRoom(array[1]);
    });
    socket.on("sendPlayerPosition", (playersObjFromServer) => {
      console.log("sendPlayerPosition", playersObjFromServer);
      // playerUpdated: { tvjqkg: { posX: 0, posY: 0, direction: 'down' } }
      // loop through the players to create a new players object
      // make sure to copy over every other players except this one
      // then update the state with the new player's object
      console.log("players:", players);
      let updatedPlayers = {...players};
      let allPlayersIds = Object.keys(playersObjFromServer);

      allPlayersIds.forEach((playerIdKey) => {
        if (playerIdKey !== currentPlayerId) {
          updatedPlayers[playerIdKey] = playersObjFromServer[playerIdKey];
        }
      });
      setPlayers(updatedPlayers);
    });
  }, []);

  useEffect(() => {
    socket.on("JoinedPlayers", (data) => {
      console.log("Player Array:", data);
      setPlayer1(data[0].players[0]);
      setPlayer2(data[0].players[1]);
      setPlayer3(data[0].players[2]);
      setPlayer4(data[0].players[3]);
      setRoom(data[1]);
    });
  }, []);

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route
          path="/lobby/:id"
          element={
            <Lobby
              socket={socket}
              room={room}
              player1={player1}
              player2={player2}
              player3={player3}
              player4={player4}
            />
          }
        />
        <Route
          path="/game/:id"
          element={
            <Game
              socket={socket}
              characters={[player1, player2, player3, player4]}
              players={players}
              currentPlayerId={currentPlayerId}
              moveDown={moveDown}
              moveUp={moveUp}
            />
          }
        />
      </Routes>
    </main>
  );
}
export default App;
