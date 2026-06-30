import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import movies from "./src/data/content.js";
import "dotenv/config";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
);

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.VITE_OPENROUTER_API_KEY,
});

async function seedMovies() {
  for (const movie of movies) {
    console.log("Processing:", movie.title);

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: movie.content,
    });

    const vector = embedding.data[0].embedding;

    const { error } = await supabase.from("movies").insert([
      {
        title: movie.title,
        release_year: movie.releaseYear,
        content: movie.content,
        embedding: vector,
      },
    ]);

    if (error) {
      console.log("ERROR:", error.message);
    } else {
      console.log("Saved:", movie.title);
    }
  }
}

seedMovies();
