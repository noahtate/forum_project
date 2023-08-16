import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Example from "./components/example";
import HomePage from "./components/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "example",
        element: <Example />,
      },
    ],
  },
]);

export default router;