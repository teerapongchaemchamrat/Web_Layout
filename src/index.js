import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation 
} from "react-router-dom";
import Home from "./routes/Home";
import Layout from "./routes/Layout";
import Register from "./routes/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import EditPage from "./routes/EditListing";
import SpareParePage from "./routes/SparePart";
import NewuserPage from "./components/NewUser";
import ResetPasswordPage from "./components/ResetPassword";
import UpdateRoleUserPage from "./components/UpdateRoleUser";
import CustomLayoutPage from "./routes/CustomLayout"
import "./App.css";

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isEditPage = location.pathname === '/edit';
  //const isNewUserPage = location.pathname === '/newuser';
  // const isDeleteData = location.pathname === '/edit/delete';
  const isSparePart = location.pathname === '/sparepart';
  return (
    <>
      {!isLoginPage && !isEditPage && !isSparePart  && <Navbar />}
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
        element: <Login />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "layout",
        element: <Layout />
      },
      {
        path: "layout/custom",
        element: <CustomLayoutPage />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "edit",
        element: <EditPage />
      },
      {
        path: "sparepart",
        element: <SpareParePage />
      },
      {
        path: "user/newuser",
        element: <NewuserPage />
      },
      {
        path : "user/reset/password",
        element: <ResetPasswordPage />
      },
      {
        path : "user/role",
        element: <UpdateRoleUserPage />
      }
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
);


