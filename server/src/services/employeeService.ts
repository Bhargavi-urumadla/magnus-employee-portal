import { Employee, IEmployee } from "../models/Employee";

interface GetEmployeesOptions {
  search?: string;
  skill?: string;
  country?: string;
  city?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}

interface GetEmployeesResult {
  employees: IEmployee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const createEmployee = async (
  employeeData: Partial<IEmployee>
): Promise<IEmployee> => {
  return Employee.create(employeeData);
};

export const getEmployees = async (
  options: GetEmployeesOptions = {}
): Promise<GetEmployeesResult> => {
  const {
    search,
    skill,
    country,
    city,
    sortBy = "createdAt",
    order = "desc",
    page = 1,
    limit = 10,
  } = options;

  const filter: Record<string, unknown> = {};

  // Search by first name, last name or email
  if (search?.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");

    filter.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { email: searchRegex },
    ];
  }

  // Filter by skill
  if (skill?.trim()) {
    filter.skills = {
      $regex: skill.trim(),
      $options: "i",
    };
  }

  // Filter by country
  if (country?.trim()) {
    filter.country = {
      $regex: country.trim(),
      $options: "i",
    };
  }

  // Filter by city
  if (city?.trim()) {
    filter.city = {
      $regex: city.trim(),
      $options: "i",
    };
  }

  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(
    Math.max(1, Number(limit) || 10),
    100
  );

  const skip = (safePage - 1) * safeLimit;

  // Allowed sorting fields
  const allowedSortFields = [
    "firstName",
    "lastName",
    "email",
    "country",
    "city",
    "createdAt",
    "updatedAt",
  ];

  const selectedSortField = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

  const [employees, total] = await Promise.all([
    Employee.find(filter)
      .sort({ [selectedSortField]: sortOrder })
      .skip(skip)
      .limit(safeLimit),

    Employee.countDocuments(filter),
  ]);

  return {
    employees,
    total,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit),
  };
};

export const getEmployeeById = async (
  employeeId: string
): Promise<IEmployee | null> => {
  return Employee.findById(employeeId);
};

export const updateEmployee = async (
  employeeId: string,
  employeeData: Partial<IEmployee>
): Promise<IEmployee | null> => {
  return Employee.findByIdAndUpdate(
    employeeId,
    employeeData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteEmployee = async (
  employeeId: string
): Promise<IEmployee | null> => {
  return Employee.findByIdAndDelete(employeeId);
};