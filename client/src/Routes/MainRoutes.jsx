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
import AddVideo from '../components/profileComponents/ProfileComponents/AddVideo';
import FavoriteVideos from '../components/profileComponents/ProfileComponents/FavoriteVideos';
import Followers from '../components/profileComponents/ProfileComponents/Followers';
import Following from '../components/profileComponents/ProfileComponents/Following';
import AllUsers from '../Pages/AllUsers/AllUsers';
import AllVideos from '../Pages/AllVideos/AllVideos';
import UserDetail from '../Pages/UserDetail/UserDetail';

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
          path: "/allusers",
          element: <AllUsers />

        },
        {
          path: "/allvideos",
          element: <AllVideos />

        },
        {
          element: <PrivateRoutes />,
          children: [
            {
              path: "/profile",
              element: <Profile />,
              children: [
                {
                  path: "accound",
                  element: <Accound />
                },
                {
                  path: "myvideo",
                  element: <MyVideo />
                }
                , {
                  path: "addvideo",
                  element: <AddVideo />
                },
                {
                  path: "favoritevideos",
                  element: <FavoriteVideos />
                },
                {
                  path: "followers",
                  element: <Followers />
                },
                {
                  path: "following",
                  element: <Following />
                },
              ]

            },
            {
              path: "video/:id",
              element: <VideoDetail />
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
              path: "user/:id",
              element: <UserDetail />
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