import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(true);

  return (
    <aside className="magnus-sidebar">

      {/* PROFILE */}
      <div className="sidebar-profile">

        <div className="sidebar-avatar">
          <div className="avatar-head" />
          <div className="avatar-body" />
        </div>

        <div className="sidebar-profile-info">
          <div className="sidebar-user-name">
            Guest User
          </div>

          <div className="sidebar-user-role">
            ♟ &nbsp; User
          </div>
        </div>

      </div>

      {/* HOME */}
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `sidebar-link ${
            isActive ? "active" : ""
          }`
        }
      >
        <span className="sidebar-menu-icon">
          ♟
        </span>

        <span className="sidebar-text">
          Home
        </span>
      </NavLink>

      {/* EMPLOYEE */}
      <button
        type="button"
        className={`sidebar-link sidebar-button ${
          employeeOpen ? "parent-open" : ""
        }`}
        onClick={() =>
          setEmployeeOpen((value) => !value)
        }
      >
        <span className="sidebar-menu-icon">
          👥
        </span>

        <span className="sidebar-text">
          Employee
        </span>

        <span className="sidebar-chevron">
          {employeeOpen ? "⌄" : "‹"}
        </span>
      </button>

      {employeeOpen && (
        <div className="sidebar-submenu">

          {/* CREATE */}
          <NavLink
            to="/employees/create"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ✎
            </span>

            <span>
              Create
            </span>
          </NavLink>

          {/* SEARCH */}
          <NavLink
            to="/employees/search"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ⌕
            </span>

            <span>
              Search
            </span>
          </NavLink>

        </div>
      )}

      {/* MORE */}
      <button
        type="button"
        className={`sidebar-link sidebar-button ${
          moreOpen ? "parent-open" : ""
        }`}
        onClick={() =>
          setMoreOpen((value) => !value)
        }
      >
        <span className="sidebar-menu-icon">
          ▤
        </span>

        <span className="sidebar-text">
          More
        </span>

        <span className="sidebar-chevron">
          {moreOpen ? "⌄" : "‹"}
        </span>
      </button>

      {moreOpen && (
        <div className="sidebar-submenu">

          {/* MULTIPLE TABS */}
          <NavLink
            to="/more/tabs"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              Multiple Tabs
            </span>
          </NavLink>

          {/* MENU */}
          <NavLink
            to="/more/menu"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              Menu
            </span>
          </NavLink>

          {/* AUTOCOMPLETE */}
          <NavLink
            to="/more/autocomplete"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              Autocomplete
            </span>
          </NavLink>

          {/* COLLAPSIBLE CONTENT */}
          <NavLink
            to="/more/collapsible"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              Collapsible Content
            </span>
          </NavLink>

          {/* IMAGES */}
          <NavLink
            to="/more/images"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              Images
            </span>
          </NavLink>

          {/* SLIDER */}
          <NavLink
            to="/more/slider"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              Slider
            </span>
          </NavLink>

          {/* TOOLTIPS */}
          <NavLink
            to="/more/tooltips"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              Tooltips
            </span>
          </NavLink>

          {/* POPUPS */}
          <NavLink
            to="/more/popups"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              Popups
            </span>
          </NavLink>

          {/* LINKS */}
          <NavLink
            to="/more/links"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              Links
            </span>
          </NavLink>

          {/* CSS PROPERTIES */}
          <NavLink
            to="/more/css-properties"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              CSS Properties
            </span>
          </NavLink>

          {/* IFRAMES */}
          <NavLink
            to="/more/iframes"
            className={({ isActive }) =>
              `sidebar-sub-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-sub-icon">
              ♧
            </span>

            <span>
              iFrames
            </span>
          </NavLink>

        </div>
      )}

      {/* SETTINGS */}
      <button
        type="button"
        className="sidebar-link sidebar-button"
      >
        <span className="sidebar-menu-icon">
          ⚙
        </span>

        <span className="sidebar-text">
          Settings
        </span>

        <span className="sidebar-chevron">
          ‹
        </span>
      </button>

    </aside>
  );
};

export default Sidebar;