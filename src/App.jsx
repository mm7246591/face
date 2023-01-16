import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DetectPlayerOne from './view/DetectPlayerOne';
import DetectPlayerTwo from './view/DetectPlayerTwo';

function App() {
  return (
    <Router>
      <Routes key={uuidv4()}>
        <Route path="/playerone" element={<DetectPlayerOne player={"one"} />}></Route>
        <Route path="/playertwo" element={<DetectPlayerTwo player={"two"} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;