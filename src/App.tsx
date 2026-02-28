import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/RegisterPage';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
