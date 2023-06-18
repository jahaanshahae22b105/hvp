import Dashboard from "components/pages/dashboard";
import Layout from "components/layout";
import Login from "components/Login.js";
import Register from "components/Register.js";
import { createBrowserRouter } from "react-router-dom";
import Leaderboard from "components/pages/leaderboard";
import Upcomingcont from "components/pages/upcomingcont";


export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const LEADERBOARD = "/protected/leaderboard";
export const UPCOMINGCONT = "/protected/upcomingcont";
export const DASHBOARD = "/protected/dashboard";

export const router = createBrowserRouter([
  { path: ROOT, element: "Public Root" },
  { path: LOGIN, element: <Login/> },
  { path: REGISTER, element: <Register/> },
  { path: PROTECTED, element: <Layout/>, children: [
    { path: DASHBOARD, element: <Dashboard/> },
    { path: LEADERBOARD, element: <Leaderboard/> },
    { path: UPCOMINGCONT, element: <Upcomingcont/>}  
  ] }
 
]);