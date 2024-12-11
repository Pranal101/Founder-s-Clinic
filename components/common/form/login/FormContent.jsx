"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import {
  getAuth,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
} from "firebase/auth";

const FormContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const handleEmailLogin = async (e) => {
  //   e.preventDefault(); // Prevent form submission default behavior
  //   setError(""); // Reset error message

  //   try {
  //     const auth = getAuth();
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;
  //     const additionalUserInfo = getAdditionalUserInfo(userCredential);
  //     const isNewUser = additionalUserInfo?.isNewUser;
  //     console.log("User signed in:", user);
  //     console.log("Is New User:", isNewUser);

  //     // Redirect user based on new/returning status
  //     if (isNewUser) {
  //       window.location.href = "/selectRole";
  //     } else {
  //       window.location.href = "/dashboard";
  //     }
  //   } catch (err) {
  //     console.error("Error signing in:", err);
  //     setError("Invalid email or password. Please try again.");
  //   }
  // };
  // const handleEmailLogin = async (e) => {
  //   e.preventDefault(); // Prevent form submission default behavior
  //   setError(""); // Reset error message

  //   try {
  //     const auth = getAuth();
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;
  //     const name = user.displayName || `User_${user.email.split("@")[0]}`;
  //     const additionalUserInfo = getAdditionalUserInfo(userCredential);
  //     const isNewUser = additionalUserInfo?.isNewUser;

  //     console.log("User signed in:", user);
  //     console.log("Is New User:", isNewUser);

  //     // Get Firebase ID token
  //     const token = await user.getIdToken();

  //     // Send user info to the backend for registration
  //     const response = await fetch("http://localhost:4000/api/user/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // Token for backend verification
  //       },
  //       body: JSON.stringify({
  //         uid: user.uid,
  //         name: name || user.displayName,
  //         email: user.email || "Unknown Email",
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("User successfully registered or logged in:", data);

  //       // Redirect user based on new/returning status
  //       window.location.href = data.newUser ? "/selectRole" : "/dashboard";
  //     } else {
  //       console.error("Error during user registration:", data.message);
  //       setError("An error occurred during login. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Error signing in:", err);
  //     setError("Invalid email or password. Please try again.");
  //   }
  // };
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Proceed with user token and backend operations
      const user = userCredential.user;
      const token = await user.getIdToken();

      const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid: user.uid, email: user.email }),
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data.newUser ? "/selectRole" : "/dashboard";
      } else {
        setError("Server error. Please try again.");
      }
    } catch (err) {
      console.error("Error signing in:", err);
      if (err.code === "auth/user-not-found") {
        setError("User not found. Please sign up first.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to Founder's Clinic</h3>

      {/* <!--Login Form--> */}
      <form method="post" onSubmit={handleEmailLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* name */}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        {/* forgot password */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
          >
            Log In
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
