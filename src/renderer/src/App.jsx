/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login'

function App() {

  return (
    <>
      <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/navbar" element={<Navbar />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App

