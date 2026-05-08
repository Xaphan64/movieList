// ASSETS

// STYLES

// LIBRARIES
import axios from "axios";
import { useEffect, useState } from "react";

// MISC

// COMPONENTS
import { Access_key } from "../config/config";
import { useParams } from "react-router-dom";

// CONFIGURATION
export default function MovieDetails() {
  // PROPERTIES
  const { movie_id } = useParams();

  // API REQUESTS
  const fetchDetails = async () => {
    try {
      // fetch the API
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Access_key}`);

      console.log(response.data);
      setMovie(response.data);
    } catch (err) {
      console.log("Error fetching popular data:", err);
    }
  };

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [movie, setMovie] = useState([]);

  // LIFE CYCLE
  useEffect(() => {
    fetchDetails();
  });
  // EVENT HANDLERS
  return (
    <div>
      <div>{`${movie.original_title} (${movie.release_date?.slice(0, 4)})`}</div>

      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        style={{ width: "50%", height: "auto" }}
      />
      <div>{movie.homepage}</div>
    </div>
  );
}
