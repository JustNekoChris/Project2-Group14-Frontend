import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/SignupForm" element={<SignupForm />} />
      </Routes>
  );
}

export default App;
