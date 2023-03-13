import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Indices from "./pages/Indices";
import Option from "./pages/Option";
import Nav from "./pages/Nav";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/app",
    element: (
      <div>
        <Nav />
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    ),

    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "indices",
        element: <Indices />,
      },
      {
        path: "option",
        element: <Option />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
