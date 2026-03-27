import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './Pages/Login/Login'
import Nutrition from './Pages/Nutrition/Nutrition'
import TrainersPage from './Pages/Trainers/TrainersPage'
import Profile from './Pages/Profile/Profile'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nutrition" element={<Nutrition />} />
         <Route path="/trainerspage" element={<TrainersPage />} />

                <Route path="/Profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  )
}
