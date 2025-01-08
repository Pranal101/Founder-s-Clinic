// "use client";

// import React, { useState } from "react";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// const FormContent = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const auth = getAuth();
//       console.log("Attempting to create user with email:", email);

//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Log the user object
//       console.log("User created:", user);

//       // Update the user's display name
//       console.log("Updating user profile with name:", name);
//       await updateProfile(user, { displayName: name });
//       await user.reload();
//       const idToken = await user.getIdToken();
//       console.log("Generated ID Token:", idToken);

//       const userData = {
//         name: name || user.displayName,
//         email: user.email,
//       };
//       console.log("Sending user data to server:", userData);

//       const response = await fetch("https://founders-clinic-backend.onrender.com/api/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${idToken}`,
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         console.error("Server responded with error:", data);
//         throw new Error(data.message || "Registration failed");
//       }

//       console.log("Server response:", data);
//       setSuccess("Registration successful! Redirecting...");
//       setTimeout(() => {
//         window.location.href = "/selectRole";
//       }, 2000);
//     } catch (err) {
//       console.error("Error registering user:", err);
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleRegister} method="post" action="add-parcel.html">
//       <div className="form-group">
//         <label>Name</label> {/* Name input field */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label>Email Address</label>
//         <input
//           type="email"
//           name="username"
//           placeholder="Username"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       {/* name */}

//       <div className="form-group">
//         <label>Password</label>
//         <input
//           id="password-field"
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       {/* password */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}
//       <div className="form-group">
//         <button className="theme-btn btn-style-one" type="submit">
//           Register
//         </button>
//       </div>
//       {/* login */}
//     </form>
//   );
// };

// export default FormContent;
"use client";

import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const FormContent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const auth = getAuth();
      console.log("Attempting to create user with email:", email);

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User created:", user);

      // Update the user's profile to include the name as displayName
      console.log("Updating user profile with name:", name);
      await updateProfile(user, { displayName: name });

      // Force refresh the token to ensure it includes the displayName
      await user.reload();
      const idToken = await user.getIdToken(true); // Refresh the token

      console.log("Generated ID Token with displayName:", idToken);

      // Send the token to the backend
      const response = await fetch(
        "https://founders-clinic-backend.onrender.com/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`, // Token with displayName included
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Server responded with error:", data);
        throw new Error(data.message || "Registration failed");
      }

      console.log("Server response:", data);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/selectRole";
      }, 2000);
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="username"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default FormContent;
