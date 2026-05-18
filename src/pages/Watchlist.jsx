// ASSETS

// STYLES

// LIBRARIES
import { useContext } from "react";

// MISC
import { AuthContext } from "../config/config";
import RecommendedCard from "../components/RecommendedCard";
import WatchlistCard from "../components/WatchlistCard";

// COMPONENTS

// CONFIGURATION
export default function Watchlist() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const { watchlist, toggleWatchlist } = useContext(AuthContext);

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <>
      {watchlist.length === 0 ? (
        <div
          className="w-full flex items-center justify-center p-5 text-xl font-semibold dark:text-dark-text
        light:text-light-text"
        >
          There are no movies in your watchlist
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full items-center pt-5">
          {watchlist.map((movie) => (
            <WatchlistCard key={movie.id} movie={movie} toggleWatchlist={toggleWatchlist} />
          ))}
        </div>
      )}
    </>
  );
}
