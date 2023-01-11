import "./Lobby.css";
import React, { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import character_img0 from "../images/sword_icon_img1.png";
// import character_img1 from "../images/sword_icon_img2.png";
// import character_img2 from "../images/sword_icon_img3.png";
// import character_img3 from "../images/sword_icon_img4.png";
// import character_img4 from "../images/sword_icon_img5.png";

export function Lobby(props) {
  // const navigate = useNavigate();
  console.log(props);

  const { player1, player2, player3, player4 } = props;

  function startGame() {
    // navigate(`/game/${roomId}`);
  }

  return (
    <div className="Lobby-container">
      <div className="Lobby-avatar">
        <label>{player1}</label>
        <label>{player2}</label>
        <label>{player3}</label>
        <label>{player4}</label>
      </div>
      <div className="Lobby-button">
        <button className="Start" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}
