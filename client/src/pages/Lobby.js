import "./Lobby.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Lobby({ players }) {
  
  const navigate = useNavigate();
  const playersIds = Object.keys(players);
  
  function startGame() {
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
        <button id="start-game-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}
