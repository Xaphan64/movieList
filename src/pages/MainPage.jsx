// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// MISC

// COMPONENTS
import MovieCard from "../components/MovieCard";
import { Access_key, AuthContext } from "../config/config";
import PageNumber from "../components/PageNumber";
import Spinner from "../components/Spinner";

// CONFIGURATION
export default function MainPage() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const { search } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("popular");

  // LIFE CYCLE

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // show spinner
        setIsLoading(true);

        // define empty url
        let url = "";

        // spinner testing (to remove later)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // fetch the API by page or search
        if (search.trim()) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${Access_key}&query=${search}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/${category}?api_key=${Access_key}&page=${page}`;
        }

        // get the proper url
        const response = await axios.get(url);

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

    // debouncer on search to reduce api calls
    if (search.trim()) {
      const timer = setTimeout(() => {
        fetchMovies();
      }, 400);

      return () => clearTimeout(timer);
    }

    // no debouncer when not searching for a movie
    fetchMovies();
    // avoid multiple re-renders
  }, [page, search, category]);

  // EVENT HANDLERS
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className={`flex gap-3 p-2 w-full items-center justify-center ${search.trim() && "invisible"}`}>
            <button
              className={`border rounded-md px-10 dark:border-light-border light:border-dark-border 
                ${category === "popular" && "dark:bg-dark-accent light:bg-light-accent"} `}
              onClick={() => setCategory("popular")}
            >
              Popular
            </button>
            <button
              className={`border rounded-md px-10 dark:border-light-border light:border-dark-border 
                ${category === "now_playing" && "dark:bg-dark-accent light:bg-light-accent"} `}
              onClick={() => setCategory("now_playing")}
            >
              Now playing
            </button>
            <button
              className={`border rounded-md px-10 dark:border-light-border light:border-dark-border 
                ${category === "top_rated" && "dark:bg-dark-accent light:bg-light-accent"} `}
              onClick={() => setCategory("top_rated")}
            >
              Top Rated
            </button>
            <button
              className={`border rounded-md px-10 dark:border-light-border light:border-dark-border 
                ${category === "upcoming" && "dark:bg-dark-accent light:bg-light-accent"} `}
              onClick={() => setCategory("upcoming")}
            >
              Upcomming
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {!search && <PageNumber page={page} setPage={setPage} />}
        </div>
      )}
    </div>
  );
}
