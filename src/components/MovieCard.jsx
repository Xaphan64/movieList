// ASSETS
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

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
    <div
      className="border-2 flex flex-col relative w-2/3 dark:hover:bg-dark-accent light:hover:bg-light-accent
    dark:border-dark-active light:border-light-active rounded"
    >
      <div key={movie.id} className="flex flex-row gap-5">
        <img
          // src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          src={`${
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : "https://batleydiy.co.uk/cdn/shop/files/No_image_available_svg_0c2f2ed3-d819-428f-98a3-33e835014783.png?v=1742825567"
          }`}
          className="w-40 h-auto cursor-pointer rounded hover:opacity-80 border dark:border-dark-active light:border-light-active"
          onClick={() => navigate(`/movie/${movie.id}`)}
          alt={movie.title}
        />
        <div className="flex flex-col gap-1">
          <p
            className="cursor-pointer text-2xl dark:text-blue-400 dark:hover:text-blue-300 light:text-blue-600 light:hover:text-blue-800"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            {movie.title}
          </p>

          <p className="text-xl dark:text-dark-text light:text-light-text">
            {handleGenre(movie.genre_ids).join(" | ")}
          </p>

          <p className="text-xl dark:text-dark-text light:text-light-text">
            {new Date(movie.release_date) < new Date()
              ? `Released in ${new Date(movie.release_date).getFullYear()}`
              : `Will be released on ${movie.release_date}`}
          </p>

          <div className="flex items-center">
            {movie.vote_average == 0 ? (
              <p className="items-center text-xl dark:text-dark-sec-text light:text-light-sec-text">
                Rating not available
              </p>
            ) : (
              <>
                <StarIcon className="dark:text-yellow-400 light:text-yellow-600" />
                <p className="items-center text-xl dark:text-dark-sec-text light:text-light-sec-text">
                  {movie.vote_average.toFixed(1)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <button className="z-10 absolute right-2 top-2 cursor-pointer" onClick={() => toggleWatchlist(movie)}>
        {isInWatchlist(movie.id) ? (
          <BookmarkIcon
            className="dark:text-blue-400 dark:hover:text-blue-300 light:text-blue-600 light:hover:text-blue-800"
            fontSize="large"
          />
        ) : (
          <BookmarkBorderIcon
            className="dark:text-blue-400 dark:hover:text-blue-300 light:text-blue-600 light:hover:text-blue-800"
            fontSize="large"
          />
        )}
      </button>
    </div>
  );
}
