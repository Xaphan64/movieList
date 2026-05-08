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
        `https://api.themoviedb.org/3/movie/popular?api_key=${Access_key}&page=${page}`,
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
  const [page, setPage] = useState(1);

  // LIFE CYCLE
  useEffect(() => {
    fetchPopular();
    fetchGenre();
  });

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
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="flex gap-2">
        {/* de schimbat cand ca la inceput apare elemente, de facut sa apara si 1, 2, 3 dar grayed out ? 
        sau cand schimbi tabul sa te duca sus pe pagina (cand o sa fie mutate butoanele jos) */}
        {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}

        {page > 2 && <button onClick={() => setPage(page - 2)}>{page - 2}</button>}

        {page > 1 && <button onClick={() => setPage(page - 1)}>{page - 1}</button>}

        <span className="text-dark-error font-bold">{page}</span>

        <button onClick={() => setPage(page + 1)}>{page + 1}</button>

        <button onClick={() => setPage(page + 2)}>{page + 2}</button>

        <button onClick={() => setPage(page + 1)}>next</button>
      </div>

      <div>
        <div>Popular movies</div>

        <div className="flex flex-col gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} handleGenre={handleGenreNames} />
          ))}
        </div>
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
}
