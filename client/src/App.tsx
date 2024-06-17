import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; // Add this
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Board from './pages/Board';
import Buttons from './components/Buttons';
import { Socket, io  } from 'socket.io-client';
import { ToolsContextProvider } from './components/context/ToolsContext';
import { Login } from './pages/auth/login';
import { SignUp } from './pages/auth/signup';
import Home from './pages/Home';
import { AuthContextProvider } from './components/context/AuthContext';

function App() {
  const socket: Socket = io('http://localhost:5000');
  return (
    <AuthContextProvider>
    <ToolsContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home socket={socket}/>  }/> 
        <Route path="/:boardId" element={<> <Board socket={socket} />  </>}/> 
        <Route path="/login" element={ <Login />  }/> 
        <Route path="/signup" element={ <SignUp />  }/> 
      </Routes>
    </BrowserRouter>
    </ToolsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
