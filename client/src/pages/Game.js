import React, { useState, useEffect } from "react";
import "./Game.scss";

export default function Game() {
  const [position, setPosition] = useState({ x: 32, y: 160 });
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const maxX = 1344;
      const maxY = 736;
      console.log(position.x, position.y);
      if (event.key === "ArrowUp") {
        if (position.y > 160) {
        setPosition((prevPosition) => ({
          x: prevPosition.x,
          y: prevPosition.y - 16,
        }));
        setDirection('up'); // update direction
      }
      } else if (event.key === "ArrowDown") {
        if (position.y < maxY) {
        setPosition((prevPosition) => ({
          x: prevPosition.x,
          y: prevPosition.y + 16,
        }));
        setDirection('down'); // update direction
      }

      } else if (event.key === "ArrowLeft") {
        if (position.x > 32) {
        setPosition((prevPosition) => ({
          x: prevPosition.x - 16,
          y: prevPosition.y,
        }));
        setDirection('left'); // update direction
      }
      } else if (event.key === "ArrowRight") {
       if (position.x < maxX) {
        setPosition((prevPosition) => ({
          x: prevPosition.x + 16,
          y: prevPosition.y,
        }));
        setDirection('right'); // update direction
      }
      } else if (event.key === " ") {
        // attack action
        // determine attack coordinates based on direction
        const attack =
          direction === "left"
            ? position.x - 50
            : direction === "right"
            ? position.x + 50
            : direction === "up"
            ? position.y - 50
            : direction === "down"
            ? position.y + 50
            : position;
        console.log("Attack!");

        // create attack element
        const attackElement = document.createElement("div");
        attackElement.style.position = "absolute";
        attackElement.style.left = attack.x;
        attackElement.style.top = attack.y;
        attackElement.style.width = 50;
        attackElement.style.height = 50;
        attackElement.style.backgroundColor = "yellow";
        attackElement.style.borderRadius = "50%";

        // add attack element to container
        const container = document.querySelector(".container");
        container.appendChild(attackElement);

        // remove attack element after 1 second
        setTimeout(() => {
          container.removeChild(attackElement);
        }, 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position]);

  console.log(position.x, position.y, direction);
  
  return (
    <div className="container">
      {players.map((player) => (
      <div
        className="player"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      ))}
    </div>
  );
}
