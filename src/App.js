/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Battle from "./Pages/Battle";
import Landing from "./Pages/Landing";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";
import CustomBattle from './Pages/customBattle';
import Error from "./Pages/Error";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/custombattle" element={<CustomBattle />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Users" element={<Users />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
