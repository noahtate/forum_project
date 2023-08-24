import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Example from "./Pages/example";
import HomePage from "./Pages/HomePage";
import PostPage from "./Pages/PostPage"
import UserPage from "./Pages/UserPage"
import TopicPage from "./Pages/TopicPage"
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import LogOutPage from "./Pages/LogOutPage";
import CreatePostPage from "./Pages/CreatePostPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "example/",
        element: <Example />,
      },
      {
        path: "home/",
        element: <HomePage />,
      },
      {
        path: "user/:user_id/",
        element: <UserPage />,
      },
      {
        path: "topics/:topic_id/",
        element: <TopicPage />,
      },
      {
        path:"topics/:topic_id/:post_id/",
        element:<PostPage />
      },
      {
        path:"/:topic_id/post/",
        element:<CreatePostPage/>
      },
      {
        path:"login/",
        element: <LoginPage />,
      },
      {
        path:"logout/",
        element: <LogOutPage />,
      },
      {
        path:"signup/",
        element: <SignUpPage />,
      },
      {
        path:"",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;