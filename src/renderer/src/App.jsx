/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
//import About from './components/About'
//import Contact from './components/Contact' 
function App() {

  return (
    <>
      <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Routes>
            <Route path="/navbar" element={<Navbar />} />
            {/* <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<Orders />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App

