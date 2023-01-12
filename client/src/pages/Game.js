import React, { useState, useEffect } from "react";
import "./Game.scss";

const MAX_X_BOARDER = 1344;
const MAX_Y_BOARDER = 736;

export function Game(props) {
  const { characters, room } = props;

  const [player1Position, setPlayer1Position] = useState({ x: 32, y: 160 });
  const [player2Position, setPlayer2Position] = useState({ x: 64, y: 160 });
  const [player3Position, setPlayer3Position] = useState({ x: 96, y: 160 });
  const [player4Position, setPlayer4Position] = useState({ x: 128, y: 160 });

  const [player1Direction, setPlayer1Direction] = useState(0);
  const [player2Direction, setPlayer2Direction] = useState(0);
  const [player3Direction, setPlayer3Direction] = useState(0);
  const [player4Direction, setPlayer4Direction] = useState(0);

  useEffect(() => {
    if (characters[0]) {
      function handleKeyDown(event) {
        if (event.key === "ArrowUp") {
          if (player1Position.y > 144) {
            setPlayer1Position((prevPosition) => ({
              x: prevPosition.x,
              y: prevPosition.y - 16,
            }));
            setPlayer1Direction("up"); // update direction
          }
        } else if (event.key === "ArrowDown") {
          if (player1Position.y < MAX_Y_BOARDER) {
            setPlayer1Position((prevPosition) => ({
              x: prevPosition.x,
              y: prevPosition.y + 16,
            }));
            setPlayer1Direction("down"); // update direction
          }
        } else if (event.key === "ArrowLeft") {
          if (player1Position.x > 32) {
            setPlayer1Position((prevPosition) => ({
              x: prevPosition.x - 16,
              y: prevPosition.y,
            }));
            setPlayer1Direction("left"); // update direction
          }
        } else if (event.key === "ArrowRight") {
          if (player1Position.x < MAX_X_BOARDER) {
            setPlayer1Position((prevPosition) => ({
              x: prevPosition.x + 16,
              y: prevPosition.y,
            }));
            setPlayer1Direction("right"); // update direction
          }
        }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (characters[1]) {
      function handleKeyDown(event) {
        if (event.key === "ArrowUp") {
          if (player2Position.y > 144) {
            setPlayer2Position((prevPosition) => ({
              x: prevPosition.x,
              y: prevPosition.y - 16,
            }));
            setPlayer2Direction("up"); // update direction
          }
        } else if (event.key === "ArrowDown") {
          if (player2Position.y < MAX_Y_BOARDER) {
            setPlayer2Position((prevPosition) => ({
              x: prevPosition.x,
              y: prevPosition.y + 16,
            }));
            setPlayer2Direction("down"); // update direction
          }
        } else if (event.key === "ArrowLeft") {
          if (player2Position.x > 32) {
            setPlayer2Position((prevPosition) => ({
              x: prevPosition.x - 16,
              y: prevPosition.y,
            }));
            setPlayer2Direction("left"); // update direction
          }
        } else if (event.key === "ArrowRight") {
          if (player2Position.x < MAX_X_BOARDER) {
            setPlayer2Position((prevPosition) => ({
              x: prevPosition.x + 16,
              y: prevPosition.y,
            }));
            setPlayer2Direction("right"); // update direction
          }
        }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (characters[2]) {
      function handleKeyDown(event) {
        if (event.key === "ArrowUp") {
          if (player3Position.y > 144) {
            setPlayer3Position((prevPosition) => ({
              x: prevPosition.x,
              y: prevPosition.y - 16,
            }));
            setPlayer3Direction("up"); // update direction
          }
        } else if (event.key === "ArrowDown") {
          if (player3Position.y < MAX_Y_BOARDER) {
            setPlayer3Position((prevPosition) => ({
              x: prevPosition.x,
              y: prevPosition.y + 16,
            }));
            setPlayer3Direction("down"); // update direction
          }
        } else if (event.key === "ArrowLeft") {
          if (player3Position.x > 32) {
            setPlayer3Position((prevPosition) => ({
              x: prevPosition.x - 16,
              y: prevPosition.y,
            }));
            setPlayer3Direction("left"); // update direction
          }
        } else if (event.key === "ArrowRight") {
          if (player3Position.x < MAX_X_BOARDER) {
            setPlayer3Position((prevPosition) => ({
              x: prevPosition.x + 16,
              y: prevPosition.y,
            }));
            setPlayer3Direction("right"); // update direction
          }
        }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (characters[3]) {
      function handleKeyDown(event) {
        if (event.key === "ArrowUp") {
          if (player4Position.y > 144) {
            setPlayer4Position((prevPosition) => ({
              x: prevPosition.x,
              y: prevPosition.y - 16,
            }));
            setPlayer4Direction("up"); // update direction
          }
        } else if (event.key === "ArrowDown") {
          if (player4Position.y < MAX_Y_BOARDER) {
            setPlayer4Position((prevPosition) => ({
              x: prevPosition.x,
              y: prevPosition.y + 16,
            }));
            setPlayer4Direction("down"); // update direction
          }
        } else if (event.key === "ArrowLeft") {
          if (player4Position.x > 32) {
            setPlayer4Position((prevPosition) => ({
              x: prevPosition.x - 16,
              y: prevPosition.y,
            }));
            setPlayer4Direction("left"); // update direction
          }
        } else if (event.key === "ArrowRight") {
          if (player4Position.x < MAX_X_BOARDER) {
            setPlayer4Position((prevPosition) => ({
              x: prevPosition.x + 16,
              y: prevPosition.y,
            }));
            setPlayer4Direction("right"); // update direction
          }
        }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [player1Position, player2Position, player3Position, player4Position, characters]);

  console.log("player1", player1Position.x, player1Position.y);
  console.log("player2", player2Position.x, player2Position.y);
  console.log("player3", player3Position.x, player3Position.y);
  console.log("player4", player4Position.x, player4Position.y);
  console.log("showing characters:", characters);

  return (
    <div className="container">
      <ol>
        <li
          key={0}
          className="player"
          id={`player-0`}
          style={{
            transform: `translate(${player1Position.x}px, ${player1Position.y}px)`,
          }}
        ></li>
        <li
          key={1}
          className="player"
          id={`player-1`}
          style={{
            transform: `translate(${player2Position.x}px, ${player2Position.y}px)`,
          }}
        ></li>
        <li
          key={2}
          className="player"
          id={`player-2`}
          style={{
            transform: `translate(${player3Position.x}px, ${player3Position.y}px)`,
          }}
        ></li>
        <li
          key={3}
          className="player"
          id={`player-3`}
          style={{
            transform: `translate(${player4Position.x}px, ${player4Position.y}px)`,
          }}
        ></li>
      </ol>
    </div>
  );
}
