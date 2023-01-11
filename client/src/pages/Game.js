import React, { useState, useEffect } from "react";
import "./Game.scss";

const MAX_X_BOARDER = 1344;
const MAX_Y_BOARDER = 750;

export function Game(props) {
  const { characters, room } = props;

  const [position, setPosition] = useState({ x: 32, y: 160 });
  const [direction, setDirection] = useState(0);
  const [players, setPlayers] = useState([
    {
      id: 1,
      position: { x: 32, y: 160 },
      direction: 0,
    },
    {
      id: 2,
      position: { x: 96, y: 160 },
    },
  ]);

  useEffect(() => {
    function handleKeyDown(event) {
      console.log(position.x, position.y);
      if (event.key === "ArrowUp") {
        if (position.y > -1) {
          setPosition((prevPosition) => ({
            x: prevPosition.x,
            y: prevPosition.y - 10,
          }));
          setDirection("up"); // update direction
        }
      } else if (event.key === "ArrowDown") {
        if (position.y < MAX_Y_BOARDER) {
          setPosition((prevPosition) => ({
            x: prevPosition.x,
            y: prevPosition.y + 10,
          }));
          setDirection("down"); // update direction
        }
      } else if (event.key === "ArrowLeft") {
        if (position.x > -1) {
          setPosition((prevPosition) => ({
            x: prevPosition.x - 10,
            y: prevPosition.y,
          }));
          setDirection("left"); // update direction
        }
      } else if (event.key === "ArrowRight") {
        if (position.x < MAX_X_BOARDER) {
          setPosition((prevPosition) => ({
            x: prevPosition.x + 10,
            y: prevPosition.y,
          }));
          setDirection("right"); // update direction
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  console.log(position.x, position.y);
  console.log("showing characters:", characters);
  return (
    <div className="container">
      <ol>
        {characters.map((id, index) => {
         return <li
          key = {index}
          className='player'
          id={`player-${index}`}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >{id}</li>
        })}
      </ol>
    </div>
  );
}
