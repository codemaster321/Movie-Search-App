import { useState, useRef, useEffect } from "react";
import MovieDetail from "./components/MovieDetail";
import AddedList from "./components/AddedList";

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [movieDetail, setMovieDetail] = useState("");
  const [addMovies, setAddMovies] = useState([]);

  console.log(addMovies);

  const inputRef = useRef();

  function handleQuery(e) {
    setQuery(inputRef.current.value);
    console.log(query);
    setSelectedId("");
    setMovieDetail("");
  }

  function handleAddMovie(e) {
    console.log(movieDetail);
    setAddMovies((movies) => {
      console.log("movies", movies);
      if (movies.includes(movieDetail)) return movies;

      return [...movies, movieDetail];
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    async function movieSearch() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=d6bb10c1`,
          { signal: controller.signal }
        );
        const resp = await res.json();
        console.log(resp);
        if (resp.Response == "False") throw new Error(resp.error);

        setMovies(resp.Search);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
        console.log("error");
      } finally {
        setLoading(false);
      }
    }
    movieSearch();
    console.log(movies);

    return function () {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    async function movieDetail() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=d6bb10c1&i=${selectedId}`
        );
        const resp = await res.json();
        console.log(resp);
        if (resp.Response == "False") throw new Error(resp.error);

        setMovieDetail(resp);
        setError(null);
      } catch (err) {
        setError(err);
        console.log("error");
      } finally {
        setLoading(false);
      }
    }
    movieDetail();

    return function () {
      controller.abort();
    };
  }, [selectedId]);

  return (
    <div className="App">
      <div>
        <h1>Movie Searcher</h1>

        <input
          name="input"
          onChange={handleQuery}
          ref={inputRef}
          value={query}
        />

        {loading && <p>Loading...</p>}
        {query.length >= 3 && !loading && error && " Movie not found !!!!!!!!!"}
        <ul>
          {movies &&
            !error &&
            !loading &&
            movies.map((movie) => {
              return (
                <li
                  onClick={() => setSelectedId(movie.imdbID)}
                  key={movie.imdbID}
                >
                  {movie.Title}
                </li>
              );
            })}
        </ul>
      </div>
      <MovieDetail movieDetail={movieDetail} handleAddMovie={handleAddMovie} />
      <AddedList movies={addMovies} />
    </div>
  );
}

export default App;
