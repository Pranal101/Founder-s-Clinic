// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import employerMenuData from "../../data/employerMenuData";
// import HeaderNavContent from "./HeaderNavContent";
// import { isActiveLink } from "../../utils/linkActiveChecker";
// import { usePathname } from "next/navigation";
// import { toast } from "react-toastify";

// const DashboardHeader = () => {
//   const [navbar, setNavbar] = useState(false);

//   const changeBackground = () => {
//     if (window.scrollY >= 0) {
//       setNavbar(true);
//     } else {
//       setNavbar(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", changeBackground);
//   }, []);
//   return (
//     // <!-- Main Header-->
//     <header
//       className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
//     >
//       <div className="container-fluid">
//         {/* <!-- Main box --> */}
//         <div className="main-box">
//           {/* <!--Nav Outer --> */}
//           <div className="nav-outer">
//             <div className="logo-box">
//               <div className="logo">
//                 <Link href="/">
//                   <Image
//                     alt="brand"
//                     src="/images/logo.svg"
//                     width={154}
//                     height={50}
//                     priority
//                   />
//                 </Link>
//               </div>
//             </div>
//             {/* End .logo-box */}

//             <HeaderNavContent />
//             {/* <!-- Main Menu End--> */}
//           </div>
//           {/* End .nav-outer */}

//           <div className="outer-box">
//             <button className="menu-btn">
//               <span className="count">1</span>
//               <span className="icon la la-heart-o"></span>
//             </button>
//             {/* wishlisted menu */}

//             <button className="menu-btn">
//               <span className="icon la la-bell"></span>
//             </button>
//             {/* End notification-icon */}

//             {/* <!-- Dashboard Option --> */}
//             <div className="dropdown dashboard-option">
//               <a
//                 className="dropdown-toggle"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 <Image
//                   alt="avatar"
//                   className="thumb"
//                   src="/images/resource/company-6.png"
//                   width={50}
//                   height={50}
//                 />
//                 <span className="name">My Account</span>
//               </a>

//               <ul className="dropdown-menu">
//                 {employerMenuData.map((item) => (
//                   <li
//                     className={`${
//                       isActiveLink(item.routePath, usePathname())
//                         ? "active"
//                         : ""
//                     } mb-1`}
//                     key={item.id}
//                   >
//                     <Link href={item.routePath}>
//                       <i className={`la ${item.icon}`}></i> {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {/* End dropdown */}
//           </div>
//           {/* End outer-box */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const DashboardHeader = () => {
  const [navbar, setNavbar] = useState(false);

  // Handle scrolling for fixed header
  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  // Logout handler
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Firebase sign-out
      toast.success("Logged out successfully!");
      console.log("User logged out successfully");
      // Optional: Redirect to the login page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error.message);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    // Main Header
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
      <div className="container-fluid">
        {/* Main box */}
        <div className="main-box">
          {/* Nav Outer */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image
                    alt="brand"
                    src="/images/logo.svg"
                    width={154}
                    height={50}
                    priority
                  />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* Main Menu End */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            {/* Wishlisted menu */}
            {/* <button className="menu-btn">
              <span className="count">1</span>
              <span className="icon la la-heart-o"></span>
            </button> */}

            {/* Notification icon */}
            {/* <button className="menu-btn">
              <span className="icon la la-bell"></span>
            </button> */}

            {/* Dashboard Option */}
            <div className="dropdown dashboard-option">
              <a
                className="dropdown-toggle"
                role="button"
                // data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Image
                  alt="avatar"
                  className="thumb"
                  src="/images/resource/company-6.png"
                  width={50}
                  height={50}
                />
                <span className="name">My Account</span>
              </a>

              <ul className="dropdown-menu">
                {employerMenuData.map((item) => (
                  <li
                    className={`${
                      isActiveLink(item.routePath, usePathname())
                        ? "active"
                        : ""
                    } mb-1`}
                    key={item.id}
                  >
                    {item.name === "Logout" ? (
                      <a onClick={handleLogout}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </a>
                    ) : (
                      <Link href={item.routePath}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/* End dropdown */}
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
