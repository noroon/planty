import { Link } from 'react-router-dom';

import { useAuthState } from '../../context';
import PlantyLogo from '../../assets/images/planty_logo.png';
import navLinks from './navLinks';
import NavBar from './NavBar';
import './style.scss';

export default function Header() {
  const user = useAuthState();

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
            <input type="checkbox" id="hamburger" />
            <span />
            <span />
            <span />
            <ul>
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
