import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import Prescribtion from "views/Prescription";

// Auth Imports
import SignIn from "views/auth/SignIn";
import Ambulance from "views/admin/ambulance";
import Maps from "views/admin/Maps";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard ></MainDashboard>,
  
  },
  {
    name: "Medicine",
    layout: "/admin",
    path: "medicine",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Prescription",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "prescription",
    component: <Prescribtion />,
  },
  {
    name: "Alarm",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  // {
  //   name: "Maps",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
  {
    name: "Maps",
    layout: "/admin",
    path: "google-maps",
    icon: <MdLock className="h-6 w-6" />,
    component: <Maps />,
  },
  {
    name: "Ambulance",
    layout: "/admin",
    path: "ambulance",
    icon: <MdLock className="h-6 w-6" />,
    component: <Ambulance />,
  },
  
  
];
export default routes;
