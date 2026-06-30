import { openai } from "../lib/config";

export async function createEmbedding(text) {
  try {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return res.data[0].embedding;
  } catch (err) {
    console.log("Embedding Error:", err);
    throw err;
  }
}
