import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "./MagnusLayout.css";

const MagnusLayout = () => {
  const [employeeOpen, setEmployeeOpen] = useState(true);
  const [moreOpen, setMoreOpen] = useState(true);

  const moreItems = [
    { label: "Multiple Tabs", path: "/more/multiple-tabs" },
    { label: "Menu", path: "/more/menu" },
    { label: "Autocomplete", path: "/more/autocomplete" },
    { label: "Collapsible Content", path: "/more/collapsible-content" },
    { label: "Images", path: "/more/images" },
    { label: "Slider", path: "/more/slider" },
    { label: "Tooltips", path: "/more/tooltips" },
    { label: "Popups", path: "/more/popups" },
    { label: "Links", path: "/more/links" },
    { label: "CSS Properties", path: "/more/css-properties" },
    { label: "iFrames", path: "/more/iframes" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("magnusLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="magnus-app">
      {/* HEADER */}
      <header className="magnus-header">
        <div className="magnus-logo">
          Magnus
        </div>

        <button className="magnus-logout" onClick={handleLogout}>
          <span className="logout-icon">↪</span>
          Logout
        </button>
      </header>

      <div className="magnus-body">
        {/* SIDEBAR */}
        <aside className="magnus-sidebar">
          {/* PROFILE */}
          <div className="sidebar-profile">
            <div className="profile-image">
              <div className="profile-head"></div>
              <div className="profile-body"></div>
            </div>

            <div className="profile-info">
              <div className="profile-name">Guest User</div>

              <div className="profile-role">
                <span className="role-icon">♟</span>
                User
              </div>
            </div>
          </div>

          {/* HOME */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `sidebar-main-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">▣</span>
            <span>Home</span>
          </NavLink>

          {/* EMPLOYEE */}
          <button
            className="sidebar-main-link sidebar-dropdown-button"
            onClick={() => setEmployeeOpen(!employeeOpen)}
          >
            <span className="sidebar-icon">♟</span>
            <span>Employee</span>

            <span className="dropdown-arrow">
              {employeeOpen ? "⌄" : "‹"}
            </span>
          </button>

          {employeeOpen && (
            <div className="sidebar-submenu employee-submenu">
              <NavLink
                to="/employees/create"
                className={({ isActive }) =>
                  `sidebar-sub-link ${isActive ? "active" : ""}`
                }
              >
                <span className="sub-link-icon">♧</span>
                Create Employee search

              </NavLink>
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `sidebar-sub-link ${isActive ? "active" : ""}`
                }
              >
                <span className="sub-link-icon">♧</span>
                search
              </NavLink>

              
            </div>
          )}

          {/* MORE */}
          <button
            className={`sidebar-main-link sidebar-dropdown-button more-button ${
              moreOpen ? "section-open" : ""
            }`}
            onClick={() => setMoreOpen(!moreOpen)}
          >
            <span className="sidebar-icon">▦</span>
            <span>More</span>

            <span className="dropdown-arrow">
              {moreOpen ? "⌄" : "‹"}
            </span>
          </button>

          {moreOpen && (
            <div className="sidebar-submenu more-submenu">
              {moreItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-sub-link ${
                      isActive ? "active more-active" : ""
                    }`
                  }
                >
                  <span className="sub-link-icon">♧</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}

          {/* SETTINGS */}
          <button className="sidebar-main-link sidebar-dropdown-button settings-button">
            <span className="sidebar-icon">⚙</span>
            <span>Settings</span>

            <span className="dropdown-arrow">‹</span>
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="magnus-content">
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}
      <footer className="magnus-footer">
        <strong>Copyright © 2026</strong>{" "}
        <span className="footer-company">JALA Technologies</span>. All rights
        reserved.
      </footer>
    </div>
  );
};

export default MagnusLayout;