
import { Login } from '../features/user/Login';
import { Post } from '../features/posts/Post';

import {
    createBrowserRouter
  } from "react-router-dom";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Post/>,
    },
    {
      path: "/login",
      element: <Login/>,
    }
  ]);