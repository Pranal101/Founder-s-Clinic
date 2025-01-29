"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

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
  //     const response = await fetch("https://founders-clinic-backend.onrender.com/api/user/register", {
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
    setError(""); // Reset any previous error messages

    // Input validation
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

      const user = userCredential.user;
      const token = await user.getIdToken();

      // Check for admin credentials (example hardcoded credentials)
      // const adminEmail = "admin@foundersclinic.com";
      // const adminPassword = "admin@123";
      // if (email === adminEmail && password === adminPassword) {
      //   // Redirect to admin dashboard
      //   toast.success("Welcome Admin!");
      //   window.location.href = "/404";
      //   return;
      // }
      // Send user details to the backend
      const response = await fetch(
        "https://founders-clinic-backend.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            password, // Include the plain-text password for validation
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const { role } = data.user; // Assuming the backend returns `user` with `role` field

        // Role-based redirection
        if (role === "Enterprise") {
          window.location.href = "/employers-dashboard/dashboard";
        } else if (role === "Professional") {
          window.location.href = "/candidates-dashboard/dashboard";
        } else if (role === "Intern") {
          window.location.href = "/intern-dashboard/dashboard";
        } else if (role === "Investor") {
          window.location.href = "/investors-dashboard/dashboard";
        } else if (role === "Networking Community") {
          window.location.href = "/networking-dashboard/dashboard";
        } else if (role === "Admin") {
          window.location.href = "/admin-dashboard/dashboard";
        } else {
          setError("Invalid role. Please contact support.");
        }
        toast.success("Logged in!");
      } else {
        setError(
          data.message || "An error occurred during login. Please try again."
        );
        toast.error("Error logging in, please try again.");
      }
    } catch (err) {
      // Handle Firebase errors
      if (err.code === "auth/user-not-found") {
        setError("User not found. Please sign up first.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to Founders' Clinic</h3>

      {/* <!--Login Form--> */}
      <form method="post" onSubmit={handleEmailLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
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
