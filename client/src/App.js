import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Lobby } from './pages/Lobby';
import Game from './pages/Game';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");


function App() {

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");

  useEffect(() => {
    socket.on("FirstPlayer", (player) => {
      console.log("FirstPlayer~~~~", player);
      setPlayer1(player);
  });
  }, []);

  useEffect(()=> {
    socket.on("JoinPlayers", (player) => {
      console.log("Player Array:", player);
      setPlayer1(player[0]);
      setPlayer2(player[1]);
      setPlayer3(player[2]);
      setPlayer4(player[3]);
    });
  }, [])

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home 
        socket={socket} />} />
        <Route path="/lobby/:id" element={<Lobby 
        socket={socket}
        player1={player1}
        player2={player2}
        player3={player3}
        player4={player4}/>}/>
        <Route path="/game" element={<Game players={players} />} />
      </Routes>
    </main>
  );  
}
export default App
