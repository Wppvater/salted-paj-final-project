import React from 'react';
import { Link } from 'gatsby';
import homeIcon from '../images/home.png';
import planIcon from '../images/plan.png';
import recipeIcon from '../images/recipe.png';
import profileIcon from '../images/profile.png';

const Nav = () => (
  <nav className="nav">
    <Link to="/">
      <div className="nav__home">
      <img src={homeIcon} alt="home-icon" className="nav__icon" />
      </div>
    </Link>
    <Link to="/plan">
      <div className="nav__plan">
      <img src={planIcon} alt="plan-icon" className="nav__icon" />
      </div>
    </Link>
    <Link to="/recipes">
      <div className="nav__recipes">
      <img src={recipeIcon} alt="recipe-icon" className="nav__icon" />
      </div>
    </Link>
    <Link to="/profile">
      <div className="nav_profile">
      <img src={profileIcon} alt="profile-icon" className="nav__icon" />
      </div>
    </Link>
  </nav>
  );


export default Nav;
