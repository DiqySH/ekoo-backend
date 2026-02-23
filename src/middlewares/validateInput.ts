import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/AppError";

interface ValidationRule {
  field: string;
  type: "string" | "number" | "array" | "object";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

type ValidationRules = ValidationRule[];

export const validate = (rules: ValidationRules) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const errors: string[] = [];

    for (const rule of rules) {
      const value = req.params[rule.field] || req.body[rule.field];

      if (
        rule.required &&
        (value === undefined || value === null || value === "")
      ) {
        errors.push(`${rule.field} is required`);
        continue;
      }

      if (value === undefined || value === null || value === "") {
        continue;
      }

      if (rule.type === "string" && typeof value !== "string") {
        errors.push(`${rule.field} must be a string`);
        continue;
      }

      if (rule.type === "array" && !Array.isArray(value)) {
        errors.push(`${rule.field} must be an array`);
        continue;
      }

      if (
        rule.type === "object" &&
        (typeof value !== "object" || Array.isArray(value))
      ) {
        errors.push(`${rule.field} must be an object`);
        continue;
      }

      if (rule.type === "string" && typeof value === "string") {
        if (rule.minLength && value.length < rule.minLength) {
          errors.push(
            `${rule.field} must be at least ${rule.minLength} characters`,
          );
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(
            `${rule.field} must not exceed ${rule.maxLength} characters`,
          );
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errors.push(`${rule.field} has invalid format`);
        }
      }
    }

    if (errors.length > 0) {
      return next(new ValidationError(errors.join(", ")));
    }

    next();
  };
};

export const commonValidators = {
  uid: {
    field: "uid",
    type: "string" as const,
    required: true,
    minLength: 1,
  },
  messages: {
    field: "messages",
    type: "array" as const,
    required: true,
  },
};
