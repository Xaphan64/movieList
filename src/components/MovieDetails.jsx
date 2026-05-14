// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { useContext, useEffect, useState } from "react";

// MISC

// COMPONENTS
import { Access_key, AuthContext } from "../config/config";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import RecommendedCard from "./RecommendedCard";

// CONFIGURATION
export default function MovieDetails() {
  // PROPERTIES
  const { movie_id } = useParams();

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [movie, setMovie] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleWatchlist, isInWatchlist } = useContext(AuthContext);

  // LIFE CYCLE
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // show spinner
        setIsLoading(true);

        // spinner testing (to remove later)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // fetch movie details API
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Access_key}`);

        console.log(response.data);
        setMovie(response.data);
        // get errors
      } catch (err) {
        console.log("Error fetching popular data:", err);
      } finally {
        // remove spinner
        setIsLoading(false);
      }
    };

    const fetchRecommended = async () => {
      try {
        // show spinner
        setIsLoading(true);

        // spinner testing (to remove later)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // fetch recommended movies API
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${Access_key}`,
        );

        console.log(response.data);
        setRecommended(response.data.results.slice(0, 5));
        // get errors
      } catch (err) {
        console.log("Error fetching popular data:", err);
      } finally {
        // remove spinner
        setIsLoading(false);
      }
    };

    // run fuction only there is a movie id
    if (movie_id) {
      fetchDetails();
      fetchRecommended();
    }
    // avoid multiple re-renders
  }, [movie_id]);

  // EVENT HANDLERS
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div>{`${movie.original_title} (${movie.release_date?.slice(0, 4)})`}</div>

          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            style={{ width: "50%", height: "auto" }}
          />
          <div>{movie.homepage}</div>

          <button className="z-10 dark:hover:bg-dark-hover" onClick={() => toggleWatchlist(movie)}>
            {isInWatchlist(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
          </button>

          <div>
            <h1>Similar movies</h1>

            <div className="flex gap-2">
              {recommended.map((movie) => (
                <RecommendedCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
