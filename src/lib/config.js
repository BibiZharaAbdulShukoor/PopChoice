import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error("Missing VITE_OPENROUTER_API_KEY in .env");
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables in .env");
}

console.log(
  "OpenRouter Key Loaded:",
  OPENROUTER_API_KEY.substring(0, 12) + "...",
);

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
