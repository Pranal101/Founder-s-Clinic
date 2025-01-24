"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";

const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link href="/">
                <Image
                  width={154}
                  height={50}
                  src="/images/logo.svg"
                  alt="brand"
                />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Add Listing --> */}
          {/* <Link href="/candidates-dashboard/cv-manager" className="upload-cv">
            Upload your CV
          </Link> */}
          {/* <!-- Login/Register --> */}
          <div className="btn-box">
            <a
              href="#"
              className="theme-btn btn-style-three call-modal"
              data-bs-toggle="modal"
              data-bs-target="#loginPopupModal"
            >
              Login / Register
            </a>
            {/* <Link
              href="/employers-dashboard/post-jobs"
              className="theme-btn btn-style-one"
            >
              Job Post
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
//******************TO BE USED LATER****************************************** */
// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import HeaderNavContent from "./HeaderNavContent";
// import Image from "next/image";

// const DefaulHeader2 = () => {
//   const [navbar, setNavbar] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in

//   const changeBackground = () => {
//     if (window.scrollY >= 10) {
//       setNavbar(true);
//     } else {
//       setNavbar(false);
//     }
//   };

//   useEffect(() => {
//     // Add scroll event listener
//     window.addEventListener("scroll", changeBackground);

//     // Firebase auth state listener
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log("User is logged in:", user); // Debugging log
//         setIsLoggedIn(true);
//       } else {
//         console.log("No user is logged in"); // Debugging log
//         setIsLoggedIn(false);
//       }
//     });

//     // Cleanup event listeners on unmount
//     return () => {
//       window.removeEventListener("scroll", changeBackground);
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <header
//       className={`main-header ${
//         navbar ? "fixed-header animated slideInDown" : ""
//       }`}
//     >
//       <div className="main-box">
//         <div className="nav-outer">
//           <div className="logo-box">
//             <div className="logo">
//               <Link href="/">
//                 <Image
//                   width={154}
//                   height={50}
//                   src="/images/logo.svg"
//                   alt="brand"
//                 />
//               </Link>
//             </div>
//           </div>
//           <HeaderNavContent />
//         </div>
//         <div className="outer-box">
//           {!isLoggedIn && (
//             <div className="btn-box">
//               <a
//                 href="#"
//                 className="theme-btn btn-style-three call-modal"
//                 data-bs-toggle="modal"
//                 data-bs-target="#loginPopupModal"
//               >
//                 Login / Register
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DefaulHeader2;
