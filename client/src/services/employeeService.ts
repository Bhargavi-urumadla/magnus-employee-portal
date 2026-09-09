import type { Employee } from "../types/employee";

const API_URL = "http://localhost:5000/api/employees";

export interface EmployeeListResponse {
  data: Employee[];
  totalEmployees: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

interface BackendEmployeeResponse {
  success?: boolean;
  count?: number;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  data?: Employee[];
}

const handleResponse = async (response: Response) => {
  let result: any = null;

  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return result;
};

export const employeeService = {
  // =====================================================
  // GET EMPLOYEES
  // =====================================================

  getEmployees: async (
    page: number = 1,
    limit: number = 10,
    name: string = "",
    mobileNumber: string = ""
  ): Promise<EmployeeListResponse> => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    // Backend expects "search", not "name"
    if (name.trim()) {
      params.set("search", name.trim());
    }

    if (mobileNumber.trim()) {
      params.set("mobileNumber", mobileNumber.trim());
    }

    const response = await fetch(
      `${API_URL}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const result: BackendEmployeeResponse =
      await handleResponse(response);

    return {
      data: Array.isArray(result.data) ? result.data : [],
      totalEmployees:
        typeof result.total === "number"
          ? result.total
          : Array.isArray(result.data)
          ? result.data.length
          : 0,
      totalPages:
        typeof result.totalPages === "number"
          ? result.totalPages
          : 1,
      currentPage:
        typeof result.page === "number"
          ? result.page
          : page,
      limit:
        typeof result.limit === "number"
          ? result.limit
          : limit,
    };
  },

  // =====================================================
  // GET EMPLOYEE BY ID
  // =====================================================

  getEmployeeById: async (
    id: string
  ): Promise<Employee> => {
    if (!id) {
      throw new Error("Employee ID is required");
    }

    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const result = await handleResponse(response);

    if (!result?.data) {
      throw new Error("Employee data not found");
    }

    return result.data;
  },

  // =====================================================
  // CREATE EMPLOYEE
  // =====================================================

  createEmployee: async (
    employee: Omit<
      Employee,
      "_id" | "createdAt" | "updatedAt"
    >
  ): Promise<Employee> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(employee),
    });

    const result = await handleResponse(response);

    if (!result?.data) {
      throw new Error("Employee was not created");
    }

    return result.data;
  },

  // =====================================================
  // UPDATE EMPLOYEE
  // =====================================================

  updateEmployee: async (
    id: string,
    employee: Partial<Employee>
  ): Promise<Employee> => {
    if (!id) {
      throw new Error("Employee ID is required");
    }

    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(employee),
      }
    );

    const result = await handleResponse(response);

    if (!result?.data) {
      throw new Error("Employee was not updated");
    }

    return result.data;
  },

  // =====================================================
  // DELETE EMPLOYEE
  // =====================================================

  deleteEmployee: async (
    id: string
  ): Promise<void> => {
    if (!id) {
      throw new Error("Employee ID is required");
    }

    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }
    );

    await handleResponse(response);
  },
};

export default employeeService;