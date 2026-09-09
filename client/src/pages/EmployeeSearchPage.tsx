import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Gender = "Male" | "Female";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  gender: Gender;
  birthDate: string;
  country: string;
  city: string;
}

const employeeData: Employee[] = [
  {
    id: 1,
    firstName: "nutan",
    lastName: "jha",
    mobile: "9876543234",
    email: "nutan@gmail.com",
    gender: "Male",
    birthDate: "07/09/1998",
    country: "India",
    city: "",
  },
  {
    id: 2,
    firstName: "roky",
    lastName: "kumar",
    mobile: "8745673423",
    email: "roky@gmail.com",
    gender: "Male",
    birthDate: "07/09/1998",
    country: "India",
    city: "",
  },
  {
    id: 3,
    firstName: "Raghav",
    lastName: "kuar",
    mobile: "7653402912",
    email: "raghav@gmail.con",
    gender: "Male",
    birthDate: "07/09/1998",
    country: "India",
    city: "",
  },
  {
    id: 4,
    firstName: "nutan",
    lastName: "jha",
    mobile: "9876543234",
    email: "nutan@gmail.com",
    gender: "Male",
    birthDate: "07/09/1998",
    country: "India",
    city: "",
  },
  {
    id: 5,
    firstName: "manasa",
    lastName: "Rekula",
    mobile: "8074208153",
    email: "manasa7585@gmail.com",
    gender: "Female",
    birthDate: "10/03/1986",
    country: "India",
    city: "Hyderabad",
  },
  {
    id: 6,
    firstName: "ARUN KUMAR",
    lastName: "SEELAM",
    mobile: "9381215028",
    email: "seelamarunkumar2018@gmail.com",
    gender: "Male",
    birthDate: "04/06/2000",
    country: "India",
    city: "Hyderabad",
  },
  {
    id: 7,
    firstName: "Ankur",
    lastName: "Garg",
    mobile: "1234566789",
    email: "ankurgarg89p@gmail.com",
    gender: "Male",
    birthDate: "16/06/2024",
    country: "India",
    city: "Delhi",
  },
  {
    id: 8,
    firstName: "Shwetha",
    lastName: "S M",
    mobile: "9019494334",
    email: "shwethasmswethasm2@gmail.com",
    gender: "Female",
    birthDate: "30/10/2003",
    country: "India",
    city: "Vijayanagar",
  },
  {
    id: 9,
    firstName: "hema",
    lastName: "singh",
    mobile: "7865434324",
    email: "hema@gmail.com",
    gender: "Male",
    birthDate: "07/09/1998",
    country: "India",
    city: "",
  },
  {
    id: 10,
    firstName: "nutan",
    lastName: "jha",
    mobile: "9876543234",
    email: "nutan@gmail.com",
    gender: "Male",
    birthDate: "07/09/1998",
    country: "India",
    city: "",
  },
];

const EmployeeSearchPage = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState<Employee[]>(employeeData);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const filteredEmployees = useMemo(() => {
    const nameSearch = name.trim().toLowerCase();
    const mobileSearch = mobile.trim();

    return employees.filter((employee) => {
      const employeeName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();

      const matchesName =
        nameSearch === "" ||
        employeeName.includes(nameSearch);

      const matchesMobile =
        mobileSearch === "" ||
        employee.mobile.includes(mobileSearch);

      return matchesName && matchesMobile;
    });
  }, [employees, name, mobile]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / pageSize)
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleClear = () => {
    setName("");
    setMobile("");
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    const employee = employees.find(
      (item) => item.id === id
    );

    if (!employee) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
    );

    if (!confirmed) {
      return;
    }

    setEmployees((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const handleEdit = (employee: Employee) => {
    alert(
      `Edit Employee\n\n${employee.firstName} ${employee.lastName}`
    );
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className="page-wrapper employee-search-page">

      {/* PAGE TITLE + BREADCRUMB */}
      <div className="search-page-heading">

        <div className="search-title-area">
          <span className="search-page-title">
            Employee
          </span>

          <span className="search-page-subtitle">
            Search
          </span>
        </div>

        <div className="search-breadcrumb">

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

          <span>Search</span>

        </div>

      </div>

      {/* SEARCH PANEL */}
      <section className="search-reference-panel">

        {/* PANEL HEADER */}
        <div className="reference-panel-header">

          <span className="reference-panel-title">
            Search Employee
          </span>

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

        {/* SEARCH FORM */}
        <div className="reference-search-form">

          <div className="reference-search-field">

            <label htmlFor="employee-name">
              Name
            </label>

            <input
              id="employee-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Employee Name"
            />

          </div>

          <div className="reference-search-field">

            <label htmlFor="employee-mobile">
              Mobile No
            </label>

            <input
              id="employee-mobile"
              type="text"
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Mobile No"
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

        {/* TABLE */}
        <div className="reference-table-container">

          <table className="reference-employee-table">

            <thead>
              <tr>

                <th>
                  First Name
                  <span className="sort-icon">
                    ↕
                  </span>
                </th>

                <th>
                  Last Name
                  <span className="sort-icon">
                    ↕
                  </span>
                </th>

                <th>
                  Mobile No
                  <span className="sort-icon">
                    ↕
                  </span>
                </th>

                <th className="email-column">
                  Email Id
                  <span className="sort-icon">
                    ↕
                  </span>
                </th>

                <th className="gender-column">
                  Gender
                </th>

                <th>
                  Birth Date
                  <span className="sort-icon">
                    ↕
                  </span>
                </th>

                <th>
                  Country
                  <span className="sort-icon">
                    ↕
                  </span>
                </th>

                <th>
                  City
                  <span className="sort-icon">
                    ↕
                  </span>
                </th>

                <th className="action-column">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {paginatedEmployees.map((employee) => (
                <tr key={employee.id}>

                  <td>
                    {employee.firstName}
                  </td>

                  <td>
                    {employee.lastName}
                  </td>

                  <td>
                    {employee.mobile}
                  </td>

                  <td className="email-column">
                    {employee.email}
                  </td>

                  <td className="gender-column">

                    {employee.gender === "Male" ? (
                      <span className="male-icon">
                        ♂
                      </span>
                    ) : (
                      <span className="female-icon">
                        ♀
                      </span>
                    )}

                  </td>

                  <td>
                    {employee.birthDate}
                  </td>

                  <td>
                    {employee.country}
                  </td>

                  <td>
                    {employee.city}
                  </td>

                  <td className="action-column">

                    <button
                      type="button"
                      className="table-edit-button"
                      onClick={() =>
                        handleEdit(employee)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="table-delete-button"
                      onClick={() =>
                        handleDelete(employee.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

              {paginatedEmployees.length === 0 && (
                <tr>

                  <td
                    colSpan={9}
                    className="no-employees"
                  >
                    No employees found
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        <div className="reference-pagination">

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              goToPage(currentPage - 1)
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
            disabled={currentPage === totalPages}
            onClick={() =>
              goToPage(currentPage + 1)
            }
          >
            Next
          </button>

        </div>

      </section>

    </div>
  );
};

export default EmployeeSearchPage;