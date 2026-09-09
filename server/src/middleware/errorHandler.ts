import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Error:", error);

  // Mongoose validation error
  if (error instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(error.errors).map(
      (validationError) => validationError.message
    );

    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: messages,
    });

    return;
  }

  // Duplicate MongoDB field
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  ) {
    res.status(409).json({
      success: false,
      message: "An employee with this email already exists",
    });

    return;
  }

  // Mongoose cast error
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: "Invalid data format",
    });

    return;
  }

  // Unknown/unexpected error
  const message =
    error instanceof Error
      ? error.message
      : "Internal server error";

  res.status(500).json({
    success: false,
    message,
  });
};

export default errorHandler;