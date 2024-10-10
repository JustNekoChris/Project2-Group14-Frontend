import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import Home from './Components/HomePage/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/home" element={<Home />} />  {/* Add home route */}
    </Routes>
  );
}

export default App;

