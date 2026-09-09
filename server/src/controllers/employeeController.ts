import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

/**
 * Create Employee
 * POST /api/employees
 */
export const createEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employee = await createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get All Employees
 * GET /api/employees
 *
 * Supports:
 * ?search=Bhargavi
 * ?skill=React
 * ?country=India
 * ?city=Hyderabad
 * ?sortBy=firstName
 * ?order=asc
 * ?page=1
 * ?limit=10
 */
export const getEmployeesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
   const {
  search,
  mobileNumber,
  skill,
  country,
  city,
  sortBy,
  order,
  page,
  limit,
} = req.query;

    const result = await getEmployees({
      search: typeof search === "string" ? search : undefined,
mobileNumber:
  typeof mobileNumber === "string"
    ? mobileNumber
    : undefined,
      skill: typeof skill === "string" ? skill : undefined,
      country: typeof country === "string" ? country : undefined,
      city: typeof city === "string" ? city : undefined,
      sortBy: typeof sortBy === "string" ? sortBy : undefined,
      order: typeof order === "string" ? order : undefined,
      page: typeof page === "string" ? Number(page) : undefined,
      limit: typeof limit === "string" ? Number(limit) : undefined,
    });

    res.status(200).json({
      success: true,
      count: result.employees.length,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      data: result.employees,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get Employee By ID
 * GET /api/employees/:id
 */
export const getEmployeeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employeeId = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
      return;
    }

    const employee = await getEmployeeById(employeeId);

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Update Employee
 * PATCH /api/employees/:id
 */
export const updateEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employeeId = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
      return;
    }

    const employee = await updateEmployee(
      employeeId,
      req.body
    );

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Delete Employee
 * DELETE /api/employees/:id
 */
export const deleteEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employeeId = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      res.status(400).json({
        success: false,
        message: "Invalid employee ID",
      });
      return;
    }

    const employee = await deleteEmployee(employeeId);

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error: unknown) {
    next(error);
  }
};