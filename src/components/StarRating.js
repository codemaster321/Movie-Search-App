import { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  justifyContent: "center",
};

const starContainerStyle = {
  display: "flex",
  gap: "1px",
};

export default function StarRating({ setUserRating, defaultRating = 0 }) {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    setUserRating(rating);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: 10 }, (_, i) => (
          <Star
            onStar={() => handleRating(i + 1)}
            key={i}
            color="#a2cc16"
            full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>
      <p>{hoverRating || rating || 0}</p>
    </div>
  );
}
