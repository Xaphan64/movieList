// ASSETS

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function RecommendedCard({ movie }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div key={movie.id} className="w-full border" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        style={{ width: "40%", height: "auto" }}
      />
      <div>{movie.title}</div>
    </div>
  );
}
