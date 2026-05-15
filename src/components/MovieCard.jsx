// ASSETS
import StarIcon from "@mui/icons-material/Star";

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC
import { useContext } from "react";
import { AuthContext } from "../config/config";

// COMPONENTS

// CONFIGURATION
export default function MovieCard({ movie }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { toggleWatchlist, isInWatchlist } = useContext(AuthContext);
  const navigate = useNavigate();
  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS

  return (
    <div className="border flex flex-col">
      <div key={movie.id} className="flex flex-row gap-1" onClick={() => navigate(`/movie/${movie.id}`)}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          style={{ width: "10%", height: "10%" }}
          alt={movie.title}
        />
        <div>
          <p>{movie.title}</p>
          <p>Year: {movie.release_date.slice(0, 4)}</p>
          <div className="flex">
            Rating: <StarIcon />
            <p>{movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>
      <button className="z-10 dark:hover:bg-dark-hover" onClick={() => toggleWatchlist(movie)}>
        {isInWatchlist(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
      </button>
    </div>
  );
}
