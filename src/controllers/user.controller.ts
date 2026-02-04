import { database } from "../lib/database";
import { Request, Response } from "express";

export const getProfile = async (req: Request, res: Response) => {
  const { uid } = req.params;

  if (!uid)
    return res.status(400).json({
      success: false,
      message: "UID is required",
    });

  const { data } = await database
    .from("profiles")
    .select("*")
    .eq("user_uid", uid);

  if (!data || data.length === 0)
    return res.status(404).json({
      success: false,
      message: "Profile doesn't exist",
    });

  res.status(200).json({
    success: true,
    data: data[0],
  });
};
