"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   onAuthStateChanged,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signOut,
// } from "firebase/auth";
// import { auth } from "../firebase.js";

// // Create AuthContext
// const AuthContext = createContext();
// console.log("AuthContext created:", AuthContext);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   console.log("AuthProvider initialized");

//   useEffect(() => {
//     console.log("Setting up onAuthStateChanged listener");
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log("User logged in:", user);
//       } else {
//         console.log("No user logged in");
//       }
//       setUser(user);
//     });

//     return () => {
//       console.log("Cleaning up onAuthStateChanged listener");
//       unsubscribe();
//     };
//   }, []);

//   const signIn = async () => {
//     console.log("Initiating Google Sign-In");
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       console.log("Google Sign-In successful:", result.user);
//     } catch (error) {
//       console.error("Error during Google Sign-In:", error);
//     }
//   };

//   const logOut = async () => {
//     console.log("Logging out");
//     try {
//       await signOut(auth);
//       console.log("Successfully logged out");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, signIn, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   console.log("useAuth hook called");
//   const context = useContext(AuthContext);
//   console.log("useAuth context value:", context);

//   if (!context) {
//     console.error("useAuth must be used within an AuthProvider");
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
//}
