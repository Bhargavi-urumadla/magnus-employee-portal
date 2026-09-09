import { useState } from "react";
import "./CSSPropertiesPage.css";

type TabType =
  | "links"
  | "labels"
  | "buttons"
  | "alerts"
  | "progress";

const CSSPropertiesPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("links");

  const [visibleAlerts, setVisibleAlerts] = useState({
    success: true,
    info: true,
    warning: true,
    danger: true,
  });

  const closeAlert = (
    alertName: "success" | "info" | "warning" | "danger"
  ) => {
    setVisibleAlerts((previous) => ({
      ...previous,
      [alertName]: false,
    }));
  };

  const renderLinks = () => {
    return (
      <div className="css-demo css-links-demo">
        <a href="#link1" className="css-link css-link-red">
          Link 1
        </a>

        <a href="#link2" className="css-link css-link-blue">
          Link 2
        </a>

        <a href="#link3" className="css-link css-link-green">
          Link 3
        </a>

        <a href="#link4" className="css-link css-link-orange">
          Link 4
        </a>

        <a href="#link5" className="css-link css-link-purple">
          Link 5
        </a>
      </div>
    );
  };

  const renderLabels = () => {
    return (
      <div className="css-demo css-labels-demo">
        <span className="css-label label-default">
          Default
        </span>

        <span className="css-label label-primary">
          Primary
        </span>

        <span className="css-label label-success">
          Success
        </span>

        <span className="css-label label-info">
          Info
        </span>

        <span className="css-label label-warning">
          Warning
        </span>

        <span className="css-label label-danger">
          Danger
        </span>
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="css-demo css-buttons-demo">
        <button
          type="button"
          className="css-button button-default"
        >
          Default
        </button>

        <button
          type="button"
          className="css-button button-primary"
        >
          Primary
        </button>

        <button
          type="button"
          className="css-button button-success"
        >
          Success
        </button>

        <button
          type="button"
          className="css-button button-warning"
        >
          Warning
        </button>

        <button
          type="button"
          className="css-button button-danger"
        >
          Danger
        </button>
      </div>
    );
  };

  const renderAlerts = () => {
    return (
      <div className="css-alerts-demo">
        {visibleAlerts.success && (
          <div className="css-alert alert-success">
            <strong>Success!</strong>{" "}
            Indicates a successful or positive action.

            <button
              type="button"
              className="alert-close"
              onClick={() => closeAlert("success")}
              aria-label="Close success alert"
            >
              ×
            </button>
          </div>
        )}

        {visibleAlerts.info && (
          <div className="css-alert alert-info">
            <strong>Info!</strong>{" "}
            Indicates a neutral informative change or action.

            <button
              type="button"
              className="alert-close"
              onClick={() => closeAlert("info")}
              aria-label="Close info alert"
            >
              ×
            </button>
          </div>
        )}

        {visibleAlerts.warning && (
          <div className="css-alert alert-warning">
            <strong>Warning!</strong>{" "}
            Indicates a warning that might need attention.

            <button
              type="button"
              className="alert-close"
              onClick={() => closeAlert("warning")}
              aria-label="Close warning alert"
            >
              ×
            </button>
          </div>
        )}

        {visibleAlerts.danger && (
          <div className="css-alert alert-danger">
            <strong>Danger!</strong>{" "}
            Indicates a dangerous or potentially negative action.

            <button
              type="button"
              className="alert-close"
              onClick={() => closeAlert("danger")}
              aria-label="Close danger alert"
            >
              ×
            </button>
          </div>
        )}

        {!visibleAlerts.success &&
          !visibleAlerts.info &&
          !visibleAlerts.warning &&
          !visibleAlerts.danger && (
            <div className="alerts-empty">
              All alerts have been closed.
            </div>
          )}
      </div>
    );
  };

  const renderProgressBars = () => {
    return (
      <div className="css-demo css-progress-demo">
        <div className="progress-track">
          <div
            className="progress-bar progress-success"
            style={{ width: "40%" }}
          />
        </div>

        <div className="progress-track">
          <div
            className="progress-bar progress-info"
            style={{ width: "20%" }}
          />
        </div>

        <div className="progress-track">
          <div
            className="progress-bar progress-warning"
            style={{ width: "60%" }}
          />
        </div>

        <div className="progress-track">
          <div
            className="progress-bar progress-danger"
            style={{ width: "80%" }}
          />
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "links":
        return renderLinks();

      case "labels":
        return renderLabels();

      case "buttons":
        return renderButtons();

      case "alerts":
        return renderAlerts();

      case "progress":
        return renderProgressBars();

      default:
        return null;
    }
  };

  return (
    <main className="css-properties-page">
      {/* PAGE HEADER */}
      <div className="css-page-header">
        <h1 className="css-page-title">
          Css Properties
        </h1>

        <div className="css-breadcrumb">
          <span className="breadcrumb-home">
            ♟
          </span>

          <span>Home</span>

          <span className="breadcrumb-arrow">
            &gt;
          </span>

          <span>More</span>

          <span className="breadcrumb-arrow">
            &gt;
          </span>

          <span>Css Properties</span>
        </div>
      </div>

      {/* MAIN CARD */}
      <section className="css-properties-card">
        {/* TABS */}
        <div className="css-tabs">
          <button
            type="button"
            className={`css-tab ${
              activeTab === "links" ? "active" : ""
            }`}
            onClick={() => setActiveTab("links")}
          >
            Links
          </button>

          <button
            type="button"
            className={`css-tab ${
              activeTab === "labels" ? "active" : ""
            }`}
            onClick={() => setActiveTab("labels")}
          >
            Labels
          </button>

          <button
            type="button"
            className={`css-tab ${
              activeTab === "buttons" ? "active" : ""
            }`}
            onClick={() => setActiveTab("buttons")}
          >
            Buttons
          </button>

          <button
            type="button"
            className={`css-tab ${
              activeTab === "alerts" ? "active" : ""
            }`}
            onClick={() => setActiveTab("alerts")}
          >
            Alerts
          </button>

          <button
            type="button"
            className={`css-tab ${
              activeTab === "progress" ? "active" : ""
            }`}
            onClick={() => setActiveTab("progress")}
          >
            Progress Bars
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="css-tab-content">
          {renderTabContent()}
        </div>
      </section>
    </main>
  );
};

export default CSSPropertiesPage;