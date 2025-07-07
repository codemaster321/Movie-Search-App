import { useState, useRef, useEffect } from "react";
import MovieDetail from "./components/MovieDetail";
import AddedList from "./components/AddedList";
import StarRating from "./components/StarRating";

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [movieDetail, setMovieDetail] = useState("");
  const [addMovies, setAddMovies] = useState([]);
  const navEl = useRef(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);

  console.log(userRating);

  const navTriggerHandler = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    if (navEl.current) {
      console.log("yes");
      if (isNavOpen) {
        navEl.current.classList.add("nav-open");
      } else {
        navEl.current.classList.remove("nav-open");
      }
    }
  }, [isNavOpen]);

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
      setSelectedId("");
      setQuery("");

      window.scrollTo({ top: 0, behavior: "smooth" });
      return [...movies, { ...movieDetail, userRating: userRating }];
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
      <button onClick={navTriggerHandler} className="btn-mobile-nav">
        Added Movies
      </button>

      <div className="container ">
        <div className="movie-searchbar">
          <h1>Movie Searcher</h1>
          <p class="tagline">Find and rate your favorite movies</p>

          <input
            name="input"
            onChange={handleQuery}
            ref={inputRef}
            value={query}
          />

          {loading && <p>Loading...</p>}
          {query.length >= 3 &&
            !loading &&
            error &&
            " Movie not found !!!!!!!!!"}
        </div>

        <div className="search-movies">
          {!query && (
            <div className="pre-recommend">
              <h2>Top Picks for You 🍿</h2>
              <ul>
                <li>Inception</li>
                <li>Interstellar</li>
                <li>The Dark Knight</li>
              </ul>
            </div>
          )}
          <ul className="search-list">
            {movies &&
              !error &&
              !loading &&
              movies.map((movie) => {
                return (
                  <li
                    onClick={() => setSelectedId(movie.imdbID)}
                    key={movie.imdbID}
                    className="list-item"
                  >
                    {movie.Title}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="movie-list">
        {selectedId && (
          <>
            <MovieDetail
              movieDetail={movieDetail}
              handleAddMovie={handleAddMovie}
              setUserRating={setUserRating}
              userRating={userRating}
            />

            {/* {userRating > 0 && (
            <button className='addButton' onClick={handleAddMovie}>Add to List</button>
          )} */}
          </>
        )}
      </div>

      <div className="main-nav" ref={navEl}>
        <AddedList movies={addMovies} setMovies={setAddMovies} />
      </div>
    </div>
  );
}

export default App;
