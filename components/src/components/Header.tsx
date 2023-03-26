import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  render = (): JSX.Element => {
    return (
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
  };
}

export default Header;
