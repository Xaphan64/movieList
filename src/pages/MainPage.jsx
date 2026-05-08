// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import MovieCard from "../components/MovieCard";
import { Access_key } from "../config/config";

// CONFIGURATION
export default function MainPage() {
  // PROPERTIES

  // API REQUESTS
  const fetchPopular = async () => {
    try {
      // fetch the API
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Access_key}&page=2`,
      );

      console.log(response.data);
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (err) {
      console.log("Error fetching popular data:", err);
    }
  };

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
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // LIFE CYCLE
  useEffect(() => {
    fetchPopular();
    fetchGenre();
  }, []);

  // EVENT HANDLERS
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  function handleGenreNames(ids) {
    return ids.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre?.name;
    });
  }

  return (
    <div>
      <div>
        <div>list with popular movies:</div>

        <div className="flex flex-col gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} handleGenre={handleGenreNames} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
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

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
