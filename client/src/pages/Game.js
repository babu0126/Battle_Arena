import React from "react";
import "./Game.scss";
import { useState, useEffect } from "react";
import Sprite from "../Component/Sprite"
import scream from '../sounds/Wilhelm-Scream.mp3'


const MAX_X_BOARDER = 1344;
const MAX_Y_BOARDER = 736;

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    // The maximum is inclusive and the minimum is inclusive
}


function Game({ socket }) {
  const [players, setPlayers] = useState({});
  const [playerId, setPlayerId] = useState(null);
  const [playerDirection, setPlayerDirection] = useState("down");
  const [playerAttack, setPlayerAttack] = useState();
  const [gameover, setGameOver] = useState(false)
  const [play, setPlay] = useState({
    audio: new Audio(scream),
    isPlaying: false,
  });
  const [playerPosition, setPlayerPosition] = useState({
    x: getRandom(32, MAX_X_BOARDER),
    y: getRandom(144, MAX_Y_BOARDER),
  });
  
  const playPause = () => {

    // Get state of song
    let isPlaying = play.isPlaying;

    if (isPlaying) {
      // Pause the song if it is playing

    } else {

      // Play the song if it is paused
      play.audio.play();
    }

    // Change the state of song
    setPlay({ isPlaying: !isPlaying });
  };
  
  useEffect(() => {
    socket.on("connect", () => {
      playPause();
      setPlayerId(socket.id);
      setPlayers((prevPlayers) => {
        return {
          ...prevPlayers,
          [socket.id]: {
            x: playerPosition.x,
            y: playerPosition.y,
            health: 100,
            direction: playerDirection,
          },
        };
      });
      socket.emit("newPlayer", {
        id: socket.id,
        x: playerPosition.x,
        y: playerPosition.y,
        direction: playerDirection,
      });
    });

    // Update the position of other players when they move
    socket.on("playerMoved", (data) => {
      setPlayers((prevPlayers) => ({
        ...prevPlayers,
        [data.id]: { ...prevPlayers[data.id], x: data.x, y: data.y, direction: data.direction },
      }));
    });

    // Update the player health when they are hit
    socket.on("playerHit", (id) => {
      playPause();
      setPlayers((prevPlayers) => {
        let newPlayers = { ...prevPlayers };
        console.log("attacking:" + newPlayers[id]);
        newPlayers[id].health -= 25;
        return newPlayers;
      });
    });

    // Remove the player when they are killed
    socket.on("playerKilled", (id) => {
      playPause();
      setPlayers((prevPlayers) => {
        let newPlayers = { ...prevPlayers };
        delete newPlayers[id];
        return newPlayers;
      });
    });

    if (Object.keys(players).length === 1) {
      setGameOver(true);
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [players]);

  function handleKeyPress(event) {
    if (event.keyCode === 37) {
      movePlayer("left");
    } else if (event.keyCode === 38) {
      movePlayer("up");
    } else if (event.keyCode === 39) {
      movePlayer("right");
    } else if (event.keyCode === 40) {
      movePlayer("down");
    } else if (event.keyCode === 32){
      handleAttack();
      playPause();
  }
  }
  function movePlayer(direction) {
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    if (direction === "left" && playerPosition.x > 32) {
      newX -= 16;
    } else if (playerPosition.y > 144 && direction === "up") {
      newY -= 16;
    } else if (playerPosition.x < MAX_X_BOARDER && direction === "right") {
      newX += 16;
    } else if (playerPosition.y < MAX_Y_BOARDER && direction === "down") {
      newY += 16;
    }
    setPlayerDirection(direction);
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [playerId]: { ...prevPlayers[playerId], x: newX, y: newY, direction: direction },
      };
    });
    setPlayerPosition({ x: newX, y: newY });
    socket.emit("move", { x: newX, y: newY, playerDirection });
  }

  // Send the player's attack to the server when they attack
  function handleAttack(x, y) {
    socket.emit("attack", { x: playerPosition.x, y: playerPosition.y });
    setPlayerAttack(true);
    setTimeout(() => setPlayerAttack(false), 200);
  }

  return (
    <div className="Main">
      <div className="game-board">
        {Object.values(players).map((player, i) => (
            <Sprite
              key={player.id}
              className="player"
              id={`player-${i}`}
              style={{ left: `${player.x}px`, top: `${player.y}px` }}
              direction={player.direction}
            />
        ))}
        {gameover && <div className="gameover">GAME OVER!</div>}
      </div>
    </div>
  );
}

export default Game;
