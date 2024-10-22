import { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: 10 }, (_, i) => (
          <Star
            onStar={() => setRating(i + 1)}
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
