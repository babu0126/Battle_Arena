import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Lobby } from "./pages/Lobby";
import { Game } from "./pages/Game";
import { useState, useEffect } from "react";
import io from "socket.io-client";
// import character_img0 from "../images/sword_icon_img1.png";
import character_img1 from "./images/sword_icon_img2.png";
// import character_img2 from "./images/sword_icon_img3.png";
// import character_img3 from "./images/sword_icon_img4.png";
// import character_img4 from "./images/sword_icon_img5.png";

const socket = io.connect("http://localhost:3001");

// class Player {
//   constructor(name, pos, img, life) {
//     this.name = name;
//     this.pos = pos;
//     this.img = img;
//     this.life = life;
//   }
//   draw(){}
// }

function App() {
  const [room, setRoom] = useState("hello");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");

  useEffect(() => {
    socket.on("InitPlayerRoom", (array) => {
      console.log("FirstPlayer~~~~", array);
      setPlayer1(array[0]);
      setRoom(array[1]);
    });
  }, []);

  useEffect(() => {
    socket.on("JoinedPlayers", (data) => {
      console.log("Player Array:", data);
      setPlayer1(data[0].players[0]);
      setPlayer2(data[0].players[1]);
      setPlayer3(data[0].players[2]);
      setPlayer4(data[0].players[3]);
      setRoom(data[1]);
    });
  }, []);

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route
          path="/lobby/:id"
          element={
            <Lobby
              socket={socket}
              room={room}
              player1={player1}
              player2={player2}
              player3={player3}
              player4={player4}
            />
          }
        />
        <Route
          path="/game/:id"
          element={
            <Game
              socket={socket}
              characters={[player1, player2, player3, player4]}
            />
          }
        />
      </Routes>
    </main>
  );
};
export default App;
