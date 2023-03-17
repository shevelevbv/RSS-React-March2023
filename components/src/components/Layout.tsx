import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

class Layout extends React.Component {
  render() {
    return (
      <>
        <header>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/about'}>About Us</NavLink>
        </header>
        <Outlet />
        <footer>Bye</footer>
      </>
    );
  }
}

export default Layout;
