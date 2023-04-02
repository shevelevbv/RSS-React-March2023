import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = (): JSX.Element => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Layout;
