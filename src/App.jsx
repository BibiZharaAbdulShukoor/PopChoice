import { useState } from "react";
import QuestionsView from "./components/QuestionsView";
import ResultView from "./components/ResultView";
import LoadingState from "./components/LoadingState";

import { createEmbedding } from "./utils/createEmbedding";
import { searchMovies } from "./utils/searchMovies";
import { generateExplanation } from "./utils/generateExplanation";

import "./App.css";

function App() {
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [mood, setMood] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // 🔥 prevent double clicks / duplicate API calls
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const preferences = `
Favorite: ${favoriteMovie}
Mood: ${mood}
Tone: ${tone}
      `;

      const embedding = await createEmbedding(preferences);

      if (!embedding) {
        throw new Error("Embedding failed");
      }

      const movie = await searchMovies(embedding);

      if (!movie) {
        throw new Error("No movie found in database");
      }

      const explanation = await generateExplanation(preferences, movie);

      if (!explanation) {
        throw new Error("AI explanation failed");
      }

      setResult({ movie, explanation });
    } catch (err) {
      console.log("ERROR:", err);

      setError(
        err?.message ||
          "Something went wrong (API limit or server error). Try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function goAgain() {
    setFavoriteMovie("");
    setMood("");
    setTone("");
    setResult(null);
    setError("");
  }

  return (
    <main className="app">
      <div className="bg one"></div>
      <div className="bg two"></div>

      <div className="container">
        <header>
          <h2>PopChoice</h2>
          <p>AI Movie Finder</p>
        </header>

        {loading && <LoadingState />}

        {!loading && !result && (
          <>
            <QuestionsView
              favoriteMovie={favoriteMovie}
              setFavoriteMovie={setFavoriteMovie}
              mood={mood}
              setMood={setMood}
              tone={tone}
              setTone={setTone}
              handleSubmit={handleSubmit}
              loading={loading}
            />
            {error && <p className="error">{error}</p>}
          </>
        )}

        {!loading && result && <ResultView result={result} goAgain={goAgain} />}
      </div>
    </main>
  );
}

export default App;
