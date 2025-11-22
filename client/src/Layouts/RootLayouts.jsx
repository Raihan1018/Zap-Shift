import React from "react";
import Header from "../pages/Shared/Header/Header";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayouts = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen bg-gray-200">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayouts;
