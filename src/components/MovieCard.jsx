// ASSETS

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function MovieCard({ movie, handleGenre }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div key={movie.id} className="flex flex-row gap-1" onClick={() => navigate(`movie/${movie.id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        style={{ width: "10%", height: "10%" }}
        alt={movie.title}
      />

      <div>Name: {movie.title}</div>
      <div>Genre: {handleGenre(movie.genre_ids).join(" | ")}</div>

      <div>ID: {movie.id}</div>
    </div>
  );
}
