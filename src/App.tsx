import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/RegisterPage';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Verify from './pages/verificationPage';
import { BackendProvider } from './hook/useBackend';

function App() {
  return (
    <BrowserRouter>
    <BackendProvider>
      <Routes>
            <Route path="/" element={<SignUp/>}/>
            <Route path="/verify" element={<Verify/>}/>
            <Route path="/signIn" element={<Login/>}/>
            <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </BackendProvider>
    </BrowserRouter>
  );
}

export default App;
