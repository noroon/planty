import { NavLink } from 'react-router-dom';

export default function NavLinks({
  linkList,
  listClassName = '',
  linkClassName = '',
  ariaLabel = '',
  handleLogout,
}) {
  return (
    <ul className={listClassName} aria-labelledby={ariaLabel}>
      {linkList.map(({ title, id, path }) => (
        <li key={id} className="nav-item">
          <NavLink
            id={id}
            className={`nav-link ${linkClassName}`}
            to={path}
            onClick={id === 'logout' ? handleLogout : ''}
          >
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
