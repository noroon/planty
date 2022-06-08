// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

import { useAuthState } from '../../context';
// import PlantyLogo from '../../assets/images/planty_logo.png';
import navLinks from './navLinks';
import NavBar from './NavBar';
// import { Icon } from '../general';
import './style.scss';

export default function Header() {
  const user = useAuthState();
  // const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  // const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav
      role="navigation"
      className="d-flex flex-end navbar navbar-expand-lg navbar-light bg-white mb-0 position-sticky top-0 w-100 mb-3"
    >
      {/* <Link className="navbar-brand bg-white overflow-hidden" to="/">
        <img src={PlantyLogo} alt="logo" width="70px" />
      </Link> */}
      <div id="menuToggle">
        <input type="checkbox" />
        <span />
        <span />
        <span />
        <ul id="menu">
          {user.userDetails ? (
            <NavBar linkList={navLinks.registeredUser} />
          ) : (
            <NavBar linkList={navLinks.visitor} />
          )}
        </ul>
      </div>
      {/* </div> */}
    </nav>
  );
}
