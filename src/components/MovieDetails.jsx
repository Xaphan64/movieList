// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { useEffect, useState } from "react";

// MISC

// COMPONENTS
import { Access_key } from "../config/config";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

// CONFIGURATION
export default function MovieDetails() {
  // PROPERTIES
  const { movie_id } = useParams();

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [movie, setMovie] = useState([]);
  const [recommended, setRecommended] = useState([]);

  // LIFE CYCLE
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // fetch movie details API
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Access_key}`);

        console.log(response.data);
        setMovie(response.data);
        // get errors
      } catch (err) {
        console.log("Error fetching popular data:", err);
      }
    };

    const fetchRecommended = async () => {
      try {
        // fetch recommended movies API
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${Access_key}`,
        );

        console.log(response.data);
        setRecommended(response.data.results.slice(0, 5));
        // get errors
      } catch (err) {
        console.log("Error fetching popular data:", err);
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
      <div>{`${movie.original_title} (${movie.release_date?.slice(0, 4)})`}</div>

      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        style={{ width: "50%", height: "auto" }}
      />
      <div>{movie.homepage}</div>

      <div>
        <h1>Similar movies</h1>

        <div className="flex gap-2">
          {recommended.map((movie) => (
            <div className="w-full border" onClick={() => navigate(`/movie/${movie.id}`)}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                style={{ width: "40%", height: "auto" }}
              />
              <div>{movie.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
