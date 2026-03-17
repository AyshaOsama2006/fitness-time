import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import Nutrition from './pages/Nutrition'
import Membership from './pages/Membership'
import Store from './pages/Store'
import Trainers from './pages/Trainers'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/store" element={<Store />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
