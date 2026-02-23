import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

interface ErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  stack?: string | undefined;
}

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  const timestamp = new Date().toISOString();

  const errorResponse: ErrorResponse = {
    success: false,
    message,
    statusCode,
    timestamp,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  console.error(`[ERROR] ${timestamp} - ${statusCode}: ${message}`);

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = new AppError(`Route not found`, 404);
  next(error);
};
