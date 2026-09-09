import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
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

    // Store login status
    localStorage.setItem("magnusLoggedIn", "true");

    if (rememberMe) {
      localStorage.setItem("magnusRememberMe", "true");
    } else {
      localStorage.removeItem("magnusRememberMe");
    }

    // Navigate to Home
    navigate("/home", { replace: true });
  };

  const handleForgotPassword = () => {
    alert("Forgot Password functionality is not available yet.");
  };

  const handleAdminLogin = () => {
    alert("Admin Login functionality is not available yet.");
  };

  return (
    <div className="login-page">

      {/* =================================================
          MAIN LOGIN CONTENT
      ================================================= */}

      <main className="login-main">

        {/* JALA ACADEMY */}

        <h1 className="login-academy-title">
          JALA Academy
        </h1>

        {/* LOGIN INFORMATION */}

        <div className="login-information">

          <p>
            Use the below details to login
          </p>

          <p>
            Email : training@jalaacademy.com
          </p>

          <p>
            Password : jobprogram
          </p>

        </div>

        {/* YELLOW MESSAGE */}

        <div className="login-announcement">
          <span>
            Learn everything on Real-Time Scenarios. FREE for
          </span>

          <span>
            all.
          </span>
        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="login-card">

          <div className="signin-title">
            Sign in
          </div>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="login-input-group">

              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="username"
              />

              <span className="input-icon">
                ✉
              </span>

            </div>

            {/* PASSWORD */}

            <div className="login-input-group">

              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
              />

              <span className="input-icon">
                🔒
              </span>

            </div>

            {/* ERROR */}

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* REMEMBER ME + SIGN IN */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked
                    )
                  }
                />

                <span>
                  Remember Me
                </span>

              </label>

              <button
                type="submit"
                className="signin-button"
              >
                Sign In
              </button>

            </div>

            {/* OR */}

            <div className="login-or">
              - OR -
            </div>

            {/* FORGOT PASSWORD */}

           <button
  type="button"
  className="forgot-password-button"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password
</button>

            {/* ADMIN LOGIN */}

           <button
  type="button"
  className="admin-login-link"
  onClick={() => navigate("/admin-login")}
>
  Admin Login
</button>

          </form>

        </div>

      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="login-footer">

        <div>
          JALA Academy offers Job Guaranteed Programs for
          Freshers to 12 years&apos; experience on Full Stack
          Development / Automation Testing / Dev-Ops / QA /
          SDET / Cyber Security / RPA / Cloud Technologies.
          Training would be completely on live Project
          scenarios.
        </div>

        <div>
          Read our website JALA Academy for more details :
          <a
            href="https://jalaacademy.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://jalaacademy.com/
          </a>
        </div>

      </footer>

    </div>
  );
};

export default LoginPage;