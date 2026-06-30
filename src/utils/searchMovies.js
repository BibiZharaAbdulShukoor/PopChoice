import { supabase } from "../lib/config";

export async function searchMovies(embedding) {
  const { data, error } = await supabase.rpc("match_movies", {
    query_embedding: embedding,
    match_count: 1,
  });

  if (error) throw new Error(error.message);

  return data?.[0];
}
