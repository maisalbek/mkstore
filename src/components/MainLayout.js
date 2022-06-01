import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
