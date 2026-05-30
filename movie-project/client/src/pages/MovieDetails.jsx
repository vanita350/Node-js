import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieDetails() {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");

  // Fetch Movie Details
  const fetchMovieDetails = async () => {

    try {

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );

      setMovie(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Fetch Trailer
  const fetchTrailer = async () => {

    try {

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );

      const trailerData = response.data.results.find(
        (video) => video.type === "Trailer"
      );

      if (trailerData) {

        setTrailer(trailerData.key);

      }

    } catch (error) {

      console.log(error);

    }

  };

  // Add To Favorites
  const addToFavorites = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      // Check user login
      if (!user) {

        alert("Please Login First");
        return;

      }

      await axios.post(
        "http://localhost:5000/api/favorites/add",
        {
          userId: user._id,
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster_path
        }
      );

      alert("Movie Added To Favorites");

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchMovieDetails();
    fetchTrailer();

  }, [id]);

  if (!movie) {

    return <h1>Loading...</h1>;

  }

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{
          width: "300px",
          borderRadius: "10px"
        }}
      />

      <h1>{movie.title}</h1>

      <p>{movie.overview}</p>

      <p>
        Release Date: {movie.release_date}
      </p>

      <p>
        Rating: {movie.vote_average}
      </p>

      <button
        onClick={addToFavorites}
        style={{
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        ❤️ Add To Favorites
      </button>

      {
        trailer && (

          <div
            style={{
              marginTop: "30px"
            }}
          >

            <h2>Watch Trailer</h2>

            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>

          </div>

        )
      }

    </div>

  );
}

export default MovieDetails;