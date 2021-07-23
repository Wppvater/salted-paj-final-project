import React from 'react';
import { Link } from 'gatsby';

const Nav = () => (
  <nav className="nav">
    <Link to="/">
      <div className="nav__home">
        HOME
      </div>
    </Link>
    <Link to="/plan">
      <div className="nav__plan">
        PLAN
      </div>
    </Link>
    <Link to="/recipes">
      <div className="nav__recipes">
        RECIPES
      </div>
    </Link>
    <Link to="/profile">
      <div className="nav_profile">
        PROFILE
      </div>
    </Link>
  </nav>
  );


export default Nav;
