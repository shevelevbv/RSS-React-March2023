import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (): JSX.Element => (
  <>
    <header className="header">
      <NavLink to="/" className="header__link">
        Home
      </NavLink>
      <NavLink to="/about" className="header__link">
        About Us
      </NavLink>
      <NavLink to="/user" className="header__link">
        User Details
      </NavLink>
    </header>
  </>
);

export default Header;
