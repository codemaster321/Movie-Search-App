export default function AddedList({ movies }) {
  console.log(movies);
  return (
    <>
      {movies.length > 0 && <h1>Added movies</h1>}
      {movies.map((movie, index) => (
        <li key={movie.id}>
          <img src={`${movie.Poster}`} />
          {movie.title}
        </li>
      ))}
    </>
  );
}
