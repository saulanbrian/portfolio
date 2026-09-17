import { createClient } from "@supabase/supabase-js";
import type { Database } from "../db/database.types";

const url = process.env.NEXT_PUBLIC_PAPERLINE_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_PAPERLINE_SUPABASE_ANON_KEY!;

export const paperline = createClient<Database>(url, key);
