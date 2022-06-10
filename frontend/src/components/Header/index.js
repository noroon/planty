import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  console.log('checked: ', checked);
  console.log('mobil:', isMobile);

  return (
    <section className="navigation">
      <div className="nav-container d-flex container">
        <div className="brand">
          <Link className="navbar-brand bg-white overflow-hidden" to="/">
            <img src={PlantyLogo} alt="logo" width="70px" />
          </Link>
        </div>
        <nav>
          <div id="menuToggle">
            <input onChange={handleChange} type="checkbox" id="hamburger" checked={checked ? 'checked' : ''} />
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
    </section>
  );
}
