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
  const { search, notification } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
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
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // fetch the API by page or search
        if (search.trim()) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${Access_key}&query=${search}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/${category}?api_key=${Access_key}&page=${page}`;
        }

        // get the proper url
        const response = await axios.get(url);

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
        fetchGenre();
      }, 400);

      return () => clearTimeout(timer);
    }

    // no debouncer when not searching for a movie
    fetchMovies();
    fetchGenre();
    // avoid multiple re-renders
  }, [page, search, category]);

  // EVENT HANDLERS
  function handleGenreNames(ids) {
    // map the ids
    return ids.map((id) => {
      // find the genre id
      const genre = genres.find((g) => g.id === id);
      // return the name
      return genre?.name;
    });
  }

  function handleSwitchFilter(categ) {
    // change category page
    if (category !== categ) {
      setCategory(categ);
      // reset page on category change
      setPage(1);
    }
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {notification && (
            // <div className="fixed bottom-0 left-0 w-full text-center md:py-2 py-1 z-20 border-t dark:bg-dark-border light:bg-light-border md:text-xl">
            <div
              className="fixed bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 md:w-1/2 w-full text-center md:py-1 py-1 z-20 md:rounded 
              md:dark:bg-dark-border/90 md:light:bg-light-border/90 dark:bg-dark-border light:bg-light-border md:text-xl"
            >
              {notification}
            </div>
          )}
          <div
            className={`flex md:gap-3 p-2 w-full md:flex-row items-center md:justify-center gap-2 flex-col ${search.trim() && "md:invisible hidden"}`}
          >
            <div className="flex gap-3">
              <button
                className={`border rounded-md md:w-50 w-30 cursor-pointer dark:border-light-border light:border-dark-border 
                ${category === "popular" && "dark:bg-dark-accent light:bg-light-accent"} `}
                onClick={() => handleSwitchFilter("popular")}
              >
                Popular
              </button>
              <button
                className={`border rounded-md md:w-50 w-30 cursor-pointer dark:border-light-border light:border-dark-border 
                ${category === "now_playing" && "dark:bg-dark-accent light:bg-light-accent"} `}
                onClick={() => handleSwitchFilter("now_playing")}
              >
                Now playing
              </button>
            </div>

            <div className="flex gap-3">
              <button
                className={`border rounded-md md:w-50 w-30 cursor-pointer dark:border-light-border light:border-dark-border 
                ${category === "top_rated" && "dark:bg-dark-accent light:bg-light-accent"} `}
                onClick={() => handleSwitchFilter("top_rated")}
              >
                Top Rated
              </button>
              <button
                className={`border rounded-md md:w-50 w-30 cursor-pointer dark:border-light-border light:border-dark-border 
                ${category === "upcoming" && "dark:bg-dark-accent light:bg-light-accent"} `}
                onClick={() => handleSwitchFilter("upcoming")}
              >
                Upcomming
              </button>
            </div>
          </div>

          {search.trim() && movies.length === 0 ? (
            <div className="flex w-full justify-center text-lg font-semibold">
              The movie that you are searching for does not exists
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full md:items-center">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} handleGenre={handleGenreNames} />
              ))}
            </div>
          )}

          {!search && <PageNumber page={page} setPage={setPage} />}
        </div>
      )}
    </>
  );
}
