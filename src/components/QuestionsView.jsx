function QuestionsView({
  favoriteMovie,
  setFavoriteMovie,
  mood,
  setMood,
  tone,
  setTone,
  handleSubmit,
  loading,
}) {
  return (
    <section className="card">
      <p className="badge">AI MOVIE ENGINE</p>
      <h1>Discover Your Next Movie</h1>
      <p className="subtitle">
        Tell us your taste and we’ll find your perfect match.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Favorite movie & why?</label>
        <textarea
          value={favoriteMovie}
          onChange={(e) => setFavoriteMovie(e.target.value)}
          placeholder="I love Inception because..."
          required
        />

        <label>Mood</label>
        <select value={mood} onChange={(e) => setMood(e.target.value)} required>
          <option value="">Select</option>
          <option value="new">New</option>
          <option value="classic">Classic</option>
        </select>

        <label>Tone</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)} required>
          <option value="">Select</option>
          <option value="fun">Fun</option>
          <option value="serious">Serious</option>
        </select>

        <button disabled={loading}>
          {loading ? "Searching..." : "Get Recommendation"}
        </button>
      </form>
    </section>
  );
}

export default QuestionsView;
