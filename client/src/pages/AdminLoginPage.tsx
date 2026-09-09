import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLoginPage.css";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("training@jalaacademy.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter password.");
      return;
    }

    /*
     * Admin login functionality.
     * For now, successful login uses the same
     * application login state.
     *
     * Later this can be connected to an admin API.
     */
    localStorage.setItem("magnusLoggedIn", "true");

    navigate("/home", { replace: true });
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">

        {/* Magnus Heading */}
        <h1 className="admin-login-logo">
          Magnus
        </h1>

        {/* Admin Login Card */}
        <div className="admin-login-card">

          <div className="admin-login-title">
            Admin - Sign in
          </div>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="admin-login-input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                className="admin-login-input"
              />

              <span className="admin-login-email-icon">
                ✉
              </span>
            </div>

            {/* Password */}
            <div className="admin-login-input-wrapper admin-login-password-wrapper">
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                className="admin-login-input"
              />

              <span className="admin-login-lock-icon">
                🔒
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="admin-login-error">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="admin-login-actions">

              <button
                type="button"
                className="admin-login-back"
                onClick={handleBack}
              >
                Back
              </button>

              <button
                type="submit"
                className="admin-login-submit"
              >
                Sign In
              </button>

            </div>
          </form>
        </div>

        {/* Announcement */}
        <div className="admin-login-announcement">
          JALA Technologies offers Job Guaranteed Programs for Freshers to
          10 years’ experience on JAVA/.Net / Automation Testing / Dev-Ops /
          Middleware Technologies / WebLogic / JBoss / Tomcat / Python/AI/
          DataScience and for those who want to be a software engineer in
          90 Days. Contact Details:
          <span> https://jalatechnologies.com/contact-us.html</span>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;