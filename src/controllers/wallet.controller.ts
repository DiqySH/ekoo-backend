import { NextFunction, Request, Response } from "express";
import { createDatabaseClient } from "../lib/database";
import { AppError, NotFoundError } from "../utils/AppError";
import { PostgresError } from "postgres";

export const getWalletById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return next(new AppError("Unauthorized", 401));
    }

    const database = createDatabaseClient(token);
    const { id } = req.params;

    const { data, error } = await database
      .from("wallets")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return next(new AppError(error.message, 400));
    }

    if (!data) {
      return next(new NotFoundError("Wallet Not Found"));
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return next(new AppError(error.message, 500));
    }

    return next(new AppError("Internal Server Error", 500));
  }
};
