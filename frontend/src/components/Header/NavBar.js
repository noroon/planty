import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthDispatch, logout } from '../../context';

export default function NavBar({ linkList }) {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate('/login');
  };

  return (
    <>
      {linkList.map((link) => {
        const { title, id, path } = link;
        return (
          <li key={id} className="nav-item">
            {id === 'logout-link' ? (
              <NavLink
                id={id}
                className="nav-link"
                to={path}
                onClick={handleLogout}
              >
                {title}
              </NavLink>
            ) : (
              <NavLink id={id} className="nav-link" to={path}>
                {title}
              </NavLink>
            )}
          </li>
        );
      })}
    </>
  );
}
