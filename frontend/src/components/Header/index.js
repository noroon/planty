import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { useAuthState } from '../../context';
import PlantyLogo from '../../assets/images/planty_logo.png';
import navLinks from './navLinks';
import NavBar from './NavBar';
import './style.scss';

export default function Header() {
  const user = useAuthState();
  const [checked, setChecked] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  const handleChange = () => {
    if (isMobile) setChecked(!checked);
  };

  return (
    <>
      <section className="navigation">
        <div className="nav-container d-flex">
          <div className="container d-flex">
            <div className="brand">
              <Link className="navbar-brand bg-white overflow-hidden" to="/">
                <img src={PlantyLogo} alt="logo" width="70px" />
              </Link>
            </div>
            <nav>
              <div id="menuToggle">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  id="hamburger"
                  checked={checked ? 'checked' : ''}
                />
                <span />
                <span />
                <span />
                <ul onFocus={handleChange}>
                  {user.userDetails ? (
                    <NavBar linkList={navLinks.registeredUser} />
                  ) : (
                    <NavBar linkList={navLinks.visitor} />
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </section>
      {user.userDetails.isAdmin && (
        <section className="navigation admin-nav">
          <div className="admin-nav-container d-flex container">
            {!isMobile && <p className="role">ADMIN</p>}
            <nav>
              {isMobile && (
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="admin-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    ADMIN
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="admin-dropdown"
                  >
                    {navLinks.admin.map((link) => {
                      const { title, id, path } = link;
                      return (
                        <li key={id} className="nav-item">
                          <NavLink id={id} className="dropdown-item" to={path}>
                            {title}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {!isMobile && (
                <ul>
                  <NavBar linkList={navLinks.admin} />
                </ul>
              )}
            </nav>
          </div>
        </section>
      )}
    </>
  );
}
