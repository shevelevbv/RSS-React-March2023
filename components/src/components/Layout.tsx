import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

class Layout extends React.Component {
  render() {
    return (
      <>
        <header className={'header'}>
          <NavLink to={'/'} className={'header__link'}>
            Home
          </NavLink>
          <NavLink to={'/about'} className={'header__link'}>
            About Us
          </NavLink>
        </header>
        <Outlet />
        <footer>Bye</footer>
      </>
    );
  }
}

export default Layout;
