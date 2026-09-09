import { useState } from "react";

type Tab = "plan" | "unlearning" | "ways";

const MultipleTabsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("plan");

  return (
    <div className="magnus-page">

      {/* PAGE TITLE */}
      <div className="page-title-row">

        <h1>Tabs</h1>

        <div className="breadcrumb">
          <span>♟</span>
          <span>Home</span>
          <span>&gt;</span>
          <span>More</span>
          <span>&gt;</span>
          <span>Tabs</span>
        </div>

      </div>

      {/* TABS CARD */}
      <section className="tabs-reference-card">

        {/* TAB HEADERS */}
        <div className="tabs-header">

          <button
            type="button"
            className={`tabs-button ${
              activeTab === "plan" ? "active" : ""
            }`}
            onClick={() => setActiveTab("plan")}
          >
            Plan to Succeed
          </button>

          <button
            type="button"
            className={`tabs-button ${
              activeTab === "unlearning" ? "active" : ""
            }`}
            onClick={() => setActiveTab("unlearning")}
          >
            UnLearning
          </button>

          <button
            type="button"
            className={`tabs-button ${
              activeTab === "ways" ? "active" : ""
            }`}
            onClick={() => setActiveTab("ways")}
          >
            Ways of Unlearning
          </button>

        </div>

        {/* TAB CONTENT */}
        <div className="tabs-content">

          {activeTab === "plan" && (
            <>
              <p>
                Congratulations, You are in the best place to learn
                the technologies for JOB. Please strictly follow the
                plan for the first 45 days to see the unbelievable
                results.
              </p>

              <p>
                You must UNLEARN to LEARN new things every day as
                technologies are changing faster than ever and Because
                the old rules will no longer apply...and so your old
                knowledge is. It's time for us to think beyond.
              </p>

              <p>
                It's not just learning technologies, Also You learn
                how to use your knowledge and experience to get a job
                in less than 100 days.
              </p>

              <div className="tabs-input-row">

                <input type="text" />

                <input type="text" />

              </div>
            </>
          )}

          {activeTab === "unlearning" && (
            <>
              <p>
                UnLearning helps you remove outdated approaches and
                prepare yourself to learn new technologies.
              </p>

              <p>
                Technology changes continuously. Be ready to learn,
                practice and adapt every day.
              </p>

              <div className="tabs-input-row">

                <input type="text" />

                <input type="text" />

              </div>
            </>
          )}

          {activeTab === "ways" && (
            <>
              <p>
                Ways of Unlearning helps you identify old habits and
                replace them with better approaches.
              </p>

              <p>
                Focus on practical learning, real projects and
                continuous improvement.
              </p>

              <div className="tabs-input-row">

                <input type="text" />

                <input type="text" />

              </div>
            </>
          )}

        </div>

      </section>

    </div>
  );
};

export default MultipleTabsPage;