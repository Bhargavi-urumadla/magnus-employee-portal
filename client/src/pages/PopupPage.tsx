import { useState } from "react";

const PopupPage = () => {
  const [showInWindowPopup, setShowInWindowPopup] = useState(false);

  /*
   * ---------------------------------------------------------
   * COMMON POPUP WINDOW FUNCTION
   * ---------------------------------------------------------
   */
  const openExternalPopup = (
    url: string,
    windowName: string
  ) => {
    const popup = window.open(
      url,
      windowName,
      [
        "width=500",
        "height=500",
        "left=350",
        "top=120",
        "resizable=yes",
        "scrollbars=yes",
        "toolbar=yes",
        "location=yes",
        "status=yes",
      ].join(",")
    );

    if (!popup) {
      window.alert(
        "Popup was blocked by your browser. Please allow popups for this application."
      );

      return;
    }

    popup.focus();
  };


  /*
   * ---------------------------------------------------------
   * POPUP ONE
   * Google
   * ---------------------------------------------------------
   */
  const handlePopupOne = () => {
    openExternalPopup(
      "https://www.google.com",
      "jalaPopupOne"
    );
  };


  /*
   * ---------------------------------------------------------
   * POPUP TWO
   * TutorialsPoint
   * ---------------------------------------------------------
   */
  const handlePopupTwo = () => {
    openExternalPopup(
      "https://www.tutorialspoint.com",
      "jalaPopupTwo"
    );
  };


  /*
   * ---------------------------------------------------------
   * POPUP THREE
   * TutorialsTeacher
   * ---------------------------------------------------------
   */
  const handlePopupThree = () => {
    openExternalPopup(
      "https://www.tutorialsteacher.com",
      "jalaPopupThree"
    );
  };


  /*
   * ---------------------------------------------------------
   * POPUP DUPLICATE
   * JavaTpoint
   * ---------------------------------------------------------
   */
 const handlePopupDuplicate = () => {
  openExternalPopup(
    "https://jalatechnologies.com",
    "jalaPopupDuplicate"
  );
};

  /*
   * ---------------------------------------------------------
   * DUPLICATE TAB
   * ---------------------------------------------------------
   */
  const handleDuplicateTab = () => {
    window.open(
      window.location.href,
      "_blank"
    );
  };


  /*
   * ---------------------------------------------------------
   * IN WINDOW POPUP
   * ---------------------------------------------------------
   */
  const handleInWindowPopup = () => {
    setShowInWindowPopup(true);
  };


  /*
   * ---------------------------------------------------------
   * ALERT BOX
   * ---------------------------------------------------------
   */
  const handleAlertBox = () => {
    window.alert(
      "This is an alert Box!"
    );
  };


  /*
   * ---------------------------------------------------------
   * CONFIRM BOX
   * ---------------------------------------------------------
   */
  const handleConfirmBox = () => {
    const result = window.confirm(
      "Confirm Message Box"
    );

    if (result) {
      console.log(
        "User selected OK in Confirm Box"
      );
    } else {
      console.log(
        "User selected Cancel in Confirm Box"
      );
    }
  };


  /*
   * ---------------------------------------------------------
   * PROMPT BOX
   * ---------------------------------------------------------
   */
  const handlePromptBox = () => {
    const result = window.prompt(
      "Enter Your Name:",
      "JALA Academy- A Place to find your Dream Job"
    );

    if (result !== null) {
      console.log(
        "Prompt value:",
        result
      );
    }
  };


  /*
   * ---------------------------------------------------------
   * CLOSE MODAL
   * ---------------------------------------------------------
   */
  const closeInWindowPopup = () => {
    setShowInWindowPopup(false);
  };


  return (
    <>
      <main className="popup-page">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="popup-page-header">

          <h1 className="popup-page-title">
            Popup
          </h1>

          <div className="popup-breadcrumb">

            <span className="breadcrumb-home-icon">
              ♟
            </span>

            <span>
              Home
            </span>

            <span className="breadcrumb-arrow">
              &gt;
            </span>

            <span>
              More
            </span>

            <span className="breadcrumb-arrow">
              &gt;
            </span>

            <span>
              Popup
            </span>

          </div>

        </div>


        {/* =================================================
            POPUP CARD
        ================================================= */}

        <section className="popup-card">

          {/* TAB */}

          <div className="popup-tab">
            Popups
          </div>


          {/* CARD CONTENT */}

          <div className="popup-card-body">

            <div className="popup-buttons">

              {/* -----------------------------------------
                  ROW 1
              ----------------------------------------- */}

              <button
                type="button"
                className="popup-action-button"
                onClick={handlePopupOne}
              >
                Popup One
              </button>

              <button
                type="button"
                className="popup-action-button"
                onClick={handlePopupTwo}
              >
                Popup Two
              </button>

              <button
                type="button"
                className="popup-action-button"
                onClick={handlePopupThree}
              >
                Popup Three
              </button>


              {/* -----------------------------------------
                  ROW 2
              ----------------------------------------- */}

              <button
                type="button"
                className="popup-action-button"
                onClick={handlePopupDuplicate}
              >
                Popup Duplicate
              </button>

              <button
                type="button"
                className="popup-action-button"
                onClick={handleDuplicateTab}
              >
                Duplicate Tab
              </button>

              <button
                type="button"
                className="popup-action-button"
                onClick={handleInWindowPopup}
              >
                In Window Popup
              </button>


              {/* -----------------------------------------
                  ROW 3
              ----------------------------------------- */}

              <button
                type="button"
                className="popup-action-button"
                onClick={handleAlertBox}
              >
                Alert Box
              </button>

              <button
                type="button"
                className="popup-action-button"
                onClick={handleConfirmBox}
              >
                Confirm Box
              </button>

              <button
                type="button"
                className="popup-action-button"
                onClick={handlePromptBox}
              >
                Prompt Box
              </button>

            </div>

          </div>

        </section>

      </main>


      {/* ===================================================
          IN WINDOW POPUP / MODAL
      =================================================== */}

      {showInWindowPopup && (

        <div
          className="popup-modal-overlay"
          onClick={closeInWindowPopup}
        >

          <div
            className="popup-modal"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >

            {/* MODAL HEADER */}

            <div className="popup-modal-header">

              <span className="popup-modal-title">
                Popup One
              </span>

              <button
                type="button"
                className="popup-modal-x"
                onClick={closeInWindowPopup}
                aria-label="Close"
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="popup-modal-body">

              <p className="popup-body-heading">
                Popup One body..
              </p>

              <p className="popup-body-text">
                Cras mattis consectetur purus sit amet
                fermentum. Cras justo odio, dapibus ac
                facilisis in egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum
                at eros.
              </p>

            </div>


            {/* MODAL FOOTER */}

            <div className="popup-modal-footer">

              <button
                type="button"
                className="popup-close-button"
                onClick={closeInWindowPopup}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default PopupPage;