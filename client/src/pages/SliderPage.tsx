import { useState } from "react";

const SliderPage = () => {
  const [value, setValue] = useState(26);

  return (
    <div className="jala-slider-page">

      {/* Page heading */}
      <div className="jala-page-heading">
        <h1>Slider</h1>

        <div className="jala-breadcrumb">
          <span>♟</span>
          <span>Home</span>
          <span>&gt;</span>
          <span>More</span>
          <span>&gt;</span>
          <span>Slider</span>
        </div>
      </div>

      {/* Main white box */}
      <section className="jala-slider-card">

        {/* Tab */}
        <div className="jala-slider-tab">
          Slider
        </div>

        {/* Content */}
        <div className="jala-slider-content">

          <div className="jala-slider-wrapper">

            {/* Value tooltip */}
            <div
              className="jala-slider-value-tooltip"
              style={{
                left: `calc(${value}% - 14px)`,
              }}
            >
              {value}
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(event) =>
                setValue(Number(event.target.value))
              }
              className="jala-slider-range"
              style={{
                background: `linear-gradient(
                  to right,
                  #3c8dbc 0%,
                  #3c8dbc ${value}%,
                  #eeeeee ${value}%,
                  #eeeeee 100%
                )`,
              }}
            />

          </div>

          <div className="jala-current-slider-value">
            Current Slider Value: {value}
          </div>

        </div>

      </section>

    </div>
  );
};

export default SliderPage;