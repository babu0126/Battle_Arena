import './Home.css';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import { randomRoomGenerator } from '../Helper.js';

const socket = io.connect("http://localhost:3001");

export function Home() {

  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [player, setPlayer] = useState("");

  // Initial an obejct to store Player name & Room Id
  // {RoomId: PlayerName}

  let data = [];
  let roomId = "";

  function createGame () {
    if (player) {
      roomId = randomRoomGenerator(); // Generate random Room Id
      data.push(roomId, player);
      socket.emit("create_room", data);
      navigate(`/lobby/${roomId}`);
    } else alert("Please Enter Your Name");
  };

  function joinRoom () {
    if (player && room) {
      data.push(room, player);
      console.log("joinroom", data);
      socket.emit("join_room", data);
      socket.on("validate", function (data) {
        console.log("Validating the data", data);
        if (data) {
          navigate(`/lobby/${room}`);
        } else alert("Please Enter a Valid Room Id");
      })
    } else alert("Please Enter Your Name & Room Id");
  };

  return (
    <div className="Home-container">
      <div className="Home-container-left">
        <h1> Battle <br/> Arena </h1>
      </div>
      <div className="Home-container-right">
        <div className="Flexbox">
          <div className="item">
            <label className="item-label">Player Name</label>
            <input placeholder="Player Name..." onChange={(event) => setPlayer(event.target.value)}/>
          </div>
          <div className="break"></div>
          <div className="item">
            <button className="Button-create-game" onClick={createGame}> Create Game </button>
          </div>
          <div className="break"></div>
          <div className="item">
            <input placeholder="Room Number..." onChange={(event) => setRoom(event.target.value)}/>
            <button className="Button-join-game" onClick={joinRoom}> Join Room </button>
          </div>
        </div>
      </div>
    </div>
      
  )
}

