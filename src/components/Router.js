import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import App from "./App";
import Navigation from "./Navigation";


const Router = ({ isLoggedIn }) => {
  return(
    <>
    {isLoggedIn && <Navigation />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Router;