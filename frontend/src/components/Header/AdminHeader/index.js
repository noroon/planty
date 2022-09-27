import NavLinks from '../NavLinks';
import './index.scss';

export default function AdminHeader({ adminNavigation, isMobile }) {
  return (
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
              <NavLinks
                linkList={adminNavigation}
                listClassName="dropdown-menu"
                linkClassName="dropdown-item"
                ariaLabel="admin-dropdown"
              />
            </div>
          )}
          {!isMobile && <NavLinks linkList={adminNavigation} />}
        </nav>
      </div>
    </section>
  );
}
