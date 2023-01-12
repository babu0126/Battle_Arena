import "./Lobby.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Lobby(props) {
  const navigate = useNavigate();
  console.log("lobby props:", props);

  const { player1, player2, player3, player4, room } = props;

  function startGame() {
    console.log("start room:", room);
    navigate(`/game/${room}`);
  }

  return (
    <div className="Lobby-container">
      <div className="Lobby-avatar">
        <label>{player1}</label>
        <br />
        <label>{player2}</label>
        <br />
        <label>{player3}</label>
        <br />
        <label>{player4}</label>
      </div>
      <div className="Lobby-button">
        <button id="start-game-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}
