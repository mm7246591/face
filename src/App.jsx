import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Face from "./view/Face";

function App() {
  return (
    <Router>
      <Routes key={uuidv4()}>
        <Route path="/playerone" element={<Face player={"one"} />}></Route>
        <Route path="/playertwo" element={<Face player={"two"} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;