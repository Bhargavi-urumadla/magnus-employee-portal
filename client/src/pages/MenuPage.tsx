import { useState } from "react";

type MenuTab = "single" | "sub";

const MenuPage = () => {
  const [activeTab, setActiveTab] =
    useState<MenuTab>("single");

  const [selectedMenu, setSelectedMenu] =
    useState<string | null>(null);

  const [selectedSubMenu, setSelectedSubMenu] =
    useState<string | null>(null);

  const singleMenus = [
    "Testing",
    "Java",
    ".Net",
    "Data Base",
  ];

  const subMenus = [
    {
      name: "Testing",
      items: ["Selenium", "Cucumber", "Postman"],
    },
    {
      name: "Java",
      items: ["Core Java", "Advanced Java", "Spring"],
    },
    {
      name: ".Net",
      items: ["C#", "ASP.NET", ".NET Core"],
    },
    {
      name: "Data Base",
      items: ["SQL", "MySQL", "MongoDB"],
    },
  ];

  return (
    <div className="magnus-page">

      {/* PAGE TITLE */}

      <div className="page-title-row">

        <h1>Menu</h1>

        <div className="breadcrumb">
          <span>♟</span>
          <span>Home</span>
          <span>&gt;</span>
          <span>More</span>
          <span>&gt;</span>
          <span>Menu</span>
        </div>

      </div>

      {/* MAIN CARD */}

      <section className="menu-reference-card">

        {/* TABS */}

        <div className="menu-tabs">

          <button
            type="button"
            className={`menu-tab ${
              activeTab === "single"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setActiveTab("single");
              setSelectedMenu(null);
            }}
          >
            Single Menus
          </button>

          <button
            type="button"
            className={`menu-tab ${
              activeTab === "sub"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setActiveTab("sub");
              setSelectedSubMenu(null);
            }}
          >
            Sub Menus
          </button>

        </div>

        {/* CONTENT */}

        <div className="menu-content">

          {activeTab === "single" && (
            <div className="single-menu-list">

              {singleMenus.map((menu) => (
                <button
                  key={menu}
                  type="button"
                  className={`single-menu-item ${
                    selectedMenu === menu
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedMenu(menu)
                  }
                >
                  {menu}
                </button>
              ))}

            </div>
          )}

          {activeTab === "sub" && (
            <div className="sub-menu-list">

              {subMenus.map((menu) => (
                <div
                  className="sub-menu-group"
                  key={menu.name}
                >

                  <button
                    type="button"
                    className="sub-menu-heading"
                    onClick={() =>
                      setSelectedSubMenu(
                        selectedSubMenu === menu.name
                          ? null
                          : menu.name
                      )
                    }
                  >
                    <span>{menu.name}</span>

                    <span>
                      {selectedSubMenu === menu.name
                        ? "−"
                        : "+"}
                    </span>
                  </button>

                  {selectedSubMenu === menu.name && (
                    <div className="sub-menu-items">

                      {menu.items.map((item) => (
                        <button
                          type="button"
                          key={item}
                        >
                          {item}
                        </button>
                      ))}

                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>

      </section>

      {selectedMenu && (
        <div className="menu-selection-message">
          Selected Menu: <strong>{selectedMenu}</strong>
        </div>
      )}

    </div>
  );
};

export default MenuPage;