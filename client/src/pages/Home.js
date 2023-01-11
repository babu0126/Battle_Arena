import './Home.css';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import { randomRoomGenerator } from '../Helper.js';


export function Home(props) {

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
      props.socket.emit("create_room", data);
      navigate(`/lobby/${roomId}`);
    } else alert("Please Enter Your Name");
  };

  function joinRoom () {
    if (player && room) {
      data.push(room, player);
      console.log("joinroom", data);
      props.socket.emit("join_room", data);
      props.socket.on("validate", function (data) {
        console.log("Validating the data", data);
        if (data) {
          navigate(`/lobby/${room}`);
        } else alert("Please Enter a Valid Room Id or the Room is FULL!");
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

