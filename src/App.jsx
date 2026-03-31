import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './Pages/Login/Login'
import Nutrition from "./Pages/Nutrition/NutritionComponents/Nutrition";
import TrainersPage from './Pages/Trainers/TrainersPage'
import Profile from './Pages/Profile/Profile'
import Store from './Pages/Store/Store'
import Header from './Components/Header/Header'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'

export default function App() {
  return (
    <BrowserRouter>
     <Header />
      <Routes>
       <Route path="/" element={<Navigate to="/login" replace />} />
<Route path="/home" element={<Home />} />
<Route path="/store" element={<Store />} />
<Route path="/login" element={<Login />} />
<Route path="/nutrition" element={<Nutrition />} />
<Route path="/trainerspage" element={<TrainersPage />} />
<Route path="/Profile" element={<Profile />} />
      </Routes>
              <Footer />

    </BrowserRouter>
  )
}
