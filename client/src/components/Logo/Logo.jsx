import React from "react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end ">
      <img src={logo} alt="Zap-Shift" />
      <h2 className="font-bold text-2xl -ms-4">ZapShift</h2>
    </div>
  );
};

export default Logo;
