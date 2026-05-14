// ASSETS

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC
import { useContext } from "react";
import { AuthContext } from "../config/config";

// COMPONENTS

// CONFIGURATION
export default function MovieCard({ movie, handleGenre }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { toggleWatchlist, isInWatchlist } = useContext(AuthContext);
  const navigate = useNavigate();
  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS

  return (
    <div>
      <div key={movie.id} className="flex flex-row gap-1 border" onClick={() => navigate(`/movie/${movie.id}`)}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          style={{ width: "10%", height: "10%" }}
          alt={movie.title}
        />

        <div>Name: {movie.title}</div>
        <div>Genre: {handleGenre(movie.genre_ids).join(" | ")}</div>

        <div>ID: {movie.id}</div>
      </div>
      <button className="z-10 dark:hover:bg-dark-hover" onClick={() => toggleWatchlist(movie)}>
        {isInWatchlist(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
      </button>
    </div>
  );
}
