import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => (
  <header className="page-header">
    <nav className="page-header__nav">
      <ul>
        <span className="logo">
          <Link to="/">Money $</Link>
        </span>
        <NavLink exact to="/" className="item" activeClassName="selected">Convert</NavLink>
        <NavLink exact to="/history" className="item" activeClassName="selected">History</NavLink>
      </ul>
    </nav>
  </header>
);

export default Header;
