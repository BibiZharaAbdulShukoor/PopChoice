import { openai } from "../lib/config";

export async function generateExplanation(preferences, movie) {
  const response = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct",
    messages: [
      {
        role: "system",
        content:
          "You are a friendly movie recommendation assistant. Keep answers under 70 words.",
      },
      {
        role: "user",
        content: `
User preferences:
${preferences}

Movie:
${movie.title}

Description:
${movie.content}

Explain why this movie matches the user.
        `,
      },
    ],
  });

  return response.choices[0].message.content;
}
