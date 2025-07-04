export default function AddedList({ movies, setMovies }) {
  function deleteMovie(imdbID) {
    setMovies((movies) => movies.filter((movie) => movie.imdbID !== imdbID));
  }
  return (
    <div className="movies">
      {movies.length === 0 && (
        <h1 style={{ textAlign: "center" }}>No Movied added yet!!</h1>
      )}
      {movies.length > 0 && <h1>Added movies</h1>}

      <ul>
        {movies.map((movie, index) => (
          <li className="movie" key={movie.id}>
            <img width={100} height={100} src={`${movie.Poster}`} />
            {movie.title}
            <br />
            <p> imdb rating: {movie.imdbRating}</p>
            <p> your rating : {movie.userRating ?? "n/a"} </p>
            <button
              onClick={() => deleteMovie(movie.imdbID)}
              style={{ backgroundColor: "red" }}
            >
              Delete
            </button>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
