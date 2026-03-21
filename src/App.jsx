import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './Pages/Login/Login'
import Nutrition from './Pages/Nutrition/Nutrition'
import TrainersPage from './Pages/Trainers/TrainerCard'
//import Nanber from './Components/Nanber'
export default function App() {
 
  return (
    <>
  {/* <Nanber/> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/TrainersPage" element={<TrainersPage />} />

      </Routes>
    </BrowserRouter>
    
  </>
   );
}
