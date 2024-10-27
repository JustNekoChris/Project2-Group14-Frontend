import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import Home from './Components/HomePage/Home';
import Wishlists from './Components/Wishlists/Wishlists';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminHome from './Components/AdminHomePage/AdminHome';
import WishlistItems from './Components/WishlistItems/WishlistItems'; // Import the new component
import EditProfile from './Components/EditProfile/EditProfile';

function App() {
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mywishlist" element={<Wishlists />} />
      <Route path="/wishlist-items/:wishlistID" element={<WishlistItems />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/AdminHome" element={<AdminHome />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route 
        path="/logout" 
        element={
          <>
            {deleteCookie("userID")}
            {deleteCookie("name")}
            <Navigate to="/" />
          </>
        }
      /> 
    </Routes>
  );
}

export default App; 
