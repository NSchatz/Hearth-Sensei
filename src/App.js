/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Battle from "./Pages/Battle"
import Landing from "./Pages/Landing"
import Profile from "./Pages/Profile"
import Error from "./Pages/Error"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
