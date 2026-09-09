import { Router } from "express";

import {
  createEmployeeController,
  getEmployeesController,
  getEmployeeByIdController,
  updateEmployeeController,
  deleteEmployeeController,
} from "../controllers/employeeController";

const router = Router();

// Temporary route-registration test
router.get("/test", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee routes are working",
  });
});

router.post("/", createEmployeeController);

router.get("/", getEmployeesController);

router.get("/:id", getEmployeeByIdController);

router.patch("/:id", updateEmployeeController);

router.delete("/:id", deleteEmployeeController);

export default router;