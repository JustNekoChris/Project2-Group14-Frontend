import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import Home from './Components/HomePage/Home';
import WishList from './Components/WishListPage/WishList';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminHome from './Components/AdminHomePage/AdminHome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mywishlist" element={<WishList />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-home" element={<AdminHome />} />
      <Route path="/logout" element={<Navigate to="/" />} /> 
    </Routes>
  );
}

export default App;
