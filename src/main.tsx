import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//import Dashboard from "./pages/Dashboard";
// import Indices from "./pages/Indices";
// import Option from "./pages/Option";
import Nav from "./pages/Nav";
// import App from "./App";
import "./index.css";
import "./assets/css/all.min.css";

const App = React.lazy(() => import("./App"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Indices = React.lazy(() => import("./pages/Indices"));
const Option = React.lazy(() => import("./pages/Option"));

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
        element: (
          <React.Suspense fallback={<>...</>}>
            <Dashboard />
          </React.Suspense>
        ),
      },
      {
        path: "indices",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Indices />
          </React.Suspense>
        ),
      },
      {
        path: "option",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Option />
          </React.Suspense>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
