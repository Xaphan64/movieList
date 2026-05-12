// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// MISC

// COMPONENTS
import MovieCard from "../components/MovieCard";
import { Access_key } from "../config/config";
import PageNumber from "../components/PageNumber";
import Spinner from "../components/Spinner";

// CONFIGURATION
export default function MainPage() {
  // PROPERTIES

  // API REQUESTS
  const fetchGenre = async () => {
    try {
      // fetch the API
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${Access_key}`);

      setGenres(response.data.genres);
    } catch (err) {
      console.log("Error fetching genre data:", err);
    }
  };
  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // LIFE CYCLE
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        // show spinner
        setIsLoading(true);

        // spinner testing (to remove later)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // fetch the API
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${Access_key}&page=${page}`,
        );

        console.log(response.data);
        setMovies(response.data.results);
        // get errors
      } catch (err) {
        console.log("Error fetching popular data:", err);
      } finally {
        // remove spinner
        setIsLoading(false);
      }
    };

    fetchPopular();
    fetchGenre();
    // avoid multiple re-renders
  }, [page]);

  // EVENT HANDLERS

  function handleGenreNames(ids) {
    return ids.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre?.name;
    });
  }

  return (
    <div>
      <div className="flex gap-2">
        <Link
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
        underline transition-colors"
          to="/register"
        >
          Register
        </Link>

        <Link
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
        underline transition-colors"
          to="/login"
        >
          Sign in
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div>Popular movies</div>

          <div className="flex flex-col gap-2">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} handleGenre={handleGenreNames} />
            ))}
          </div>

          <PageNumber page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
}
