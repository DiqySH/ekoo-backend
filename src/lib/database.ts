import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw Error("Supabase URL and Supabase Key is required!");
}

export const createDatabaseClient = (token?: string) => {
  return createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    token
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      : {},
  );
};
