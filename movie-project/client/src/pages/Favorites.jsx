import { useEffect, useState } from "react";
import axios from "axios";

function Favorites() {

  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        `http://localhost:5000/api/favorites/${user._id}`
      );

      setFavorites(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const removeFavorite = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/favorites/remove/${id}`
      );

      alert("Favorite Removed");

      fetchFavorites();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchFavorites();

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h1>My Favorites ❤️</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px"
        }}
      >

        {
          favorites.map((movie) => (

            <div
              key={movie._id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                borderRadius: "10px"
              }}
            >

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover"
                }}
              />

              <h3>{movie.title}</h3>

              <button
                onClick={() => removeFavorite(movie._id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                Remove ❤️
              </button>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default Favorites;