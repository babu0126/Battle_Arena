import "./Lobby.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Lobby({ players, socket, room }) {
  
  const navigate = useNavigate();
  const playersIds = Object.keys(players);
  const isFourPlayers = playersIds.length >= 2;
  
 
  function handleStartGame() {
    socket.emit("gameStarted", players[playersIds[0]].roomId);
    navigate(`/game/${players[playersIds[0]].roomId}`);
  }

  return (
    <div className="Lobby-container">
      <div className="Lobby-avatar" id="Lobby-room">
        {room}
      </div>
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
        <button id="start-game-button" onClick={handleStartGame} disabled={!isFourPlayers}>
          Start Game
        </button>
        {!isFourPlayers && <p>{playersIds.length}/4 players have joined</p>}
      </div>
    </div>
  );
}
