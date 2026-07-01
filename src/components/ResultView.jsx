function ResultView({ result, goAgain }) {
  if (!result || !result.movie) {
    return (
      <section className="card result">
        <p>Loading result...</p>
        <button onClick={goAgain}>Try Again</button>
      </section>
    );
  }

  return (
    <section className="card result">
      <p className="badge">YOUR RESULT</p>

      <h1>{result.movie.title}</h1>
      <span className="year">{result.movie.release_year}</span>

      <div className="box">
        <h3>About</h3>
        <p>{result.movie.content}</p>
      </div>

      <div className="box highlight">
        <h3>Why this fits you</h3>
        <p>{result.explanation}</p>
      </div>

      <button onClick={goAgain}>Try Again</button>
    </section>
  );
}

export default ResultView;
