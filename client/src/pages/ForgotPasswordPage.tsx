import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    /*
     * For now this is frontend-only functionality.
     * Later, this can be connected to a backend
     * forgot-password API.
     */
    setSuccess("Password reset instructions have been sent to your email.");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">

        {/* Magnus Heading */}
        <h1 className="forgot-password-logo">
          Magnus
        </h1>

        {/* Forgot Password Card */}
        <div className="forgot-password-card">

          <div className="forgot-password-title">
            Forgot Password
          </div>

          <form onSubmit={handleSubmit}>

            {/* Email Input */}
            <div className="forgot-password-input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                  setSuccess("");
                }}
                placeholder=""
                className="forgot-password-input"
              />

              <span className="forgot-password-mail-icon">
                ✉
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="forgot-password-error">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="forgot-password-success">
                {success}
              </div>
            )}

            {/* Buttons */}
            <div className="forgot-password-actions">

              <button
                type="button"
                className="forgot-password-back"
                onClick={handleBack}
              >
                Back
              </button>

              <button
                type="submit"
                className="forgot-password-submit"
              >
                Get Password
              </button>

            </div>
          </form>
        </div>
      </div>

      {/* Top Right Error Notification */}
      {error && (
        <div className="forgot-password-toast">
          <div className="forgot-password-toast-icon">
            !
          </div>

          <div className="forgot-password-toast-message">
            <strong>Your email address not exist.</strong>
            <br />
            Error!
          </div>

          <button
            type="button"
            className="forgot-password-toast-close"
            onClick={() => setError("")}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;