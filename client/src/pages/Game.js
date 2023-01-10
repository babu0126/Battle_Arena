import React, { useState, useEffect } from "react";
import "./Game.scss";

export default function Game() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setPosition((prevPosition) => ({
          y: prevPosition.y - 10,
        }));
        setDirection('up'); // update direction
      } else if (event.key === "ArrowDown") {
        setPosition((prevPosition) => ({
          x: prevPosition.x,
          y: prevPosition.y + 10,
        }));
        setDirection('down'); // update direction

      } else if (event.key === "ArrowLeft") {
        setPosition((prevPosition) => ({
          x: prevPosition.x - 10,
          y: prevPosition.y,
        }));
        setDirection('left'); // update direction

      } else if (event.key === "ArrowRight") {
        setPosition((prevPosition) => ({
          x: prevPosition.x + 10,
          y: prevPosition.y,
        }));
        setDirection('right'); // update direction

      } else if (event.key === " ") {
        // attack action
        console.log("Attack!");
        // determine attack coordinates based on direction
        const attack =
          direction === "left"
            ? position.x - 50
            : direction === "right"
            ? position.x + 50
            :direction === "up"
            ? position.y - 50
            : direction === "down"
            ? position.y + 50
            : position;

        // create attack element
        const attackElement = document.createElement("div");
        attackElement.style.position = "absolute";
        attackElement.style.left = attack;
        attackElement.style.top = attack;
        attackElement.style.width = 50;
        attackElement.style.height = 50;
        attackElement.style.backgroundColor = "yellow";
        attackElement.style.borderRadius = "50%";

        // add attack element to container

        // remove attack element after 1 second
        
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container">
      <div
        className="player"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
    </div>
  );
}
