import axios from "axios";

import type { Employee } from "../types/employee";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================================
   GET ALL EMPLOYEES
========================================================= */

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get("/employees");

  return response.data.data;
};

/* =========================================================
   CREATE EMPLOYEE
========================================================= */

export const createEmployee = async (
  employeeData: Omit<
    Employee,
    "_id" | "createdAt" | "updatedAt"
  >
): Promise<Employee> => {
  const response = await api.post(
    "/employees",
    employeeData
  );

  return response.data.data;
};

/* =========================================================
   UPDATE EMPLOYEE
========================================================= */

export const updateEmployee = async (
  id: string,
  employeeData: Omit<
    Employee,
    "_id" | "createdAt" | "updatedAt"
  >
): Promise<Employee> => {
  const response = await api.patch(
    `/employees/${id}`,
    employeeData
  );

  return response.data.data;
};

/* =========================================================
   DELETE EMPLOYEE
========================================================= */

export const deleteEmployee = async (
  id: string
): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

export default api;