import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logoutUser = () => {

    localStorage.removeItem("token");

    alert("Logout Successful");

    navigate("/login");

  };

  return (

    <div
      style={{
        backgroundColor: "black",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <h1 style={{ color: "white" }}>
        Movie App
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px"
        }}
      >

        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Home
        </Link>

        <Link to="/favorites">
  Favorites
</Link>

        {
          token ? (

            <button
              onClick={logoutUser}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>

          ) : (

            <>
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none"
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={{
                  color: "white",
                  textDecoration: "none"
                }}
              >
                Register
              </Link>
            </>

          )
        }

      </div>

    </div>

  );
}

export default Navbar;