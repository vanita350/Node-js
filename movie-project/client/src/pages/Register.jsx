// function Register() {

//   return (

//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "90vh"
//       }}
//     >

//       <div
//         style={{
//           width: "300px",
//           padding: "20px",
//           border: "1px solid gray",
//           borderRadius: "10px"
//         }}
//       >

//         <h2>Register</h2>

//         <input
//           type="text"
//           placeholder="Enter name"
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginTop: "10px"
//           }}
//         />

//         <input
//           type="email"
//           placeholder="Enter email"
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginTop: "10px"
//           }}
//         />

//         <input
//           type="password"
//           placeholder="Enter password"
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginTop: "10px"
//           }}
//         />

//         <button
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginTop: "15px",
//             backgroundColor: "black",
//             color: "white",
//             border: "none"
//           }}
//         >
//           Register
//         </button>

//       </div>

//     </div>

//   );
// }

// export default Register;


import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const registerUser = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(response.data.message);

    } catch (error) {

      alert("Registration Failed");

    }

  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh"
      }}
    >

      <div
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid gray",
          borderRadius: "10px"
        }}
      >

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <button
          onClick={registerUser}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            backgroundColor: "black",
            color: "white",
            border: "none"
          }}
        >
          Register
        </button>

      </div>

    </div>

  );
}

export default Register;