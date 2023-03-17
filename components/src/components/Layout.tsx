import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

class Layout extends React.Component {
  render = (): JSX.Element => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }
}

export default Layout;
