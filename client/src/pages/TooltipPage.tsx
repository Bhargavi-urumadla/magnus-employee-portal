import { useState } from "react";

const TooltipPage = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="jala-tooltip-page">

      {/* Page Header */}
      <div className="jala-page-heading">
        <h1>Tooltip</h1>

        <div className="jala-breadcrumb">
          <span>♟</span>
          <span>Home</span>
          <span>&gt;</span>
          <span>More</span>
          <span>&gt;</span>
          <span>Tooltip</span>
        </div>
      </div>

      {/* Main Panel */}
      <section className="jala-tooltip-card">

        {/* Tab */}
        <div className="jala-tooltip-tab">
          Tooltips
        </div>

        {/* Content */}
        <div className="jala-tooltip-content">

          <div
            className="tooltip-button-wrapper"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >

            <button
              type="button"
              className="jala-tooltip-button"
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            >
              Check the Tooltip Before You Click.
            </button>

            {showTooltip && (
              <div className="jala-tooltip-message">
                Thank you for being here!
              </div>
            )}

          </div>

        </div>

      </section>

    </div>
  );
};

export default TooltipPage;