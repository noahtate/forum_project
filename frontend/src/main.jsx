import React from "react";
import ReactDOM from "react-dom/client";
import "../bootstrap/css/bootstrap-responsive.css"
import "../bootstrap/css/bootstrap.css"
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
