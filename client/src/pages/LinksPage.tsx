import { useState } from "react";
import "./LinksPage.css";

type LinkTab = "working" | "broken" | "images" | "status";

const LinksPage = () => {
  const [activeTab, setActiveTab] = useState<LinkTab>("working");

  const openLink = (url: string) => {
    window.location.href = url;
  };

  const renderWorkingLinks = () => {
    return (
      <div className="links-demo working-links">
        <a
          href="https://www.google.com"
          className="working-link link-red"
         target="_self"
          rel="noopener noreferrer"
        >
          Link 1
        </a>

        <a
          href="https://www.tutorialspoint.com"
          className="working-link link-blue"
          target="_self"
          rel="noopener noreferrer"
        >
          Link 2
        </a>

        <a
          href="https://www.jalatechnologies.com"
          className="working-link link-green"
          target="_self"
          rel="noopener noreferrer"
        >
          Link 3
        </a>
      </div>
    );
  };

  const renderBrokenLinks = () => {
    return (
      <div className="links-demo broken-links">
        <a
          href="https://www.brokenlinkcheck.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="working-link link-red"
        >
          Broken Link 1
        </a>

        <a
          href="https://example.com/this-page-does-not-exist"
          target="_blank"
          rel="noopener noreferrer"
          className="working-link link-blue"
        >
          Broken Link 2
        </a>

        <a
          href="https://www.google.com/non-existing-page"
          target="_blank"
          rel="noopener noreferrer"
          className="working-link link-green"
        >
          Broken Link 3
        </a>
      </div>
    );
  };

  const renderImageLinks = () => {
    return (
      <div className="image-links-container">
        {/* Image 1 */}
        <button
          className="image-link-button"
          onClick={() => openLink("https://www.growictechnologies.com/")}
          aria-label="Growic Technologies"
        >
          <img
            src="https://via.placeholder.com/130x90?text=Growic"
            alt="Growic Technologies"
          />
        </button>

        {/* Image 2 */}
        <button
          className="image-link-button"
          onClick={() => openLink("https://www.linkedin.com/")}
          aria-label="LinkedIn"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn"
          />
        </button>

        {/* Image 3 */}
        <button
          className="image-link-button"
          onClick={() => openLink("https://www.google.com/")}
          aria-label="Google"
        >
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Google"
          />
        </button>

        {/* Image 4 */}
        <button
          className="image-link-button"
          onClick={() => openLink("https://jalatechnologies.com/")}
          aria-label="JALA Technologies"
        >
          <div className="jala-logo">
            JALA
            <span>TECHNOLOGIES</span>
          </div>
        </button>
      </div>
    );
  };

  const renderStatusCodes = () => {
    return (
      <div className="status-code-links">
        <a
          href="https://httpstat.us/200"
          target="_blank"
          rel="noopener noreferrer"
          className="status-code status-200"
        >
          200
        </a>

        <a
          href="https://httpstat.us/301"
          target="_blank"
          rel="noopener noreferrer"
          className="status-code status-301"
        >
          301
        </a>

        <a
          href="https://httpstat.us/404"
          target="_blank"
          rel="noopener noreferrer"
          className="status-code status-404"
        >
          404
        </a>

        <a
          href="https://httpstat.us/500"
          target="_blank"
          rel="noopener noreferrer"
          className="status-code status-500"
        >
          500
        </a>
      </div>
    );
  };

  return (
    <main className="links-page">
      {/* PAGE HEADER */}
      <div className="links-page-header">
        <h1>Links</h1>

        <div className="links-breadcrumb">
          <span className="breadcrumb-home">♟</span>
          <span>Home</span>
          <span>›</span>
          <span>More</span>
          <span>›</span>
          <span>Links</span>
        </div>
      </div>

      {/* MAIN CARD */}
      <section className="links-card">
        {/* TABS */}
        <div className="links-tabs">
          <button
            className={`links-tab ${
              activeTab === "working" ? "active" : ""
            }`}
            onClick={() => setActiveTab("working")}
          >
            Working Links
          </button>

          <button
            className={`links-tab ${
              activeTab === "broken" ? "active" : ""
            }`}
            onClick={() => setActiveTab("broken")}
          >
            Broken Links
          </button>

          <button
            className={`links-tab ${
              activeTab === "images" ? "active" : ""
            }`}
            onClick={() => setActiveTab("images")}
          >
            Image Links
          </button>

          <button
            className={`links-tab ${
              activeTab === "status" ? "active" : ""
            }`}
            onClick={() => setActiveTab("status")}
          >
            Status Codes
          </button>
        </div>

        {/* CONTENT */}
        <div className="links-card-content">
          {activeTab === "working" && renderWorkingLinks()}

          {activeTab === "broken" && renderBrokenLinks()}

          {activeTab === "images" && renderImageLinks()}

          {activeTab === "status" && renderStatusCodes()}
        </div>
      </section>
    </main>
  );
};

export default LinksPage;