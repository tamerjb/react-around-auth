import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../images/around.svg';
import Navbar from './Navbar';

const Header = ({ loggedIn, email, handleSignout }) => {
  // const location = useLocation();
  // console.log(location);
  // const isLogin = location.pathname === '/signin';
  // const isRegister = location.pathname === '/signup';
  return (
    <header className='header'>
      <div className='header__container'>
        <img src={logo} alt='Around the US Logo' className='header__logo' />
        {/* <Navbar
          loggedIn={loggedIn}
          email={email}
          handleSignout={handleSignout}
        /> */}
      </div>
    </header>
  );
};

export default Header;
