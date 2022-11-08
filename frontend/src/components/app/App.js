import "./App.css";
import LoginForm from "../auth/LoginPage";
import SignUpForm from "../user/SignUpPage";
import React, { useState } from "react";
import Feed from "../feed/Feed";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
    </Routes>
  );
};

export default App;
