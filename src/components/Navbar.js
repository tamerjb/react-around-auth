import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import hamburgerIcon from '../images/icons/hamburger_icon.svg';
// import closeIcon from '../images/icons/close_icon.svg';

function Navbar({ loggedIn, email, handleSignout }) {
  const location = useLocation();
  console.log(location);
  const isLogin = location.pathname === '/signin';
  const isRegister = location.pathname === '/signup';

  return (
    <nav className='navbar'>
      <ul
        className={`header__links header__links_desktop ${
          isLogin || isRegister ? 'header__links_signup-login-page' : ''
        }`}
      >
        {isLogin && (
          <li className='header__link-item'>
            <Link to='/signup' className='header__link'>
              Sign up
            </Link>
          </li>
        )}
        {isRegister && (
          <li className='header__link-item'>
            <Link to='/signin' className='header__link'>
              Log in
            </Link>
          </li>
        )}
        {loggedIn && (
          <li className='header__link-item'>
            <Link to='/signin' className='header__link' onClick={handleSignout}>
              Log out
            </Link>
          </li>
        )}
        {loggedIn && <li className='header__link-item'>{email}</li>}
      </ul>
      {/* {!isRegister && !isLogin && (
        <button
          type='button'
          className='header__menu-button'
          onClick={toggleMobileMenu}
        >
          {!isMobileMenuOpen ? (
            <img
              src={hamburgerIcon}
              alt='menu'
              className='header__hamburger-icon'
            />
          ) : (
            <img src={closeIcon} alt='close' className='header__close-icon' />
          )}
        </button>
      )} */}
    </nav>
  );
}
export default Navbar;
