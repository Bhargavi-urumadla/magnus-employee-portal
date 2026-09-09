import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";

import MagnusLayout from "./components/MagnusLayout";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import MultipleTabsPage from "./pages/MultipleTabsPage";
import MenuPage from "./pages/MenuPage";
import AutocompletePage from "./pages/AutocompletePage";
import CollapsibleContentPage from "./pages/CollapsibleContentPage";
import ImagesPage from "./pages/ImagesPage";
import SliderPage from "./pages/SliderPage";
import TooltipPage from "./pages/TooltipPage";
import PopupPage from "./pages/PopupPage";
import LinksPage from "./pages/LinksPage";
import CSSPropertiesPage from "./pages/CSSPropertiesPage";
import IFramesPage from "./pages/IFramesPage";
import EditEmployeePage from "./pages/EditEmployeePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminLoginPage from "./pages/AdminLoginPage";

/* =====================================================
   PROTECTED ROUTE

   Only logged-in users can access the application.
   ===================================================== */

const ProtectedRoute = ({
  children,
}: {
  children: ReactNode;
}) => {
  const isLoggedIn =
    localStorage.getItem("magnusLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


/* =====================================================
   APP
   ===================================================== */

function App() {
  return (
    <Routes>

      {/* =================================================
          LOGIN PAGE
          PUBLIC - NO LOGIN REQUIRED
      ================================================= */}

      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
       <Route
    path="/admin-login"
    element={<AdminLoginPage />}
  />


      {/* =================================================
          ALL OTHER PAGES
          LOGIN REQUIRED
      ================================================= */}

      <Route
        element={
          <ProtectedRoute>
            <MagnusLayout />
          </ProtectedRoute>
        }
      >

        {/* ROOT */}

        <Route
          path="/"
          element={
            <Navigate
              to="/home"
              replace
            />
          }
        />


        {/* HOME */}

        <Route
          path="/home"
          element={<HomePage />}
        />


        {/* =================================================
            EMPLOYEE
        ================================================= */}

        <Route
          path="/employees"
          element={<EmployeePage />}
        />

        <Route
          path="/employees/create"
          element={<CreateEmployeePage />}
        />

        <Route
          path="/employees/edit/:id"
          element={<EditEmployeePage />}
        />


        {/* =================================================
            MORE
        ================================================= */}

        <Route
          path="/more/multiple-tabs"
          element={<MultipleTabsPage />}
        />

        <Route
          path="/more/menu"
          element={<MenuPage />}
        />

        <Route
          path="/more/autocomplete"
          element={<AutocompletePage />}
        />

        <Route
          path="/more/collapsible-content"
          element={<CollapsibleContentPage />}
        />

        <Route
          path="/more/images"
          element={<ImagesPage />}
        />

        <Route
          path="/more/slider"
          element={<SliderPage />}
        />

        <Route
          path="/more/tooltips"
          element={<TooltipPage />}
        />

        <Route
          path="/more/popups"
          element={<PopupPage />}
        />

        <Route
          path="/more/links"
          element={<LinksPage />}
        />

        <Route
          path="/more/css-properties"
          element={<CSSPropertiesPage />}
        />

        <Route
          path="/more/iframes"
          element={<IFramesPage />}
        />

      </Route>


      {/* =================================================
          UNKNOWN URL

          If user is not logged in, go to login.
          If logged in, go to home.
      ================================================= */}

      <Route
        path="*"
        element={
          localStorage.getItem("magnusLoggedIn") === "true" ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

    </Routes>
  );
}

export default App;