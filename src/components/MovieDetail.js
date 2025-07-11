import StarRating from "./StarRating";
export default function MovieDetail({ movieDetail, setUserRating,handleAddMovie,userRating }) {
  console.log(movieDetail);
  return (
    movieDetail && (
      <div
        style={{
          margin: "auto",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "auto",
          alignItems: "center",
        }}
        className="movie-detail"
      >
        <img
          style={{ margin: "auto" }}
          src={movieDetail.Poster}
          alt={movieDetail.Title}
        />
        <h1>{movieDetail.Title}</h1>
        <p>{movieDetail.Plot}</p>
        <StarRating setUserRating={setUserRating} />
         {userRating > 0 && (
        <button onClick={handleAddMovie}>Add to List</button>
      )}
      </div>
    )
  );
}
