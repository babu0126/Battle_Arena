import './Home.css';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import { randomRoomGenerator } from '../Helper.js';

const socket = io.connect("http://localhost:3001");

export function Home() {

  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [player, setPlayer] = useState("");
  
  function createGame () {
    let roomId = randomRoomGenerator();
    setRoom(roomId);
    console.log("room", room);
    socket.emit("join_room", roomId);
    navigate(`/lobby/${roomId}`);
  }


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
            <button className="Button-join-game" onClick={navigate}> Join Room </button>
          </div>
        </div>
      </div>
    </div>
      
  )
}

