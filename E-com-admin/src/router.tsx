import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import Detail from "./component/Details";
import CheckOut from "./component/CheckOut";
import Admin from "./component/Admin/Admin";
import Dashboard from "./component/Admin/Dashboard";
import Products from "./component/Admin/Products";
import AddProduct from "./component/Admin/AddProduct";
import ProtectedRoutes from "./component/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/admin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",

    element: <ProtectedRoutes />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "details/:id",
        element: <Detail />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,

    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "/home/checkout",
    element: <CheckOut />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
