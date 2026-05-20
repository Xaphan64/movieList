// ASSETS
import StarIcon from "@mui/icons-material/Star";

// STYLES

// LIBRARIES
import { useNavigate } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function WatchlistCard({ movie, toggleWatchlist }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div
      className="border-2 flex flex-row relative md:w-2/3 dark:border-dark-active light:border-light-active rounded"
      key={movie.id}
    >
      <img
        src={`${
          movie.poster_path
            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
            : "https://batleydiy.co.uk/cdn/shop/files/No_image_available_svg_0c2f2ed3-d819-428f-98a3-33e835014783.png?v=1742825567"
        }`}
        className="md:w-40 md:h-auto w-20 h-30 cursor-pointer rounded hover:opacity-80 border dark:border-dark-active light:border-light-active"
        onClick={() => navigate(`/movie/${movie.id}`)}
        alt={movie.title}
      />

      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col md:gap-2 md:pl-3 gap-1 pl-1">
          <div
            className="cursor-pointer md:text-2xl text-sm font-semibold dark:text-blue-400 dark:hover:text-blue-300
            light:text-blue-600 light:hover:text-blue-800 line-clamp-1"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            {`${movie.title} (${new Date(movie.release_date).getFullYear()})`}
          </div>

          <p className="md:pr-5 md:text-base text-xs md:line-clamp-none line-clamp-2">{movie.overview}</p>

          <div className="flex items-center">
            {movie.vote_average == 0 ? (
              <p className="items-center md:text-xl text-xs dark:text-dark-sec-text light:text-light-sec-text">
                Rating not available
              </p>
            ) : (
              <>
                <StarIcon className="dark:text-yellow-400 light:text-yellow-600" />
                <p className="items-center md:text-xl text-xs dark:text-dark-sec-text light:text-light-sec-text">
                  {movie.vote_average.toFixed(1)}
                </p>
              </>
            )}
          </div>
        </div>
        <button
          className="cursor-pointer p-2 dark:bg-dark-accent light:bg-light-accent dark:hover:bg-dark-hover 
          light:hover:bg-light-hover text-xs"
          onClick={() => toggleWatchlist(movie)}
        >
          Remove movie from Watchlist
        </button>
      </div>
    </div>
  );
}
