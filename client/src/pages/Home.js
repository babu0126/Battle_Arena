import "./Home.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function randomRoomGenerator() {
  return Math.random().toString(36).substring(2, 8);
}

export default function Home({ socket, user, setUser, song }) {

  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  useEffect(()=> {
      if(room) {
        console.log("Home-line25-roomid", room);
        joinRoom(room);
      }
    },[room])
    
    function createGame() {
      if (user) {
        let roomId = randomRoomGenerator();
        setRoom(roomId);
        socket.emit("create_room", roomId, user);
      } else alert("Please Enter Your Name");
    }
    
    function joinRoom(room) {
      if (user && room) {
      socket.emit("join_room", room, user);
      socket.on("room_validated", (pass) => {
        if (pass) {
          navigate(`/lobby/${room}`);
        } else alert("Please Enter a Valid Room Id or the Room is FULL!");
      });
    } else alert("Please Enter Your Name & Room Id");
  }

  return (
    <div className="Home-container">
      <div className="Home-container-left">
        <h1>
          Battle <br /> Arena
        </h1>
      </div>
      <div className="Home-container-right">
        <div className="Flexbox">
          <div className="item">
            <label className="item-label">Player Name</label>
            <input
              placeholder="Player's Name..."
              onChange={(event) => setUser(event.target.value)}
            />
          </div>
          <div className="break"></div>
          <div className="item">
            <button className="Button-create-game" onClick={createGame}>
              Create Game
            </button>
          </div>
          <div className="break"></div>
          <div className="item">
            <input
              placeholder="Room Number..."
              onChange={(event) => setJoinRoomId(event.target.value)}
            />
            <button className="Button-join-game" onClick={()=>joinRoom(joinRoomId)}>
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

