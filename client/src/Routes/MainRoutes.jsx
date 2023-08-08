import React from 'react'

import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import { useRoutes } from 'react-router';
import Home from '../Pages/Home/Home';
import Profile from '../Pages/profile/Profile';
import Login from '../Pages/auth/Login';
import MainLayout from '../Layout/MainLayout';
import Register from '../Pages/auth/Register';
import ForgotPassword from '../Pages/auth/ForgotPassword';
import ResetPassword from '../Pages/auth/ResetPassword';
import Accound from '../components/profileComponents/ProfileComponents/Accound';
import MyVideo from '../components/profileComponents/ProfileComponents/MyVideo';
import VideoDetail from '../Pages/VideoDetailPage/VideoDetail';

export default function MainRoutes() {
  const Routes = useRoutes([
    {
      element: <MainLayout />,
      path: '/',
      children: [
        {
          path: "/",
          element: <Home />

        },
   

        {
          element: <PrivateRoutes />,
          children: [
            {
              path: "/profile",
              element: <Profile />,
              children:[
                {
                  path:"accound",
                  element:<Accound/>
                },
                {
                  path:"myvideo",
                  element:<MyVideo/>
                }
              ]
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
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />
        },
        {
          path: "/reset-password/:id",
          element: <ResetPassword />
        }
      ]
    },
    {
      path:"video/:id",
      element:<VideoDetail/>
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