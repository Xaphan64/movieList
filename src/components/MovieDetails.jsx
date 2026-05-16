// ASSETS
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

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
  const { toggleWatchlist, isInWatchlist, notification } = useContext(AuthContext);

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
        setRecommended(response.data.results?.slice(0, 5));
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
    <div className="w-full flex justify-center py-10">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-2/3 flex flex-col">
          {notification && <div className="fixed top-5 right-5 rounded font-semibold">{notification}</div>}

          <p className="text-2xl dark:text-blue-400  light:text-blue-600 ">
            {movie.original_title === movie.title ? movie.title : `${movie.original_title} (${movie.title})`}
          </p>

          <div className="flex justify-between">
            <div className="flex flex-row gap-1 text-xl dark:text-dark-sec-text light:text-light-sec-text">
              <p>{movie.release_date?.slice(0, 4)}</p> &middot;
              <p>
                {`${movie.runtime >= 60 ? Math.floor(movie.runtime / 60) + "h" : ""} ${movie.runtime % 60}m`}
              </p>
            </div>
            <div className="flex items-center">
              {movie.vote_average == 0 ? (
                <p className="items-center text-xl dark:text-dark-sec-text light:text-light-sec-text">
                  Rating not available
                </p>
              ) : (
                <>
                  <StarIcon className="dark:text-yellow-400 light:text-yellow-600" />
                  <p className="items-center text-xl dark:text-dark-sec-text light:text-light-sec-text">
                    {movie.vote_average?.toFixed(1)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center py-5">
            <div className={`relative  h-auto ${movie.backdrop_path ? "w-11/12" : "w-1/2"}`}>
              <button
                className="z-10 absolute left-3 top-3 cursor-pointer rounded-full p-1 bg-black/50"
                onClick={() => toggleWatchlist(movie)}
              >
                {isInWatchlist(movie.id) ? (
                  <BookmarkIcon className="text-blue-400 hover:text-blue-300" fontSize="large" />
                ) : (
                  <BookmarkBorderIcon className="text-blue-400 hover:text-blue-300" fontSize="large" />
                )}
              </button>

              <img
                src={`${
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : "https://batleydiy.co.uk/cdn/shop/files/No_image_available_svg_0c2f2ed3-d819-428f-98a3-33e835014783.png?v=1742825567"
                }`}
                className={`rounded-3xl ${movie.homepage && "cursor-pointer"}`}
                onClick={() => movie.homepage && window.open(movie.homepage, "_blank")}
              />
            </div>
          </div>
          <p className="text-xl py-1 dark:text-dark-text light:text-light-text">{movie.overview}</p>

          <div className="flex py-1 items-center justify-between flex-row text-xl dark:text-dark-text light:text-light-text">
            {new Date(movie.release_date) < new Date()
              ? `Original release: ${movie.release_date?.split("-").reverse().join("-")}`
              : `Release date: ${movie.release_date?.split("-").reverse().join("-")}`}

            <div className="flex gap-1">
              {/* <p>{movie.genres?.length > 1 ? "Genres" : "Genre"}:</p> */}
              {movie.genres?.map((genre) => (
                <p key={genre.id} className="border px-3 rounded-md dark:bg-dark-accent light:bg-light-accent">
                  {genre.name}
                </p>
              ))}
            </div>
          </div>

          <div className="py-10">
            <h1 className="text-xl py-5">Similar movies</h1>

            <div className="flex w-full justify-between">
              {recommended.map((movie) => (
                <RecommendedCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
