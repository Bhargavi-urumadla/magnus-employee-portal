import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";



import type {
  Employee,
} from "../types/employee";

import "./EmployeeForm.css";

const skillsList = [
  "AWS",
  "DevOps",
  "Full Stack Developer",
  "Middleware",
  "QA-Automation",
  "WebServices",
];

const EditEmployeePage = () => {

  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const [formData, setFormData] =
    useState<Employee | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");


  // =====================================================
  // LOAD EMPLOYEE
  // =====================================================

  useEffect(() => {

    const loadEmployee = async () => {

      if (!id) {
        setError(
          "Employee ID is missing."
        );

        setLoading(false);

        return;
      }

      try {

        const employee =
          await employeeService.getEmployeeById(
            id
          );

        setFormData({
          ...employee,

          skills:
            employee.skills || [],

          country:
            employee.country || "India",

          city:
            employee.city || "",

          otherCity:
            employee.otherCity || "",

          gender:
            employee.gender || "Male",
        });

      } catch (err: any) {

        setError(
          err?.message ||
          "Unable to load employee."
        );

      } finally {

        setLoading(false);

      }
    };


    loadEmployee();

  }, [id]);


  // =====================================================
  // UPDATE FIELD
  // =====================================================

  const updateField = (
    field: string,
    value: string
  ) => {

    setFormData((previous) => {

      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        [field]: value,
      };

    });
  };


  // =====================================================
  // SKILL
  // =====================================================

  const handleSkillChange = (
    skill: string
  ) => {

    setFormData((previous) => {

      if (!previous) {
        return previous;
      }

      const exists =
        previous.skills.includes(skill);

      return {
        ...previous,

        skills: exists
          ? previous.skills.filter(
              (item) => item !== skill
            )
          : [
              ...previous.skills,
              skill,
            ],
      };

    });
  };


  // =====================================================
  // UPDATE
  // =====================================================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();

    if (!id || !formData) {
      return;
    }

    try {

      setSaving(true);

      setError("");

      await employeeService.updateEmployee(
        id,
        formData
      );

      window.alert(
        "Employee updated successfully."
      );

      navigate("/employees");

    } catch (err: any) {

      setError(
        err?.message ||
        "Unable to update employee."
      );

    } finally {

      setSaving(false);

    }
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <main className="employee-form-page">

        <div className="form-loading">
          Loading employee...
        </div>

      </main>
    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (!formData) {

    return (
      <main className="employee-form-page">

        <div className="employee-form-error">
          {error ||
            "Employee not found."}
        </div>

        <button
          type="button"
          className="employee-save-button"
          onClick={() =>
            navigate("/employees")
          }
        >
          Back
        </button>

      </main>
    );
  }


  return (
    <main className="employee-form-page">

      {/* HEADER */}

      <div className="employee-form-heading">

        <div>

          <span className="employee-form-title">
            Employee
          </span>

          <span className="employee-form-subtitle">
            Edit
          </span>

        </div>


        <div className="employee-form-breadcrumb">
          ♟ Home &nbsp;&gt;&nbsp; Employee &nbsp;&gt;&nbsp; Edit
        </div>

      </div>


      {/* PANEL */}

      <section className="employee-form-panel">

        <div className="employee-form-panel-title">
          Employee Details
        </div>


        {error && (

          <div className="employee-form-error">
            {error}
          </div>

        )}


        <form
          className="employee-form"
          onSubmit={handleSubmit}
        >

          {/* FIRST / LAST / EMAIL */}

          <div className="form-row three-columns">

            <div className="form-field">

              <label>
                First Name <span>*</span>
              </label>

              <input
                value={formData.firstName}
                onChange={(e) =>
                  updateField(
                    "firstName",
                    e.target.value
                  )
                }
              />

            </div>


            <div className="form-field">

              <label>
                Last Name <span>*</span>
              </label>

              <input
                value={formData.lastName}
                onChange={(e) =>
                  updateField(
                    "lastName",
                    e.target.value
                  )
                }
              />

            </div>


            <div className="form-field">

              <label>
                Email <span>*</span>
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

            </div>

          </div>


          {/* ADDRESS */}

          <div className="form-field full-field">

            <label>
              Address
            </label>

            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) =>
                updateField(
                  "address",
                  e.target.value
                )
              }
            />

          </div>


          {/* MOBILE / DOB / GENDER */}

          <div className="form-row three-columns">

            <div className="form-field">

              <label>
                Mobile Number <span>*</span>
              </label>

              <input
                value={formData.mobileNumber}
                onChange={(e) =>
                  updateField(
                    "mobileNumber",
                    e.target.value
                  )
                }
              />

            </div>


            <div className="form-field">

              <label>
                Date Of Birth
              </label>

              <input
                type="date"
                value={
                  formData.dateOfBirth
                    ? formData.dateOfBirth.slice(
                        0,
                        10
                      )
                    : ""
                }
                onChange={(e) =>
                  updateField(
                    "dateOfBirth",
                    e.target.value
                  )
                }
              />

            </div>


            <div className="gender-form-field">

              <label>
                Gender
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

            </div>

          </div>


          {/* LOCATION */}

          <div className="form-row location-row">

            <div className="form-field">

              <label>
                Country
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

            </div>


            <div className="form-field">

              <label>
                City
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

            </div>


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

                  }

                }}
              />

              Other City

            </label>

          </div>


          {/* SKILLS */}

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

          </div>


          {/* ACTIONS */}

          <div className="employee-form-actions">

            <button
              type="submit"
              className="employee-save-button"
              disabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update"}
            </button>


            <button
              type="button"
              className="employee-cancel-button"
              disabled={saving}
              onClick={() =>
                navigate("/employees")
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </section>

    </main>
  );
};

export default EditEmployeePage;