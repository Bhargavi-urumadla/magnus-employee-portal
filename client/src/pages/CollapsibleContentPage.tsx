import { useState } from "react";

type CollapseItem = {
  id: number;
  title: string;
  content: string;
};

const CollapsibleContentPage = () => {
  const [activeTab, setActiveTab] = useState<"single" | "multiple">(
    "multiple"
  );

  const [openItems, setOpenItems] = useState<number[]>([]);

  const items: CollapseItem[] = [
    {
      id: 1,
      title: "Know your goals and Prioritize Wisely",
      content:
        "Clearly define your goals and prioritize the activities that help you achieve them. Focus on important tasks before moving to less important activities.",
    },
    {
      id: 2,
      title: "Be focused and Eliminate Distractions",
      content:
        "Stay focused on your work and remove unnecessary distractions. Consistent concentration helps you complete your goals faster and more effectively.",
    },
    {
      id: 3,
      title: "Chose the right mentor to Succeed in career",
      content:
        "Choose a mentor who can guide you with practical experience, provide feedback and help you make better career decisions.",
    },
  ];

  const toggleItem = (id: number) => {
    if (activeTab === "single") {
      setOpenItems((current) =>
        current.includes(id) ? [] : [id]
      );
      return;
    }

    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

  return (
    <div className="magnus-page collapsible-page">

      {/* PAGE HEADER */}

      <div className="page-title-row">

        <h1>Collapsible Content</h1>

        <div className="breadcrumb">
          <span className="breadcrumb-home-icon">♟</span>
          <span>Home</span>
          <span>&gt;</span>
          <span>More</span>
          <span>&gt;</span>
          <span>Collapsible Content</span>
        </div>

      </div>

      {/* MAIN CARD */}

      <section className="collapsible-reference-card">

        {/* TABS */}

        <div className="collapse-tabs">

          <button
            type="button"
            className={`collapse-tab ${
              activeTab === "single" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("single");
              setOpenItems([]);
            }}
          >
            Single Collapse
          </button>

          <button
            type="button"
            className={`collapse-tab ${
              activeTab === "multiple" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("multiple");
              setOpenItems([]);
            }}
          >
            Multiple Collapse
          </button>

        </div>

        {/* ACCORDION */}

        <div className="collapse-content-area">

          <div className="accordion-list">

            {items.map((item) => (
              <div
                className="accordion-item"
                key={item.id}
              >

                <button
                  type="button"
                  className="accordion-header"
                  onClick={() => toggleItem(item.id)}
                >

                  <span className="accordion-title">
                    {item.title}
                  </span>

                  <span className="accordion-icon">
                    {isOpen(item.id) ? "−" : "+"}
                  </span>

                </button>

                {isOpen(item.id) && (
                  <div className="accordion-body">
                    {item.content}
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
};

export default CollapsibleContentPage;