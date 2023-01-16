import "./Lobby.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Lobby({ players, socket }) {
  
  const navigate = useNavigate();
  const playersIds = Object.keys(players);
  
  function handleStartGame() {
    socket.emit("gameStarted", players[playersIds[0]].roomId);
    navigate(`/game/${players[playersIds[0]].roomId}`);
  }

  return (
    <div className="Lobby-container">
      <div className="Lobby-avatar">
        {playersIds.map((playerId, i)=> {
          return (
            <div key={i}>
              <label key={i}> {players[playerId].playerName} </label><br />
            </div>
          )
        })}  
      </div>
      <div className="Lobby-button">
        <button id="start-game-button" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}
