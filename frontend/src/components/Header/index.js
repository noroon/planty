import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthState } from '../../context';
import PlantyLogo from '../../assets/images/planty_logo.png';
import navLinks from './navLinks';
import NavBar from './NavBar';
import Icon from '../Icon';

export default function Header() {
  const user = useAuthState();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white mb-0 position-sticky top-0 w-100 mb-3"
    >
      <div className="container-fluid">
        <Link className="navbar-brand bg-white overflow-hidden" to="/">
          <img src={PlantyLogo} alt="logo" width="70px" />
        </Link>
        <button
          className="custom-toggler navbar-toggler shadow-none"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <Icon className="bi bi-list" />
        </button>
        <div
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
          id="navbar"
        >
          <ul className="navbar-nav w-100">
            {user.userDetails ? (
              <NavBar linkList={navLinks.registeredUser} />
            ) : (
              <NavBar linkList={navLinks.visitor} />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
