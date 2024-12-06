"use client";

import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../firebase";

const LoginWithSocial = () => {
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
        <a href="#" className="theme-btn social-btn-two facebook-btn">
          <i className="fab fa-facebook-f"></i> Log In via Facebook
        </a>
      </div>
      <div className="col-lg-6 col-md-12">
        <button
          onClick={handleGoogleLogin}
          className="theme-btn social-btn-two google-btn"
        >
          <i className="fab fa-google"></i> Log In via Gmail
          {/* <a href="#" className="theme-btn social-btn-two google-btn">
            <i className="fab fa-google"></i> Log In via Gmail
          </a> */}
        </button>
      </div>
    </div>
  );
};

export default LoginWithSocial;
