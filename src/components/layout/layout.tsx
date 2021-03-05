import React from 'react';
import Header from './Header';

const Layout = ({ children }: {children: React.ReactNode}) => (
  <div className="layout">
    <Header />
    <section className="page-body page-body--middle">
      {children}
    </section>
  </div>
);

export default Layout;
