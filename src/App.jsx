import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MembershipPlans from "./components/Membership/MembershipPlans";
import Login from './Pages/Login/Login';
import Nutrition from "./Pages/Nutrition/NutritionComponents/Nutrition";
import TrainersPage from './Pages/Trainers/TrainersPage';
import Profile from './Pages/Profile/Profile';
import Store from './Pages/Store/Store';
import AddProduct from './Pages/Store/AddProduct';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout/Checkout';
import AdminOrders from './Pages/Orders/AdminOrders';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RoleRoute = ({ children, role }) => {

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  return children;
};


export default function App() {

  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/"element={<Navigate to="/login" replace />} />

        <Route path="/login"element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nutrition"
          element={
            <ProtectedRoute>
              <Nutrition />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainerspage"
          element={
            <ProtectedRoute>
              <TrainersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/membership"
          element={
            <ProtectedRoute>
              <MembershipPlans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/store/add"
          element={
            <RoleRoute role="admin">
              <AddProduct />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <RoleRoute role="admin">
              <AdminOrders />
            </RoleRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}
