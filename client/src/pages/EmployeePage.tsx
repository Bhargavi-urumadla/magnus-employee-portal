import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { employeeService } from "../services/employeeService";
import type { Employee } from "../types/employee";

import "./EmployeePage.css";

const LIMIT = 10;

const EmployeePage = () => {

  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [deleteEmployeeId, setDeleteEmployeeId] =
    useState<string | null>(null);

  const [deleteEmployeeName, setDeleteEmployeeName] =
    useState("");

  const [deleteLoading, setDeleteLoading] =
    useState(false);


  // =====================================================
  // FETCH EMPLOYEES
  // =====================================================

  const fetchEmployees = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await employeeService.getEmployees(
          currentPage,
          LIMIT,
          name,
          mobileNumber
        );

      setEmployees(response.data);

      setTotalPages(response.totalPages);

      setTotalEmployees(response.totalEmployees);

    } catch (err: any) {

      console.error(err);

      setError(
        err?.message ||
        "Unable to load employees."
      );

      setEmployees([]);

    } finally {

      setLoading(false);

    }

  }, [
    currentPage,
    name,
    mobileNumber,
  ]);


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchEmployees();

  }, [fetchEmployees]);


  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {

    setCurrentPage(1);

    /*
     * fetchEmployees will run after currentPage changes.
     *
     * If already on page 1, force the request manually.
     */

    if (currentPage === 1) {
      fetchEmployees();
    }
  };


  // =====================================================
  // CLEAR
  // =====================================================

  const handleClear = () => {

    setName("");
    setMobileNumber("");
    setCurrentPage(1);

  };


  // =====================================================
  // DELETE MODAL OPEN
  // =====================================================

  const openDeleteModal = (
    employee: Employee
  ) => {

    if (!employee._id) {
      return;
    }

    setDeleteEmployeeId(employee._id);

    setDeleteEmployeeName(
      `${employee.firstName} ${employee.lastName}`
    );
  };


  // =====================================================
  // CLOSE DELETE MODAL
  // =====================================================

  const closeDeleteModal = () => {

    if (deleteLoading) {
      return;
    }

    setDeleteEmployeeId(null);
    setDeleteEmployeeName("");

  };


  // =====================================================
  // CONFIRM DELETE
  // =====================================================

  const handleDelete = async () => {

    if (!deleteEmployeeId) {
      return;
    }

    try {

      setDeleteLoading(true);

      await employeeService.deleteEmployee(
        deleteEmployeeId
      );

      setDeleteEmployeeId(null);
      setDeleteEmployeeName("");

      /*
       * If the last employee on the page was deleted,
       * move back one page.
       */

      if (
        employees.length === 1 &&
        currentPage > 1
      ) {

        setCurrentPage(
          currentPage - 1
        );

      } else {

        await fetchEmployees();

      }

    } catch (err: any) {

      window.alert(
        err?.message ||
        "Unable to delete employee."
      );

    } finally {

      setDeleteLoading(false);

    }
  };


  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (
    value: string
  ) => {

    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString(
      "en-GB"
    );
  };


  // =====================================================
  // GENDER ICON
  // =====================================================

  const genderIcon = (
    gender: Employee["gender"]
  ) => {

    if (gender === "Female") {
      return "♀";
    }

    return "♂";
  };


  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const goToPage = (
    page: number
  ) => {

    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="employee-search-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="search-page-heading">

        <div className="search-title-area">

          <h1 className="search-page-title">
            Employee
          </h1>

          <span className="search-page-subtitle">
            Search
          </span>

        </div>


        <div className="search-breadcrumb">

          <span>
            ♟
          </span>

          <span>
            Home
          </span>

          <span className="breadcrumb-arrow">
            &gt;
          </span>

          <span>
            Employee
          </span>

          <span className="breadcrumb-arrow">
            &gt;
          </span>

          <span>
            Search
          </span>

        </div>

      </div>


      {/* =================================================
          MAIN PANEL
      ================================================= */}

      <section className="search-reference-panel">


        {/* =================================================
            PANEL HEADER
        ================================================= */}

        <div className="reference-panel-header">

          <h2 className="reference-panel-title">
            Search Employee
          </h2>


          <button
            type="button"
            className="reference-add-button"
            onClick={() =>
              navigate("/employees/create")
            }
          >
            Add Employee
          </button>

        </div>


        {/* =================================================
            SEARCH FORM
        ================================================= */}

        <div className="reference-search-form">

          <div className="reference-search-field">

            <label>
              Name
            </label>

            <input
              type="text"
              placeholder="Employee Name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              onKeyDown={(event) => {

                if (event.key === "Enter") {
                  handleSearch();
                }

              }}
            />

          </div>


          <div className="reference-search-field">

            <label>
              Mobile No
            </label>

            <input
              type="text"
              placeholder="Mobile No"
              value={mobileNumber}
              onChange={(event) =>
                setMobileNumber(
                  event.target.value
                )
              }
              onKeyDown={(event) => {

                if (event.key === "Enter") {
                  handleSearch();
                }

              }}
            />

          </div>


          <div className="reference-search-actions">

            <button
              type="button"
              className="reference-search-button"
              onClick={handleSearch}
            >
              Search
            </button>

            <button
              type="button"
              className="reference-clear-button"
              onClick={handleClear}
            >
              Clear
            </button>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="employee-error">
            {error}
          </div>

        )}


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="reference-table-container">

          <table className="reference-employee-table">

            <thead>

              <tr>

                <th>
                  First
                  <br />
                  Name
                  <span className="sort-icon">
                    ⇅
                  </span>
                </th>

                <th>
                  Last
                  <br />
                  Name
                  <span className="sort-icon">
                    ⇅
                  </span>
                </th>

                <th>
                  Mobile
                  <br />
                  No
                  <span className="sort-icon">
                    ⇅
                  </span>
                </th>

                <th>
                  Email Id
                  <span className="sort-icon">
                    ⇅
                  </span>
                </th>

                <th>
                  Gender
                </th>

                <th>
                  Birth
                  <br />
                  Date
                  <span className="sort-icon">
                    ⇅
                  </span>
                </th>

                <th>
                  Country
                  <span className="sort-icon">
                    ⇅
                  </span>
                </th>

                <th>
                  City
                  <span className="sort-icon">
                    ⇅
                  </span>
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={9}
                    className="no-employees"
                  >
                    Loading employees...
                  </td>

                </tr>

              ) : employees.length === 0 ? (

                <tr>

                  <td
                    colSpan={9}
                    className="no-employees"
                  >
                    No employees found.
                  </td>

                </tr>

              ) : (

                employees.map(
                  (employee) => (

                    <tr
                      key={employee._id}
                    >

                      <td>
                        {employee.firstName}
                      </td>

                      <td>
                        {employee.lastName}
                      </td>

                      <td>
                        {employee.mobileNumber}
                      </td>

                      <td
                        title={employee.email}
                      >
                        {employee.email}
                      </td>

                      <td className="gender-column">

                        <span
                          className={
                            employee.gender ===
                            "Female"
                              ? "female-icon"
                              : "male-icon"
                          }
                        >
                          {genderIcon(
                            employee.gender
                          )}
                        </span>

                      </td>

                      <td>
                        {formatDate(
                          employee.dateOfBirth
                        )}
                      </td>

                      <td>
                        {employee.country}
                      </td>

                      <td>
                        {employee.city ||
                          employee.otherCity ||
                          ""}
                      </td>

                      <td className="action-column">

                        <button
                          type="button"
                          className="table-edit-button"
                          onClick={() => {

                            if (employee._id) {

                              navigate(
                                `/employees/edit/${employee._id}`
                              );

                            }

                          }}
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          className="table-delete-button"
                          onClick={() =>
                            openDeleteModal(
                              employee
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="reference-pagination">

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              goToPage(1)
            }
          >
            First
          </button>


          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              goToPage(
                currentPage - 1
              )
            }
          >
            Previous
          </button>


          <button
            type="button"
            className="pagination-page-number"
          >
            {currentPage}
          </button>


          <span className="pagination-total">
            of {totalPages} Pages
          </span>


          <button
            type="button"
            disabled={
              currentPage >= totalPages
            }
            onClick={() =>
              goToPage(
                currentPage + 1
              )
            }
          >
            Next
          </button>


          <button
            type="button"
            disabled={
              currentPage >= totalPages
            }
            onClick={() =>
              goToPage(totalPages)
            }
          >
            Last
          </button>

        </div>

      </section>


      {/* ===================================================
          DELETE CONFIRMATION MODAL
      =================================================== */}

      {deleteEmployeeId && (

        <div
          className="delete-modal-overlay"
          onClick={closeDeleteModal}
        >

          <div
            className="delete-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              className="delete-modal-close"
              onClick={closeDeleteModal}
              disabled={deleteLoading}
            >
              ×
            </button>


            {/* WARNING ICON */}

            <div className="delete-warning-icon">
              !
            </div>


            {/* MESSAGE */}

            <h2>
              Are you sure you want to delete?
            </h2>


            {deleteEmployeeName && (

              <p className="delete-employee-name">
                {deleteEmployeeName}
              </p>

            )}


            {/* ACTIONS */}

            <div className="delete-modal-actions">

              <button
                type="button"
                className="delete-yes-button"
                disabled={deleteLoading}
                onClick={handleDelete}
              >
                {deleteLoading
                  ? "Deleting..."
                  : "Yes"}
              </button>


              <button
                type="button"
                className="delete-cancel-button"
                disabled={deleteLoading}
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
};

export default EmployeePage;