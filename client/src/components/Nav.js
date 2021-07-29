import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import homeIcon from '../images/home.png';
import planIcon from '../images/plan.png';
import recipeIcon from '../images/recipe.png';
import profileIcon from '../images/profile.png';
import { useLocation } from '@reach/router';

const Nav = () => {
  const [navSchedule, setNavSchedule] = useState(false);
  const [navPlan, setNavPlan] = useState(false);
  const [navRecipes, setNavRecipes] = useState(false);
  const [clickedNavButton, setClickedNavButton] = useState(null);

  const location = useLocation();

  const clickSelectNav = (event, id, route) => {
    //setClickedNavButton(id);
    // clickedNavButton === id ? 
    // buttonState ? setButtonState(false) : setButtonState(true);
    navigate(route, { replace: true })
  }
  useEffect(() => {
    switch(location.pathname){
      case '/recipes':
        setNavRecipes(true);
        break;
      case '/plan':
        setNavPlan(true);
        break;
      case '/':
        setNavSchedule(true);
        break;
      default:
        console.log('New paths added, unable to highlight correct path');
    }
  })

return (
  <nav className="nav">
      <img src={homeIcon} alt="home-icon" id="1" className={navSchedule ? 'nav__home' :"nav__home nav__unselected"} onClick={e => clickSelectNav(e, 1, '/')}/>
    {/* <Link to="/plan"> */}
      <img src={planIcon} alt="plan-icon" id="2" className={navPlan? 'nav__plan' :"nav__plan nav__unselected"} onClick={e => clickSelectNav(e, 2, '/plan')} />
    {/* </Link> */}
    {/* <Link to="/recipes"> */}
      <img src={recipeIcon} alt="recipe-icon" id="3" className={navRecipes ? 'nav__recipes' :"nav__recipes nav__unselected"} onClick={e => clickSelectNav(e, 3, '/recipes')} />
    {/* </Link> */}
    {/* <Link to="/profile">
      <img src={profileIcon} alt="profile-icon" className="nav__icon nav__profile nav__icon__inactive" />
    </Link> */}
  </nav>
  );
};


export default Nav;
