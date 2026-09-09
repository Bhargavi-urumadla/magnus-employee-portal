import { Employee as EmployeeModel } from "../models/Employee";
import type { Employee } from "../types/employee";

export interface EmployeeListResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  employees: Employee[];
}

interface GetEmployeesParams {
  search?: string;
  mobileNumber?: string;
  skill?: string;
  country?: string;
  city?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export const getEmployees = async ({
  search,
  mobileNumber,
  skill,
  country,
  city,
  sortBy = "createdAt",
  order = "desc",
  page = 1,
  limit = 10,
}: GetEmployeesParams = {}): Promise<EmployeeListResponse> => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);

  const skip = (safePage - 1) * safeLimit;

  const query: Record<string, any> = {};

  // Search by first name, last name, email or mobile
  if (search?.trim()) {
    const searchValue = search.trim();

    query.$or = [
      {
        firstName: {
          $regex: searchValue,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: searchValue,
          $options: "i",
        },
      },
      {
        email: {
          $regex: searchValue,
          $options: "i",
        },
      },
      {
        mobileNumber: {
          $regex: searchValue,
          $options: "i",
        },
      },
    ];
  }
if (mobileNumber?.trim()) {
  query.mobileNumber = {
    $regex: mobileNumber.trim(),
    $options: "i",
  };
}
  // Filter by skill
  if (skill?.trim()) {
    query.skills = {
      $regex: skill.trim(),
      $options: "i",
    };
  }

  // Filter by country
  if (country?.trim()) {
    query.country = {
      $regex: country.trim(),
      $options: "i",
    };
  }

  // Filter by city
  if (city?.trim()) {
    query.city = {
      $regex: city.trim(),
      $options: "i",
    };
  }

  // Sorting
  const allowedSortFields = [
    "firstName",
    "lastName",
    "email",
    "mobileNumber",
    "dateOfBirth",
    "country",
    "city",
    "createdAt",
  ];

  const selectedSortField = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

  const sort: Record<string, 1 | -1> = {
    [selectedSortField]: sortOrder,
  };

  const [employees, total] = await Promise.all([
    EmployeeModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(safeLimit)
      .lean(),

    EmployeeModel.countDocuments(query),
  ]);

  return {
    success: true,
    count: employees.length,
    total,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit),
    employees: employees as unknown as Employee[],
  };
};


// =====================================================
// CREATE EMPLOYEE
// =====================================================

export const createEmployee = async (
  employeeData: Employee
): Promise<Employee> => {
  const existingEmployee = await EmployeeModel.findOne({
    email: employeeData.email,
  });

  if (existingEmployee) {
    throw new Error("Employee with this email already exists");
  }

  const employee = await EmployeeModel.create(employeeData);

  return employee.toObject() as unknown as Employee;
};


// =====================================================
// GET SINGLE EMPLOYEE
// =====================================================

export const getEmployeeById = async (
  id: string
): Promise<Employee | null> => {
  const employee = await EmployeeModel.findById(id).lean();

  if (!employee) {
    return null;
  }

  return employee as unknown as Employee;
};


// =====================================================
// UPDATE EMPLOYEE
// =====================================================

export const updateEmployee = async (
  id: string,
  employeeData: Partial<Employee>
): Promise<Employee | null> => {
  if (employeeData.email) {
    const existingEmployee = await EmployeeModel.findOne({
      email: employeeData.email,
      _id: { $ne: id },
    });

    if (existingEmployee) {
      throw new Error(
        "Another employee with this email already exists"
      );
    }
  }

  const employee = await EmployeeModel.findByIdAndUpdate(
    id,
    employeeData,
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!employee) {
    return null;
  }

  return employee as unknown as Employee;
};


// =====================================================
// DELETE EMPLOYEE
// =====================================================

export const deleteEmployee = async (
  id: string
): Promise<Employee | null> => {
  const employee = await EmployeeModel.findByIdAndDelete(id).lean();

  if (!employee) {
    return null;
  }

  return employee as unknown as Employee;
};