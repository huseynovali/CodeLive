import React from 'react'

import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import { useRoutes } from 'react-router';
import Home from '../Pages/Home/Home';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';
import MainLayout from '../Layout/MainLayout';
export default function MainRoutes() {
  const Routes =useRoutes( [
    {
      element: <MainLayout/> ,
      path: '/',
      children: [
        {
          path: "/",
          element:<Home />

        },
        {
          element: <PrivateRoutes />,
          children: [
            {
              path: "/profile",
              element: <Profile />,
            },
          ]
        },

      ],
    }, {
      element: <AuthRoutes />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
       
      ]
    },
  ]);

  return Routes;
}






  // {
        //   path: "event/:id",
        //   element: <EventDetail />,
        // },
        // {
        //   path: "favorites",
        //   element: <FavoritePage />
        // }