import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { employeeService } from "../services/employeeService";
import "./EmployeeForm.css";

const skillsList = [
  "AWS",
  "DevOps",
  "Full Stack Developer",
  "Middleware",
  "QA-Automation",
  "WebServices",
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  mobileNumber: "",
  dateOfBirth: "",
  gender: "Male" as "Male" | "Female",
  country: "India",
  city: "",
  otherCity: "",
  skills: [] as string[],
};

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  mobileNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  country?: string;
  city?: string;
  otherCity?: string;
  skills?: string;
};

const CreateEmployeePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [errors, setErrors] =
    useState<FormErrors>({});

  // =====================================================
  // UPDATE FIELD
  // =====================================================

  const updateField = (
    field: string,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Clear field error while typing
    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    // Clear general error
    setError("");
  };

  // =====================================================
  // SKILLS
  // =====================================================

  const handleSkillChange = (
    skill: string
  ) => {
    setFormData((previous) => {
      const exists =
        previous.skills.includes(skill);

      const updatedSkills = exists
        ? previous.skills.filter(
            (item) => item !== skill
          )
        : [
            ...previous.skills,
            skill,
          ];

      return {
        ...previous,
        skills: updatedSkills,
      };
    });

    setErrors((previous) => ({
      ...previous,
      skills: "",
    }));

    setError("");
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // ---------------------------------------------------
    // FIRST NAME
    // ---------------------------------------------------

    const firstName =
      formData.firstName.trim();

    if (!firstName) {
      newErrors.firstName =
        "First name is required";
    } else if (firstName.length < 2) {
      newErrors.firstName =
        "First name must be at least 2 characters";
    } else if (firstName.length > 50) {
      newErrors.firstName =
        "First name cannot exceed 50 characters";
    } else if (
      !/^[A-Za-z\s]+$/.test(firstName)
    ) {
      newErrors.firstName =
        "First name can contain only letters";
    }

    // ---------------------------------------------------
    // LAST NAME
    // ---------------------------------------------------

    const lastName =
      formData.lastName.trim();

    if (!lastName) {
      newErrors.lastName =
        "Last name is required";
    } else if (lastName.length < 2) {
      newErrors.lastName =
        "Last name must be at least 2 characters";
    } else if (lastName.length > 50) {
      newErrors.lastName =
        "Last name cannot exceed 50 characters";
    } else if (
      !/^[A-Za-z\s]+$/.test(lastName)
    ) {
      newErrors.lastName =
        "Last name can contain only letters";
    }

    // ---------------------------------------------------
    // EMAIL
    // ---------------------------------------------------

    const email =
      formData.email.trim();

    if (!email) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address";
    }

    // ---------------------------------------------------
    // MOBILE NUMBER
    // ---------------------------------------------------

    const mobileNumber =
      formData.mobileNumber.trim();

    if (!mobileNumber) {
      newErrors.mobileNumber =
        "Mobile number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(
        mobileNumber
      )
    ) {
      newErrors.mobileNumber =
        "Please enter a valid 10-digit Indian mobile number";
    }

    // ---------------------------------------------------
    // DATE OF BIRTH
    // ---------------------------------------------------

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth =
        "Date of birth is required";
    } else {
      const dob = new Date(
        formData.dateOfBirth
      );

      const today = new Date();

      if (Number.isNaN(dob.getTime())) {
        newErrors.dateOfBirth =
          "Please enter a valid date of birth";
      } else if (dob > today) {
        newErrors.dateOfBirth =
          "Date of birth cannot be in the future";
      }
    }

    // ---------------------------------------------------
    // GENDER
    // ---------------------------------------------------

    if (!formData.gender) {
      newErrors.gender =
        "Gender is required";
    }

    // ---------------------------------------------------
    // ADDRESS
    // ---------------------------------------------------

    const address =
      formData.address.trim();

    if (!address) {
      newErrors.address =
        "Address is required";
    } else if (address.length < 5) {
      newErrors.address =
        "Address must be at least 5 characters";
    } else if (address.length > 200) {
      newErrors.address =
        "Address cannot exceed 200 characters";
    }

    // ---------------------------------------------------
    // COUNTRY
    // ---------------------------------------------------

    if (!formData.country.trim()) {
      newErrors.country =
        "Country is required";
    }

    // ---------------------------------------------------
    // CITY
    // ---------------------------------------------------

    if (!formData.city.trim()) {
      newErrors.city =
        "City is required";
    }

    // ---------------------------------------------------
    // OTHER CITY
    // ---------------------------------------------------

    if (
      formData.otherCity &&
      formData.otherCity.trim().length > 50
    ) {
      newErrors.otherCity =
        "Other city cannot exceed 50 characters";
    }

    // ---------------------------------------------------
    // SKILLS
    // ---------------------------------------------------

    if (formData.skills.length > 20) {
      newErrors.skills =
        "You can add a maximum of 20 skills";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    // Run frontend validation
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      await employeeService.createEmployee(
        formData
      );

      window.alert(
        "Employee created successfully."
      );

      navigate("/employees");
    } catch (err: any) {
      console.error(
        "Create employee error:",
        err
      );

      /*
       * Backend validation errors
       * are displayed in a user-friendly way.
       */

      if (
        err?.errors &&
        Array.isArray(err.errors)
      ) {
        setError(
          err.errors.join(" ")
        );
      } else {
        setError(
          err?.message ||
            "Unable to create employee."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="employee-form-page">

      {/* =================================================
          PAGE HEADING
      ================================================= */}

      <div className="employee-form-heading">

        <div>
          <span className="employee-form-title">
            Employee
          </span>

          <span className="employee-form-subtitle">
            Create
          </span>
        </div>

        <div className="employee-form-breadcrumb">
          ♟ Home &nbsp;&gt;&nbsp; Employee &nbsp;&gt;&nbsp; Create
        </div>

      </div>

      {/* =================================================
          MAIN PANEL
      ================================================= */}

      <section className="employee-form-panel">

        <div className="employee-form-panel-title">
          Employee Details
        </div>

        {/* GENERAL API ERROR */}

        {error && (
          <div className="employee-form-error">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="employee-form"
          noValidate
        >

          {/* =================================================
              FIRST ROW
          ================================================= */}

          <div className="form-row three-columns">

            {/* FIRST NAME */}

            <div className="form-field">

              <label>
                First Name{" "}
                <span className="required">
                  *
                </span>
              </label>

              <input
                value={formData.firstName}
                maxLength={50}
                onChange={(e) =>
                  updateField(
                    "firstName",
                    e.target.value
                  )
                }
              />

              {errors.firstName && (
                <div className="field-error">
                  {errors.firstName}
                </div>
              )}

            </div>

            {/* LAST NAME */}

            <div className="form-field">

              <label>
                Last Name{" "}
                <span className="required">
                  *
                </span>
              </label>

              <input
                value={formData.lastName}
                maxLength={50}
                onChange={(e) =>
                  updateField(
                    "lastName",
                    e.target.value
                  )
                }
              />

              {errors.lastName && (
                <div className="field-error">
                  {errors.lastName}
                </div>
              )}

            </div>

            {/* EMAIL */}

            <div className="form-field">

              <label>
                Email{" "}
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
                }
              />

              {errors.email && (
                <div className="field-error">
                  {errors.email}
                </div>
              )}

            </div>

          </div>

          {/* =================================================
              ADDRESS
          ================================================= */}

          <div className="form-field full-field">

            <label>
              Address{" "}
              <span className="required">
                *
              </span>
            </label>

            <textarea
              rows={3}
              maxLength={200}
              value={formData.address}
              onChange={(e) =>
                updateField(
                  "address",
                  e.target.value
                )
              }
            />

            {errors.address && (
              <div className="field-error">
                {errors.address}
              </div>
            )}

          </div>

          {/* =================================================
              MOBILE / DOB / GENDER
          ================================================= */}

          <div className="form-row three-columns">

            {/* MOBILE */}

            <div className="form-field">

              <label>
                Mobile Number{" "}
                <span className="required">
                  *
                </span>
              </label>

              <input
                value={formData.mobileNumber}
                maxLength={10}
                inputMode="numeric"
                onChange={(e) => {
                  const value =
                    e.target.value.replace(
                      /\D/g,
                      ""
                    );

                  updateField(
                    "mobileNumber",
                    value
                  );
                }}
              />

              {errors.mobileNumber && (
                <div className="field-error">
                  {errors.mobileNumber}
                </div>
              )}

            </div>

            {/* DATE OF BIRTH */}

            <div className="form-field">

              <label>
                Date Of Birth{" "}
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="date"
                value={formData.dateOfBirth}
                max={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) =>
                  updateField(
                    "dateOfBirth",
                    e.target.value
                  )
                }
              />

              {errors.dateOfBirth && (
                <div className="field-error">
                  {errors.dateOfBirth}
                </div>
              )}

            </div>

            {/* GENDER */}

            <div className="gender-form-field">

              <label>
                Gender{" "}
                <span className="required">
                  *
                </span>
              </label>

              <div className="gender-options">

                <label>

                  <input
                    type="radio"
                    checked={
                      formData.gender ===
                      "Male"
                    }
                    onChange={() =>
                      updateField(
                        "gender",
                        "Male"
                      )
                    }
                  />

                  Male

                </label>

                <label>

                  <input
                    type="radio"
                    checked={
                      formData.gender ===
                      "Female"
                    }
                    onChange={() =>
                      updateField(
                        "gender",
                        "Female"
                      )
                    }
                  />

                  Female

                </label>

              </div>

              {errors.gender && (
                <div className="field-error">
                  {errors.gender}
                </div>
              )}

            </div>

          </div>

          {/* =================================================
              COUNTRY / CITY
          ================================================= */}

          <div className="form-row location-row">

            {/* COUNTRY */}

            <div className="form-field">

              <label>
                Country{" "}
                <span className="required">
                  *
                </span>
              </label>

              <select
                value={formData.country}
                onChange={(e) =>
                  updateField(
                    "country",
                    e.target.value
                  )
                }
              >

                <option value="India">
                  India
                </option>

                <option value="USA">
                  USA
                </option>

                <option value="UK">
                  UK
                </option>

              </select>

              {errors.country && (
                <div className="field-error">
                  {errors.country}
                </div>
              )}

            </div>

            {/* CITY */}

            <div className="form-field">

              <label>
                City{" "}
                <span className="required">
                  *
                </span>
              </label>

              <select
                value={formData.city}
                onChange={(e) =>
                  updateField(
                    "city",
                    e.target.value
                  )
                }
              >

                <option value="">
                  --Select City--
                </option>

                <option value="Hyderabad">
                  Hyderabad
                </option>

                <option value="Delhi">
                  Delhi
                </option>

                <option value="Mumbai">
                  Mumbai
                </option>

                <option value="Bangalore">
                  Bangalore
                </option>

                <option value="Chennai">
                  Chennai
                </option>

              </select>

              {errors.city && (
                <div className="field-error">
                  {errors.city}
                </div>
              )}

            </div>

            {/* OTHER CITY */}

            <label className="other-city-checkbox">

              <input
                type="checkbox"
                checked={
                  Boolean(
                    formData.otherCity
                  )
                }
                onChange={(e) => {

                  if (!e.target.checked) {
                    updateField(
                      "otherCity",
                      ""
                    );
                  } else {
                    updateField(
                      "otherCity",
                      "Other"
                    );
                  }

                }}
              />

              Other City

            </label>

          </div>

          {/* OTHER CITY INPUT */}

          {formData.otherCity === "Other" && (
            <div className="form-field full-field">

              <label>
                Other City
              </label>

              <input
                type="text"
                maxLength={50}
                value=""
                placeholder="Enter city name"
                onChange={(e) =>
                  updateField(
                    "otherCity",
                    e.target.value
                  )
                }
              />

              {errors.otherCity && (
                <div className="field-error">
                  {errors.otherCity}
                </div>
              )}

            </div>
          )}

          {/* =================================================
              SKILLS
          ================================================= */}

          <div className="skills-form-section">

            <h3>
              Skills
            </h3>

            <div className="skills-line" />

            <div className="skills-form-grid">

              {skillsList.map(
                (skill) => (

                  <label
                    key={skill}
                    className="skill-checkbox"
                  >

                    <input
                      type="checkbox"
                      checked={
                        formData.skills.includes(
                          skill
                        )
                      }
                      onChange={() =>
                        handleSkillChange(
                          skill
                        )
                      }
                    />

                    {skill}

                  </label>

                )
              )}

            </div>

            {errors.skills && (
              <div className="field-error">
                {errors.skills}
              </div>
            )}

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="employee-form-actions">

            <button
              type="submit"
              className="employee-save-button"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save"}
            </button>

            <button
              type="button"
              className="employee-cancel-button"
              onClick={() =>
                navigate("/employees")
              }
              disabled={loading}
            >
              Cancel
            </button>

          </div>

        </form>

      </section>

    </main>
  );
};

export default CreateEmployeePage;