import React, { useState, useEffect } from "react";
import "./Game.scss";

export default function Game() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const maxX = 800 - 50;
      const maxY = 600 - 50;
      console.log(position.x, position.y);
      if (event.key === "ArrowUp") {
        if (position.y > - 1) {
        setPosition((prevPosition) => ({
          x: prevPosition.x,
          y: prevPosition.y - 10,
        }));
        setDirection('up'); // update direction
      }
      } else if (event.key === "ArrowDown") {
        if (position.y < maxY) {
        setPosition((prevPosition) => ({
          x: prevPosition.x,
          y: prevPosition.y + 10,
        }));
        setDirection('down'); // update direction
      }

      } else if (event.key === "ArrowLeft") {
        if (position.x > - 1) {
        setPosition((prevPosition) => ({
          x: prevPosition.x - 10,
          y: prevPosition.y,
        }));
        setDirection('left'); // update direction
      }
      } else if (event.key === "ArrowRight") {
       if (position.x < maxX) {
        setPosition((prevPosition) => ({
          x: prevPosition.x + 10,
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
        console.log("Attack!", direction);

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
  }, []);

  console.log(position.x, position.y);
  
  return (
    <div className="container">
      <div
        className="player"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
    </div>
  );
}
