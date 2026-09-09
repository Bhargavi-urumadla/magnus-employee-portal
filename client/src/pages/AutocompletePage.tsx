import { useState } from "react";

const suggestions = [
  "React",
  "React Native",
  "Redux",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
];

const AutocompletePage = () => {
  const [activeTab, setActiveTab] = useState<
    "single" | "multiple"
  >("single");

  const [value, setValue] = useState("");

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="magnus-page">

      <div className="page-title-row">

        <h1>Autocomplete</h1>

        <div className="breadcrumb">
          <span>♟</span>
          <span>Home</span>
          <span>&gt;</span>
          <span>More</span>
          <span>&gt;</span>
          <span>Autocomplete</span>
        </div>

      </div>

      <section className="more-reference-card">

        <div className="reference-tabs">

          <button
            type="button"
            className={
              activeTab === "single"
                ? "reference-tab active"
                : "reference-tab"
            }
            onClick={() => setActiveTab("single")}
          >
            Single Values
          </button>

          <button
            type="button"
            className={
              activeTab === "multiple"
                ? "reference-tab active"
                : "reference-tab"
            }
            onClick={() => setActiveTab("multiple")}
          >
            Multiple Values
          </button>

        </div>

        <div className="reference-tab-content">

          <label htmlFor="autocomplete">
            Tags :
          </label>

          <div className="autocomplete-wrapper">

            <input
              id="autocomplete"
              type="text"
              value={value}
              onChange={(event) =>
                setValue(event.target.value)
              }
              autoComplete="off"
            />

            {value &&
              filteredSuggestions.length > 0 && (
                <div className="autocomplete-dropdown">

                  {filteredSuggestions.map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() =>
                          setValue(suggestion)
                        }
                      >
                        {suggestion}
                      </button>
                    )
                  )}

                </div>
              )}

          </div>

        </div>

      </section>

    </div>
  );
};

export default AutocompletePage;