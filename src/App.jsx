import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MembershipPlans from "./Components/Membership/MembershipPlans";
import Login from './Pages/Login/Login'
import Nutrition from "./Pages/Nutrition/NutritionComponents/Nutrition";
import TrainersPage from './Pages/Trainers/TrainersPage'
import Profile from './Pages/Profile/Profile'
import Store from './Pages/Store/Store'
import AddProduct from './Pages/Store/AddProduct'
import Header from './Components/Header/Header'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import BookingsPage from "./Pages/Trainers/BookingsPage";
import Cart from './Pages/Cart/Cart'
import Checkout from './Pages/Checkout/Checkout'
import AdminOrders from './Pages/Orders/AdminOrders'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/add" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/trainerspage" element={<TrainersPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/membership" element={<MembershipPlans />} />
        <Route path="/bookings" element={<BookingsPage />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}