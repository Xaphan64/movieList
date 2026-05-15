// ASSETS

// STYLES

// LIBRARIES
import { useContext } from "react";

// MISC
import { AuthContext } from "../config/config";

// COMPONENTS

// CONFIGURATION
export default function Watchlist() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const { watchlist, toggleWatchlist } = useContext(AuthContext);
  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div>
      {watchlist.map((movie) => (
        <div key={movie.id}>
          <div>{movie.title} </div>
          <button onClick={() => toggleWatchlist(movie)}>remove from watchlist</button>
        </div>
      ))}
    </div>
  );
}
