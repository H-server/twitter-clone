import React, {useState} from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import App from "./App";


const Router = ({ isLoggedIn }) => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: isLoggedIn ? <Home /> : <Auth />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
    ]);

    return(
        <RouterProvider router={router} />
    )
}

export default Router;