import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forgot from "./Forgot"
import Login from "./Login";
import Notfound from "./Notfound"
import Profile from "./Profile"
import SignUp from "./Signup";
import Reset from "./Reset"
import Home from "./Home";
import Navbar from "./Navbar";

export default function AppRouter(props) {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/forgot-password" element={<Forgot />} />
        <Route exact path="/reset-password" element={<Reset />} />
        <Route exact path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}
