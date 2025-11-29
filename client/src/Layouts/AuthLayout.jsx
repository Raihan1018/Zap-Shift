import React from "react";
import Logo from "../components/Logo/Logo";
import { Link, Outlet } from "react-router";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="flex">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1">
          <img src={authImage} alt="Auth Visual" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
