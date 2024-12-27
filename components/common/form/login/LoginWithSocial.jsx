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
        window.location.href = data.newUser ? "/selectRole" : "/selectRole";
      } else {
        console.error("Error during backend registration:", data.message);
      }
    } catch (error) {
      console.error("Error signing in with LinkedIn via Firebase:", error);
    }
  };

  // const handleGoogleLogin = async () => {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     console.log("Google Sign-In successful:", user);
  //     // Handle user data or redirect to another page here
  //   } catch (error) {
  //     console.error("Error during Google Sign-In:", error.message);
  //   }
  // };
  // const handleGoogleLogin = async () => {
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     // Initiate Google Sign-In
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //     // Get the Firebase ID token for the authenticated user
  //     const token = await user.getIdToken();

  //     console.log("Google Sign-In successful. User:", user);

  //     // Send user info to your backend via the /register API
  //     const response = await fetch("http://localhost:4000/api/user/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // Send token for backend authentication
  //       },
  //       body: JSON.stringify({
  //         name: user.displayName || "Unknown Name",
  //         email: user.email || "Unknown Email",
  //         uid: user.uid,
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log("Backend response:", data);

  //     if (response.ok) {
  //       // Redirect based on the backend response
  //       window.location.href = data.newUser ? "/selectRole" : "/dashboard";
  //     } else {
  //       console.error("Error during backend registration:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error during Google Sign-In:", error.message);
  //   }
  // };
  // const handleGoogleLogin = async () => {
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     // Sign in with Google
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //     console.log("Google Sign-In successful. User:", user);

  //     // Check if the user is new
  //     const isNewUser =
  //       user.metadata.creationTime === user.metadata.lastSignInTime;

  //     console.log("Is new user:", isNewUser);

  //     // Redirect based on the user status
  //     if (isNewUser) {
  //       // Redirect to /selectRole for new users
  //       window.location.href = "/selectRole";
  //     } else {
  //       // Redirect to /dashboard for existing users
  //       window.location.href = "/selectRole";
  //     }
  //   } catch (error) {
  //     console.error("Error during Google Sign-In:", error.message);
  //   }
  // };
  // const handleGoogleLogin = async () => {
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     // Sign in with Google
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //     console.log("Google Sign-In successful. User:", user);

  //     // Get the Firebase ID token for backend authentication
  //     const token = await user.getIdToken();

  //     // Check if the user is new
  //     const isNewUser =
  //       user.metadata.creationTime === user.metadata.lastSignInTime;

  //     console.log("Is new user:", isNewUser);

  //     // Send user info to the backend for registration
  //     const response = await fetch("http://localhost:4000/api/user/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // Token for backend verification
  //       },
  //       body: JSON.stringify({
  //         uid: user.uid,
  //         name: user.displayName || "Unknown Name",
  //         email: user.email || "Unknown Email",
  //       }),
  //     });
  //     const roleData = await fetch("http://localhost:4000/api/getRole", {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Pass the token for authentication
  //       },
  //     });
  //     const data = await roleData.json();

  //     if (response.ok) {
  //       console.log("User successfully registered or logged in:", data);

  //       // Redirect based on the backend response
  //       window.location.href = data.newUser ? "/selectRole" : "/selectRole";
  //     } else {
  //       console.error("Error during user registration:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error during Google Sign-In:", error.message);
  //   }
  // };
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google Sign-In successful. User:", user);

      // Get the Firebase ID token for backend authentication
      const token = await user.getIdToken();

      // Check if the user is new
      const isNewUser =
        user.metadata.creationTime === user.metadata.lastSignInTime;

      console.log("Is new user:", isNewUser);

      // Send user info to the backend for registration
      const registrationResponse = await fetch(
        "http://localhost:4000/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Token for backend verification
          },
          body: JSON.stringify({
            uid: user.uid,
            name: user.displayName || "Unknown Name",
            email: user.email || "Unknown Email",
          }),
        }
      );

      const registrationData = await registrationResponse.json();

      if (!registrationResponse.ok) {
        console.error(
          "Error during user registration:",
          registrationData.message
        );
        return;
      }

      console.log(
        "User successfully registered or logged in:",
        registrationData
      );

      // Fetch the role from the backend
      const roleResponse = await fetch(
        "http://localhost:4000/api/user/getRole",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );

      const roleData = await roleResponse.json();

      if (!roleResponse.ok) {
        console.error("Error fetching user role:", roleData.message);
        return;
      }

      console.log("User role from backend:", roleData.role);

      // Redirect based on the role
      if (roleData.role === "Enterprise") {
        window.location.href = "/employers-dashboard/dashboard";
      } else if (roleData.role === "Professional") {
        window.location.href = "/candidates-dashboard/dashboard";
      } else if (roleData.role === "Intern") {
        window.location.href = "/candidates-dashboard/dashboard";
      } else if (isNewUser) {
        // Redirect to role selection page for new users without a role
        window.location.href = "/selectRole";
      } else {
        console.error("Unhandled role or scenario");
        window.location.href = "/selectRole"; // Fallback
      }
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
