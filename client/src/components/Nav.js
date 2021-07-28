import React, { useState } from 'react';
import { Link } from 'gatsby';
import homeIcon from '../images/home.png';
import planIcon from '../images/plan.png';
import recipeIcon from '../images/recipe.png';
import profileIcon from '../images/profile.png';

const Nav = () => {

  const [navSchedule, setNavSchedule] = useState(false);
  const [navPlan, setNavPlan] = useState(false);
  const [navRecipes, setNavRecipes] = useState(false);

  const clickSelectNav = (event, buttonState, setButtonState) => {
    buttonState ? setButtonState(false) : setButtonState(true);
    event.target.classList.toggle('nav__selected');
  }

return (
  <nav className="nav">
    <Link to="/">
      <img src={homeIcon} alt="home-icon" className="nav__icon nav__home" />
    </Link>
    <Link to="/plan">
      <img src={planIcon} alt="plan-icon" className="nav__icon nav__plan nav__icon__inactive" />
    </Link>
    <Link to="/recipes">
      <img src={recipeIcon} alt="recipe-icon" className="nav__icon nav__recipes nav__icon__inactive" />
    </Link>
    {/* <Link to="/profile">
      <img src={profileIcon} alt="profile-icon" className="nav__icon nav__profile nav__icon__inactive" />
    </Link> */}
  </nav>
  );
};


export default Nav;
