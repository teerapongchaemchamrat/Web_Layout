import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation 
} from "react-router-dom";
import Home from "./routes/Home";
import OfficeFloor1 from "./routes/Office_floor_1";
import OfficeFloor2 from "./routes/Office_floor_2";
import OfficePD1 from "./routes/Office_PD_1";
import OfficePD2 from "./routes/Office_PD_2";
import Factory1A from "./routes/Factory1A";
import Factory1B from "./routes/Factory1B";
import Register from "./routes/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import EditPage from "./routes/EditListing";
import EditData from "./routes/EditData";
import DeleteData from "./routes/DeleteData";
import "./App.css";

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isEditPage = location.pathname === '/edit';
  const isEditData = location.pathname === '/edit/update';
  const isDeleteData = location.pathname === '/edit/delete';
  return (
    <>
      {!isLoginPage && !isEditPage && !isEditData && !isDeleteData && <Navbar />}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "office_floor_1",
        element: <OfficeFloor1 />,
      },
      {
        path: "office_floor_2",
        element: <OfficeFloor2 />,
      },
      {
        path: "office_pd_1",
        element: <OfficePD1 />,
      },
      {
        path: "office_pd_2",
        element: <OfficePD2 />,
      },
      {
        path: "factory1a",
        element: <Factory1A />,
      },
      {
        path: "factory1b",
        element: <Factory1B />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "edit",
        element: <EditPage />,
      },
      {
        path: "edit/update",
        element: <EditData />,
      },
      {
        path: "edit/delete",
        element: <DeleteData />,
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


