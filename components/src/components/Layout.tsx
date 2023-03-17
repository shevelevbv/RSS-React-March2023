import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }
}

export default Layout;
