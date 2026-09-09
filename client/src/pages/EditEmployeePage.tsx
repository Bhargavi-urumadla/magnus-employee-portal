import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { employeeService } from "../services/employeeService";
import type { Employee } from "../types/employee";

import "./EditEmployeePage.css";

const skillsList = [
  "AWS",
  "DevOps",
  "Full Stack Developer",
  "Middleware",
  "QA-Automation",
  "WebServices",
];

const cities = [
  "Hyderabad",
  "Warangal",
  "Karimnagar",
  "Jagtial",
  "Vijayawada",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Delhi",
];

const initialForm: Employee = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  dateOfBirth: "",
  gender: "Male",
  address: "",
  country: "India",
  city: "",
  otherCity: "",
  skills: [],
};

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<Employee>(initialForm);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  /*
   * -------------------------------------------------------
   * LOAD EMPLOYEE
   * -------------------------------------------------------
   */

  useEffect(() => {
    const loadEmployee = async () => {
      if (!id) {
        setError("Employee ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const employee =
          await employeeService.getEmployeeById(id);

        setFormData({
          ...initialForm,
          ...employee,
          dateOfBirth: formatDateForInput(
            employee.dateOfBirth
          ),
          skills: employee.skills || [],
        });
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load employee."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  /*
   * -------------------------------------------------------
   * DATE FORMAT
   * -------------------------------------------------------
   */

  const formatDateForInput = (
    value: string
  ): string => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value.substring(0, 10);
    }

    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /*
   * -------------------------------------------------------
   * INPUT CHANGE
   * -------------------------------------------------------
   */

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  /*
   * -------------------------------------------------------
   * SKILL CHANGE
   * -------------------------------------------------------
   */

  const handleSkillChange = (
    skill: string,
    checked: boolean
  ) => {
    setFormData((previous) => {
      if (checked) {
        if (previous.skills.includes(skill)) {
          return previous;
        }

        return {
          ...previous,
          skills: [...previous.skills, skill],
        };
      }

      return {
        ...previous,
        skills: previous.skills.filter(
          (item) => item !== skill
        ),
      };
    });
  };

  /*
   * -------------------------------------------------------
   * OTHER CITY
   * -------------------------------------------------------
   */

  const isOtherCity =
    formData.otherCity !== undefined &&
    formData.otherCity.trim() !== "";

  const handleOtherCityToggle = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;

    setFormData((previous) => ({
      ...previous,
      otherCity: checked
        ? previous.otherCity || ""
        : "",
      city: checked ? "" : previous.city,
    }));
  };

  /*
   * -------------------------------------------------------
   * UPDATE EMPLOYEE
   * -------------------------------------------------------
   */

  const handleUpdate = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (!id) {
      setError("Employee ID is missing.");
      return;
    }

    if (!formData.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.mobileNumber.trim()) {
      setError("Mobile number is required.");
      return;
    }

    if (!formData.dateOfBirth) {
      setError("Date of birth is required.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Address is required.");
      return;
    }

    if (!formData.country) {
      setError("Country is required.");
      return;
    }

    if (!formData.city && !formData.otherCity?.trim()) {
      setError("Please select a city.");
      return;
    }

    try {
      setUpdating(true);
      setError("");
      setSuccessMessage("");

      await employeeService.updateEmployee(id, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address.trim(),
        country: formData.country,
        city: formData.city,
        otherCity: formData.otherCity?.trim() || "",
        skills: formData.skills,
      });

      setSuccessMessage(
        "Employee updated successfully."
      );

      /*
       * Give the user a short success indication,
       * then return to Employee Search.
       */
      setTimeout(() => {
        navigate("/employees");
      }, 700);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update employee."
      );
    } finally {
      setUpdating(false);
    }
  };

  /*
   * -------------------------------------------------------
   * LOADING
   * -------------------------------------------------------
   */

  if (loading) {
    return (
      <main className="magnus-edit-page">
        <div className="magnus-edit-loading">
          Loading employee...
        </div>
      </main>
    );
  }

  /*
   * -------------------------------------------------------
   * PAGE
   * -------------------------------------------------------
   */

  return (
    <main className="magnus-edit-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="magnus-edit-heading">

        <div className="magnus-edit-title">
          <h1>Employee</h1>

          <span>Edit</span>
        </div>

        <div className="magnus-edit-breadcrumb">

          <span className="breadcrumb-home-icon">
            ♟
          </span>

          <span>Home</span>

          <span className="breadcrumb-arrow">
            &gt;
          </span>

          <span>Employee</span>

          <span className="breadcrumb-arrow">
            &gt;
          </span>

          <span>Edit</span>

        </div>

      </div>


      {/* =================================================
          MAIN CARD
      ================================================= */}

      <form
        className="magnus-edit-card"
        onSubmit={handleUpdate}
      >

        {/* CARD HEADER */}

        <div className="magnus-edit-card-header">
          Employee Details
        </div>


        {/* ERROR */}

        {error && (
          <div className="magnus-edit-error">
            {error}
          </div>
        )}


        {/* SUCCESS */}

        {successMessage && (
          <div className="magnus-edit-success">
            {successMessage}
          </div>
        )}


        {/* =================================================
            FORM CONTENT
        ================================================= */}

        <div className="magnus-edit-form">

          {/* FIRST NAME */}

          <div className="magnus-form-field">

            <label htmlFor="firstName">
              First Name
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />

          </div>


          {/* LAST NAME */}

          <div className="magnus-form-field">

            <label htmlFor="lastName">
              Last Name
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />

          </div>


          {/* EMAIL */}

          <div className="magnus-form-field">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>


          {/* ADDRESS */}

          <div className="magnus-form-field magnus-address-field">

            <label htmlFor="address">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

          </div>


          {/* MOBILE */}

          <div className="magnus-form-field">

            <label htmlFor="mobileNumber">
              Mobile Number
            </label>

            <input
              id="mobileNumber"
              name="mobileNumber"
              type="text"
              maxLength={10}
              value={formData.mobileNumber}
              onChange={handleChange}
            />

          </div>


          {/* DATE OF BIRTH */}

          <div className="magnus-form-field">

            <label htmlFor="dateOfBirth">
              Date Of Birth
            </label>

            <div className="magnus-date-input">

              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />

              <span className="magnus-calendar-icon">
                ▣
              </span>

            </div>

          </div>


          {/* GENDER */}

          <div className="magnus-form-field magnus-gender-field">

            <label>
              Gender
            </label>

            <div className="magnus-gender-options">

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={
                    formData.gender === "Male"
                  }
                  onChange={handleChange}
                />

                <span>Male</span>
              </label>


              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={
                    formData.gender === "Female"
                  }
                  onChange={handleChange}
                />

                <span>Female</span>
              </label>

            </div>

          </div>


          {/* COUNTRY */}

          <div className="magnus-form-field">

            <label htmlFor="country">
              Country
            </label>

            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >

              <option value="India">
                India
              </option>

            </select>

          </div>


          {/* CITY */}

          <div className="magnus-form-field">

            <label htmlFor="city">
              City
            </label>

            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={isOtherCity}
            >

              <option value="">
                --Select City--
              </option>

              {cities.map((city) => (
                <option
                  key={city}
                  value={city}
                >
                  {city}
                </option>
              ))}

            </select>

          </div>


          {/* OTHER CITY */}

          <div className="magnus-other-city">

            <label>

              <input
                type="checkbox"
                checked={isOtherCity}
                onChange={
                  handleOtherCityToggle
                }
              />

              <span>
                Other City
              </span>

            </label>

          </div>


          {/* OTHER CITY INPUT */}

          {isOtherCity && (
            <div className="magnus-other-city-input">

              <input
                type="text"
                name="otherCity"
                placeholder="Enter city"
                value={
                  formData.otherCity || ""
                }
                onChange={handleChange}
              />

            </div>
          )}

        </div>


        {/* =================================================
            SKILLS
        ================================================= */}

        <div className="magnus-skills-section">

          <h2>Skills</h2>

          <div className="magnus-skills-divider" />

          <div className="magnus-skills-grid">

            {skillsList.map((skill) => (

              <label
                key={skill}
                className="magnus-skill-item"
              >

                <input
                  type="checkbox"
                  checked={formData.skills.includes(
                    skill
                  )}
                  onChange={(event) =>
                    handleSkillChange(
                      skill,
                      event.target.checked
                    )
                  }
                />

                <span>{skill}</span>

              </label>

            ))}

          </div>

        </div>


        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="magnus-edit-actions">

          <button
            type="submit"
            className="magnus-update-button"
            disabled={updating}
          >
            {updating
              ? "Updating..."
              : "Update"}
          </button>


          <button
            type="button"
            className="magnus-cancel-button"
            disabled={updating}
            onClick={() =>
              navigate("/employees")
            }
          >
            Cancel
          </button>

        </div>

      </form>

    </main>
  );
};

export default EditEmployeePage;