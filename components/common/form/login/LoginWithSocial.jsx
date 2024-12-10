"use client";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../firebase";

const LoginWithSocial = () => {
  const handleLinkedInLogin = async () => {
    try {
      // Extract the `id_token` from the URL query parameters
      const query = new URLSearchParams(window.location.search);
      const idToken = query.get("id_token");

      if (!idToken) {
        // If no `id_token`, redirect to LinkedIn authorization URL
        const authorizationURL = "http://localhost:4000/api/linkedin/authorize";
        window.location.href = authorizationURL;
        return;
      }

      // If `id_token` exists, proceed with Firebase login
      const provider = new OAuthProvider("oidc.linkedin.com");

      // Use the `idToken` for Firebase OAuth credential
      const credential = provider.credential({
        idToken,
      });

      const authInstance = getAuth(); // Use the Firebase Auth instance
      const result = await signInWithCredential(authInstance, credential);

      // Retrieve user details
      const user = result.user;
      const token = await user.getIdToken();

      console.log("Firebase LinkedIn login successful. User:", user);

      // Send user info to your backend for registration or login
      const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for backend authentication
        },
        body: JSON.stringify({
          name: user.displayName || "Unknown Name",
          email: user.email || "Unknown Email",
          uid: user.uid,
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok) {
        // Redirect based on the backend response
        window.location.href = data.newUser ? "/onboarding" : "/dashboard";
      } else {
        console.error("Error during backend registration:", data.message);
      }
    } catch (error) {
      console.error("Error signing in with LinkedIn via Firebase:", error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In successful:", user);
      // Handle user data or redirect to another page here
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
    }
  };

  return (
    <div className="btn-box row">
      <div className="col-lg-6 col-md-12">
        <button
          onClick={handleLinkedInLogin}
          className="theme-btn social-btn-two facebook-btn"
        >
          <i className="fab fa-linkedin"></i> Log In via LinkedIn
        </button>
      </div>
      <div className="col-lg-6 col-md-12">
        <button
          onClick={handleGoogleLogin}
          className="theme-btn social-btn-two google-btn"
        >
          <i className="fab fa-google"></i> Log In via Gmail
        </button>
      </div>
    </div>
  );
};

export default LoginWithSocial;
