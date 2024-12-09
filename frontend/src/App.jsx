import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import Navbar from '../components/Navbar/Navbar';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Profile from '../components/Profile/Profile';
import AddRecipe from '../components/AddRecipe/AddRecipe';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
