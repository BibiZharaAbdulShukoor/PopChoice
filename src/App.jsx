import { useState } from "react";
import QuestionsView from "./components/QuestionsView";
import ResultView from "./components/ResultView";
import LoadingState from "./components/LoadingState";

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

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const preferences = {
        favoriteMovie,
        mood,
        tone,
      };

      const response = await fetch(
        "https://popchoice-worker.pollyglot-zahra.workers.dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferences),
        },
      );

      if (!response.ok) {
        throw new Error("Worker request failed");
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.log("ERROR:", err);
      setError(err.message || "Something went wrong. Try again.");
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
