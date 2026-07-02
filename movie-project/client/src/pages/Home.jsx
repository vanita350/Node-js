import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  // Trending Movies
  const fetchMovies = async () => {

    try {

      const response = await axios.get(

        `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

      );

      setMovies(response.data.results);

    } catch (error) {

      console.log(error);

    }

  };

  // Search Movies
  const searchMovies = async () => {

    try {

      const response = await axios.get(

        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${search}`

      );

      setMovies(response.data.results);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchMovies();

  }, []);

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>Trending Movies</h1>

      {/* Search Section */}
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px"
        }}
      >

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <button
          onClick={searchMovies}
          style={{
            padding: "10px 20px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Search
        </button>

      </div>

      {/* Movies Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        {
          movies.map((movie) => (

            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              style={{
                textDecoration: "none",
                color: "black"
              }}
            >

              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
              >

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover"
                  }}
                />

                <div
                  style={{
                    padding: "10px"
                  }}
                >

                  <h3>{movie.title}</h3>

                  <p>
                    Rating: {movie.vote_average}
                  </p>

                </div>

              </div>

            </Link>

          ))
        }

      </div>

    </div>

  );
}

export default Home;