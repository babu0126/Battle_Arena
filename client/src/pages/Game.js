import React, { useState, useEffect } from "react";
import "./Game.scss";

const MAX_X_BOARDER = 1344;
const MAX_Y_BOARDER = 736;

export function Game(props) {
  const { characters, room } = props;
  const playerKeys = Object.keys(props.players);

  function handleKeys(event) {
    console.log("testing:", props.currentPlayerId, props.players, props.moveDown);
    if(event.key === "ArrowDown") {
      props.moveDown(props.players[playerKey]);
    } 
    else if(event.key === "ArrowUp") {
      props.moveUp(props.players[playerKey]);
    } 
  }
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeys);
    return window.removeEventListener("keydown", handleKeys);
    
  }, [])
  console.log("props.players", props.players);
  console.log("props.currentPlayerId", props.currentPlayerId);
  console.log("playerkeys", playerKeys);

  return (
    <div className="container">
      <ol>
        {playerKeys.map((playerKey, i) => {
          return <li
          key={i}
          className="player"
          id={`player-`+ i}
          style={{
            transform: `translate(${props.players[playerKey].posX}px, ${props.players[playerKey].posY}px)`,
          }}>
        </li>
        })}
      </ol>
    </div>
  );
}
