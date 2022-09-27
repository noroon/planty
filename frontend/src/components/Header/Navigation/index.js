import { visitorNavigation, userNavigation } from '../navigation.config';
import NavLinks from '../NavLinks';
import './index.scss';

export default function Navigation({ userDetails, handleChange, handleLogout, checked }) {
  return (
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
        <div onFocus={handleChange}>
          {userDetails ? (
            <NavLinks linkList={userNavigation} handleLogout={handleLogout} />
          ) : (
            <NavLinks linkList={visitorNavigation} />
          )}
        </div>
      </div>
    </nav>
  );
}
