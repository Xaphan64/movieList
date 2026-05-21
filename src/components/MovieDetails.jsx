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
    <div className="w-full flex justify-center md:py-10">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="md:w-2/3 w-full flex flex-col">
          {notification && (
            <div
              className="fixed bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 md:w-1/3 w-full text-center md:py-1 py-1 z-20 md:rounded 
              md:dark:bg-dark-border/90 md:light:bg-light-border/90 dark:bg-dark-border light:bg-light-border md:text-xl"
            >
              {notification}
            </div>
          )}

          <p className="md:text-2xl dark:text-blue-400 light:text-blue-600 font-semibold text-lg">
            {movie.original_title === movie.title ? movie.title : `${movie.original_title} (${movie.title})`}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-1 md:text-xl dark:text-dark-sec-text light:text-light-sec-text">
              <p>{movie.release_date?.slice(0, 4)}</p> &middot;
              <p>
                {`${movie.runtime >= 60 ? Math.floor(movie.runtime / 60) + "h" : ""} ${movie.runtime % 60}m`}
              </p>
            </div>
            <div className="flex items-center">
              {movie.vote_average == 0 ? (
                <p className="items-center md:text-xl dark:text-dark-sec-text light:text-light-sec-text">
                  Rating not available
                </p>
              ) : (
                <>
                  <StarIcon className="dark:text-yellow-400 light:text-yellow-600" />
                  <p className="items-center md:text-xl dark:text-dark-sec-text light:text-light-sec-text">
                    {movie.vote_average?.toFixed(1)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center py-5">
            <div className={`relative h-auto ${movie.backdrop_path ? "w-11/12" : "w-1/2"}`}>
              <button
                className="z-10 absolute left-3 top-3 cursor-pointer rounded-full p-1 bg-black/50 flex items-center"
                onClick={() => toggleWatchlist(movie)}
              >
                {isInWatchlist(movie.id) ? (
                  <BookmarkIcon
                    className="text-blue-400 hover:text-blue-300"
                    sx={{ fontSize: { xs: 20, sm: 28, md: 40 } }}
                  />
                ) : (
                  <BookmarkBorderIcon
                    className="text-blue-400 hover:text-blue-300"
                    sx={{ fontSize: { xs: 20, sm: 28, md: 40 } }}
                  />
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
          <p className="md:text-xl md:py-1 text-sm px-1 dark:text-dark-text light:text-light-text">
            {movie.overview}
          </p>

          <div
            className="flex py-1 md:items-center md:justify-between md:flex-row md:text-xl justify-start flex-col gap-1 
          dark:text-dark-text light:text-light-text text-sm"
          >
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

          <div className="md:py-10">
            <h1 className="md:text-xl md:py-5 py-2">Similar movies</h1>

            <div className="flex w-full md:justify-between md:flex-row flex-col items-center gap-1">
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
