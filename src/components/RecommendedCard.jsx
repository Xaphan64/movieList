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
    <div
      key={movie.id}
      className="flex flex-col cursor-pointer md:w-60 w-50 items-center rounded-md hover:opacity-70 
      dark:bg-dark-accent light:bg-light-accent border-2 dark:border-light-border light:border-dark-border"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        className="w-full h-auto rounded-t border-b-2"
      />

      <p className="text-lg text-center dark:text-dark-text light:text-light-text py-1 flex items-center h-full p-2 ">
        {movie.title}
      </p>
    </div>
  );
}
