import React from "react";
import logo from "../images/around.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Around the US Logo" className="header__logo" />
    </header>
  );
};

export default Header;
