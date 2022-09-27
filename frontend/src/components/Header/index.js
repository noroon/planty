import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import AdminHeader from './AdminHeader/index.js';
import Navigation from './Navigation';
import PlantyLogo from '../../assets/images/planty_logo.png';
import { useAuthDispatch, logout } from '../../context';
import { useAuthState } from '../../context';
import { adminNavigation } from './navigation.config';
import './index.scss';

export default function Header() {
  const { userDetails } = useAuthState();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  
  const [ checked, setChecked ] = useState(false);

  const handleChange = () => {
    if (isMobile) setChecked(!checked);
  };

  const handleLogout = () => {
    logout(dispatch);
    navigate('/');
  };

  return (
    <>
      <section className="nav-container">
        {/* <div className="nav-container"> */}
          <div className="container d-flex">
            <Link className="logo-container bg-white" to="/">
              <img src={PlantyLogo} alt="logo" width="70px" />
            </Link>
            <Navigation
              userDetails={userDetails}
              handleChange={handleChange}
              handleLogout={handleLogout}
              checked={checked}
            />
          </div>
          {userDetails.isAdmin && (
            <AdminHeader
              adminNavigation={adminNavigation}
              isMobile={isMobile}
            />
          )}
        {/* </div> */}
      </section>
      <div className="navigation"/>
      <Outlet />
    </>
  );
}
