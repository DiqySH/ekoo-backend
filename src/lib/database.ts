import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw Error("Supabase URL and Supabase Key is required!");
}

const database = createClient(SUPABASE_URL, SUPABASE_KEY);

export { database };
