import { createDatabaseClient } from "../lib/database";
import { Request, Response, NextFunction } from "express";
import { ValidationError, NotFoundError, AppError } from "../utils/AppError";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return next(new AppError("Token Required", 500));
    const database = createDatabaseClient(token);
    const { uid } = req.params;

    if (!uid) {
      return next(new ValidationError("UID is required"));
    }

    if (typeof uid !== "string" || uid.trim().length === 0) {
      return next(new ValidationError("Invalid UID format"));
    }

    const { data, error } = await database
      .from("profiles")
      .select("*")
      .eq("user_uid", uid)
      .single();

    if (error || !data) {
      return next(new NotFoundError("Profile doesn't exist"));
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("[User Controller Error]:", error?.message || error);
    next(error);
  }
};
