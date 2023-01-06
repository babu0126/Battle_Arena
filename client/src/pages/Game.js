import React, { useState, useEffect } from "react";
import './Game.scss';

export default function Game() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 50, height: 50 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setPosition((prevPosition) => ({
            x: prevPosition.x,
            y: prevPosition.y - 10,
          }));
          break;
        case "ArrowDown":
          setPosition((prevPosition) => ({
            x: prevPosition.x,
            y: prevPosition.y + 10,
          }));
          break;
        case "ArrowLeft":
          setPosition((prevPosition) => ({
            x: prevPosition.x - 10,
            y: prevPosition.y,
          }));
          break;
        case "ArrowRight":
          setPosition((prevPosition) => ({
            x: prevPosition.x + 10,
            y: prevPosition.y,
          }));
          break;
        case "SpaceBar":
          setSize((prevSize) => ({
            width: prevSize.width + 50,
            height: prevSize.height + 50,
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div classname="container">
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  );
}
