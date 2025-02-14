// "use client";
// import Link from "next/link";
// import {
//   candidateItems,
//   employerItems,
//   homeItems,
//   pageItems,
//   shopItems,
// } from "../../data/mainMenuData";
// import {
//   isActiveParent,
//   isActiveLink,
//   isActiveParentChaild,
// } from "../../utils/linkActiveChecker";
// import { usePathname } from "next/navigation";
// import { use } from "react";

// const HeaderNavContent = () => {
//   return (
//     <>
//       <nav className="nav main-menu">
//         <ul className="navigation" id="navbar">
//           {/* current dropdown */}
//           <li
//             className={`${
//               isActiveParent(homeItems, usePathname()) ? "current" : ""
//             } `}
//           >
//             <Link href="/">
//               <span>Home</span>
//             </Link>

//             {/* <div className="mega-menu">
//               <div className="mega-menu-bar row pt-0">
//                 {homeItems.map((item) => (
//                   <div
//                     className="column col-lg-3 col-md-3 col-sm-12"
//                     key={item.id}
//                   >
//                     <ul>
//                       {item.items.map((menu, i) => (
//                         <li
//                           className={
//                             isActiveLink(menu.routePath, usePathname())
//                               ? "current"
//                               : ""
//                           }
//                           key={i}
//                         >
//                           <Link href={menu.routePath}>{menu.name}</Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </div> */}
//           </li>
//           {/* End homepage menu items */}
//           {/*
//           <li
//             className={`${
//               isActiveParent(findJobItems, usePathname()) ? "current" : ""
//             } `}
//             id="has-mega-menu"
//           >
//             <span>Find Jobs</span>
//             <div className="mega-menu">
//               <div className="mega-menu-bar row">
//                 {findJobItems.map((item) => (
//                   <div
//                     className="column col-lg-3 col-md-3 col-sm-12"
//                     key={item.id}
//                   >
//                     <h3>{item.title}</h3>
//                     <ul>
//                       {item.items.map((menu, i) => (
//                         <li
//                           className={
//                             isActiveLink(menu.routePath, usePathname())
//                               ? "current"
//                               : ""
//                           }
//                           key={i}
//                         >
//                           <Link href={menu.routePath}>{menu.name}</Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </li> */}
//           {/* Find Jobs */}
//           {/* <li
//             className={
//               usePathname()?.includes("/employers-dashboard") ? "current" : ""
//             }
//           >
//             <Link href="/job-list-v3">Find Jobs</Link>
//           </li> */}
//           {/* End findjobs menu items */}
//           <li
//             className={
//               usePathname()?.includes("/employers-dashboard") ? "current" : ""
//             }
//           >
//             <Link href="/employers-dashboard/dashboard">Enterprises</Link>
//           </li>
//           {/* <li
//             className={`${
//               isActiveParent(employerItems, usePathname()) ||
//               usePathname()?.split("/")[1] === "employers-dashboard"
//                 ? "current"
//                 : ""
//             } dropdown`}
//           >
//             <span>Enterprises</span>
//             <ul>
//               <li
//                 className={
//                   usePathname()?.includes("/employers-dashboard")
//                     ? "current"
//                     : ""
//                 }
//               >
//                 <Link href="/employers-list-v3">Enterprise List</Link>
//               </li>
//               <li
//                 className={
//                   usePathname()?.includes("/employers-dashboard")
//                     ? "current"
//                     : ""
//                 }
//               >
//                 <Link href="/employers-single-v1/1">Enterprise Single</Link>
//               </li> */}
//           {/* {employerItems.map((item) => (
//                 <li className="current" key={item.id}>
//                   <span
//                     className={
//                       isActiveParentChaild(item.items, usePathname())
//                         ? "current"
//                         : ""
//                     }
//                   >
//                     {item.title}
//                   </span>
//                   <ul>
//                     {item.items.map((menu, i) => (
//                       <li
//                         className={
//                           isActiveLink(menu.routePath, usePathname())
//                             ? "current"
//                             : ""
//                         }
//                         key={i}
//                       >
//                         <Link href={menu.routePath}>{menu.name}</Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               ))} */}
//           {/* <li
//                 className={
//                   usePathname()?.includes("/employers-dashboard")
//                     ? "current"
//                     : ""
//                 }
//               >
//                 <Link href="/employers-dashboard/dashboard">
//                   Enterprise Dashboard
//                 </Link>
//               </li>
//             </ul>
//           </li> */}
//           {/* End Employers menu items */}

//           {/* <li
//             className={`${
//               isActiveParent(candidateItems, usePathname()) ||
//               usePathname()?.split("/")[1] === "candidates-dashboard"
//                 ? "current"
//                 : ""
//                 ? "current"
//                 : ""
//             } dropdown`}
//           >
//             <span>Professionals</span>
//             <ul>
//               <li
//                 className={
//                   usePathname()?.includes("/candidates-dashboard/")
//                     ? "current"
//                     : ""
//                 }
//               >
//                 <Link href="/candidates-list-v3">Professionals List</Link>
//               </li>
//               <li
//                 className={
//                   usePathname()?.includes("/candidates-dashboard/")
//                     ? "current"
//                     : ""
//                 }
//               >
//                 <Link href="/candidates-single-v1/1">Professionals Single</Link>
//               </li>
//               <li
//                 className={
//                   usePathname()?.includes("/candidates-dashboard/")
//                     ? "current"
//                     : ""
//                 }
//               >
//                 <Link href="/candidates-dashboard/dashboard">
//                   Professionals Dashboard
//                 </Link>
//               </li>
//             </ul>
//           </li> */}
//           <li
//             className={
//               usePathname()?.includes("/candidates-dashboard") ? "current" : ""
//             }
//           >
//             <Link href="/candidates-dashboard/dashboard">Professionals</Link>
//           </li>
//           {/* End Candidates menu items */}
//           {/* Intern Menu */}
//           <li
//             className={
//               usePathname()?.includes("/candidates-dashboard") ? "current" : ""
//             }
//           >
//             <Link href="/candidates-dashboard/dashboard">Interns</Link>
//           </li>
//           {/* <li
//             className={`${
//               isActiveParent(candidateItems, usePathname()) ||
//               usePathname()?.split("/")[1] === "candidates-dashboard"
//                 ? "current"
//                 : ""
//                 ? "current"
//                 : ""
//             } dropdown`}
//           >
//             <span>Intern</span>
//             <ul>
//               <li
//                 className={
//                   usePathname()?.includes("/candidates-dashboard/")
//                     ? "current"
//                     : ""
//                 }
//               >
//                 <Link href="/candidates-list-v3">Intern List</Link>
//               </li>
//               <li
//                 className={
//                   usePathname()?.includes("/candidates-dashboard/")
//                     ? "current"
//                     : ""
//                 }
//               >
//                 <Link href="/candidates-single-v1/1">Intern Single</Link>
//               </li>
//               <li
//                 className={
//                   usePathname()?.includes("/candidates-dashboard/")
//                     ? "current"
//                     : ""
//                 }
//               >
//                 <Link href="/candidates-dashboard/dashboard">
//                   Intern Dashboard
//                 </Link>
//               </li>
//             </ul>
//           </li> */}
//           <li
//             className={
//               usePathname()?.includes("/investors-dashboard") ? "current" : ""
//             }
//           >
//             <Link href="/investors-dashboard/dashboard">Investors</Link>
//           </li>
//           <li
//             className={
//               usePathname()?.includes("/networking-dashboard") ? "current" : ""
//             }
//           >
//             <Link href="/networking-dashboard/dashboard">
//               Networking Communities
//             </Link>
//           </li>
//           {/* <li
//             className={`${
//               isActiveParentChaild(blogItems, usePathname()) ? "current" : ""
//             } dropdown`}
//           >
//             <span>Blog</span>
//             <ul>
//               {blogItems.map((item, i) => (
//                 <li
//                   className={
//                     isActiveLink(item.routePath, usePathname()) ? "current" : ""
//                   }
//                   key={i}
//                 >
//                   <Link href={item.routePath}>{item.name}</Link>
//                 </li>
//               ))}
//             </ul>
//           </li> */}
//           {/* End Blog menu items */}

//           <li
//             className={`${
//               isActiveParentChaild(pageItems, usePathname()) ||
//               isActiveParentChaild(shopItems[0].items, usePathname())
//                 ? "current "
//                 : ""
//             } dropdown`}
//           >
//             <span>Pages</span>
//             <ul>
//               {shopItems.map((item) => (
//                 <li className="dropdown" key={item.id}>
//                   <span
//                     className={`${
//                       isActiveParentChaild(shopItems[0].items, usePathname())
//                         ? "current "
//                         : ""
//                     }`}
//                   >
//                     {item.title}
//                   </span>
//                   <ul>
//                     {item.items.map((menu, i) => (
//                       <li
//                         className={
//                           isActiveLink(menu.routePath, usePathname())
//                             ? "current"
//                             : ""
//                         }
//                         key={i}
//                       >
//                         <Link href={menu.routePath}>{menu.name}</Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               ))}
//               {pageItems.map((item, i) => (
//                 <li
//                   className={
//                     isActiveLink(item.routePath, usePathname()) ? "current" : ""
//                   }
//                   key={i}
//                 >
//                   <Link href={item.routePath}>{item.name}</Link>
//                 </li>
//               ))}
//             </ul>
//           </li>
//           {/* End Pages menu items */}
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default HeaderNavContent;
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { auth } from "../../firebase"; // Firebase instance
// import axios from "axios";

// const HeaderNavContent = () => {
//   const pathname = usePathname();
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     // Listen for Firebase auth state changes
//     const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         // Fetch role from the backend if the user is logged in
//         try {
//           const token = await currentUser.getIdToken();
//           const response = await axios.get(
//             "https://founders-clinic-backend.onrender.com/api/user/getRole",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setRole(response.data.role);
//         } catch (error) {
//           console.error("Error fetching role:", error);
//         }
//       } else {
//         setUser(null);
//         setRole(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const navItems = [
//     {
//       role: "Enterprise",
//       label: "Enterprises",
//       loggedInLink: "/employers-dashboard/dashboard",
//       guestLink: "/employers-dashboard/overview",
//     },
//     {
//       role: "Professional",
//       label: "Professionals",
//       loggedInLink: "/candidates-dashboard/dashboard",
//       guestLink: "/candidates-dashboard/overview",
//     },
//     {
//       role: "Intern",
//       label: "Interns",
//       loggedInLink: "/candidates-dashboard/dashboard",
//       guestLink: "/candidates-dashboard/overview",
//     },
//     {
//       role: "Investor",
//       label: "Investors",
//       loggedInLink: "/investors-dashboard/dashboard",
//       guestLink: "/investors-dashboard/overview",
//     },
//     {
//       role: "Networking Community",
//       label: "Networking Communities",
//       loggedInLink: "/networking-dashboard/dashboard",
//       guestLink: "/networking-dashboard/overview",
//     },
//   ];

//   const pagesMenu = [
//     { id: 1, name: "Events", routePath: "/events" },
//     { id: 2, name: "Contact Us", routePath: "/contact-us" },
//   ];

//   return (
//     <nav className="nav main-menu">
//       <ul className="navigation" id="navbar">
//         {user
//           ? // Render items based on user role for logged-in users
//             navItems
//               .filter((item) => item.role === role)
//               .map((item) => (
//                 <li
//                   key={item.role}
//                   className={
//                     pathname?.includes(item.loggedInLink) ? "current" : ""
//                   }
//                 >
//                   <Link href={item.loggedInLink}>{item.label}</Link>
//                 </li>
//               ))
//           : // Render all items with guest links for unauthenticated users
//             navItems.map((item) => (
//               <li
//                 key={item.role}
//                 className={pathname?.includes(item.guestLink) ? "current" : ""}
//               >
//                 <Link href={item.guestLink}>{item.label}</Link>
//               </li>
//             ))}

//         {/* Always visible Pages menu */}
//         <li
//           className={`dropdown ${
//             pagesMenu.some((item) => pathname?.includes(item.routePath))
//               ? "current"
//               : ""
//           }`}
//         >
//           <span>Pages</span>
//           <ul>
//             {pagesMenu.map((page) => (
//               <li
//                 key={page.id}
//                 className={pathname?.includes(page.routePath) ? "current" : ""}
//               >
//                 <Link href={page.routePath}>{page.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default HeaderNavContent;
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { auth } from "../../firebase"; // Firebase instance
// import axios from "axios";

// const HeaderNavContent = () => {
//   const pathname = usePathname();
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false); // New state for admin check

//   useEffect(() => {
//     // Listen for Firebase auth state changes
//     const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);

//         // Fetch role from the backend if the user is not admin
//         try {
//           const token = await currentUser.getIdToken();
//           const response = await axios.get(
//             "https://founders-clinic-backend.onrender.com/api/user/getRole",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           const fetchedRole = response.data.role;
//           setRole(fetchedRole);

//           // Check if the fetched role is Admin
//           setIsAdmin(fetchedRole === "Admin");
//         } catch (error) {
//           console.error("Error fetching role:", error);
//         }
//       } else {
//         setUser(null);
//         setRole(null);
//         setIsAdmin(false); // Reset admin state
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const navItems = [
//     {
//       role: "Enterprise",
//       label: "Enterprises",
//       loggedInLink: "/employers-dashboard/dashboard",
//       guestLink: "/employers-dashboard/overview",
//     },
//     {
//       role: "Professional",
//       label: "Professionals",
//       loggedInLink: "/candidates-dashboard/dashboard",
//       guestLink: "/candidates-dashboard/overview",
//     },
//     {
//       role: "Intern",
//       label: "Interns",
//       loggedInLink: "/intern-dashboard/dashboard",
//       guestLink: "/intern-dashboard/overview",
//     },
//     {
//       role: "Investor",
//       label: "Investors",
//       loggedInLink: "/investors-dashboard/dashboard",
//       guestLink: "/investors-dashboard/overview",
//     },
//     {
//       role: "Networking Community",
//       label: "Networking Communities",
//       loggedInLink: "/networking-dashboard/dashboard",
//       guestLink: "/networking-dashboard/overview",
//     },
//   ];

//   const pagesMenu = [
//     { id: 1, name: "Events", routePath: "/events" },
//     { id: 2, name: "Contact Us", routePath: "/contact" },
//   ];

//   return (
//     <nav className="nav main-menu">
//       <ul className="navigation" id="navbar">
//         {user ? (
//           <>
//             {isAdmin ? (
//               // Add Admin link if user is admin
//               <li
//                 className={
//                   pathname?.includes("/admin-dashboard") ? "current" : ""
//                 }
//               >
//                 <Link href="/admin-dashboard/dashboard">Admin</Link>
//               </li>
//             ) : (
//               // Render items based on user role for logged-in users
//               navItems
//                 .filter((item) => item.role === role)
//                 .map((item) => (
//                   <li
//                     key={item.role}
//                     className={
//                       pathname?.includes(item.loggedInLink) ? "current" : ""
//                     }
//                   >
//                     <Link href={item.loggedInLink}>{item.label}</Link>
//                   </li>
//                 ))
//             )}
//           </>
//         ) : (
//           // Render all items with guest links for unauthenticated users
//           navItems.map((item) => (
//             <li
//               key={item.role}
//               className={pathname?.includes(item.guestLink) ? "current" : ""}
//             >
//               <Link href={item.guestLink}>{item.label}</Link>
//             </li>
//           ))
//         )}

//         {/* Always visible Pages menu */}
//         <li
//           className={`dropdown ${
//             pagesMenu.some((item) => pathname?.includes(item.routePath))
//               ? "current"
//               : ""
//           }`}
//         >
//           <span>More</span>
//           <ul>
//             {pagesMenu.map((page) => (
//               <li
//                 key={page.id}
//                 className={pathname?.includes(page.routePath) ? "current" : ""}
//               >
//                 <Link href={page.routePath}>{page.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default HeaderNavContent;
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { auth } from "../../firebase"; // Firebase instance
// import axios from "axios";

// const HeaderNavContent = () => {
//   const pathname = usePathname();
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false); // New state for admin check

//   useEffect(() => {
//     // Listen for Firebase auth state changes
//     const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);

//         // Fetch role from the backend if the user is not admin
//         try {
//           const token = await currentUser.getIdToken();
//           const response = await axios.get(
//             "https://founders-clinic-backend.onrender.com/api/user/getRole",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           const fetchedRole = response.data.role;
//           setRole(fetchedRole);

//           // Check if the fetched role is Admin
//           setIsAdmin(fetchedRole === "Admin");
//         } catch (error) {
//           console.error("Error fetching role:", error);
//         }
//       } else {
//         setUser(null);
//         setRole(null);
//         setIsAdmin(false); // Reset admin state
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const navItems = [
//     {
//       role: "Enterprise",
//       label: "Enterprises",
//       loggedInLink: "/employers-dashboard/dashboard",
//       guestLink: "/employers-dashboard/overview",
//     },
//     {
//       role: "Professional",
//       label: "Professionals",
//       loggedInLink: "/candidates-dashboard/dashboard",
//       guestLink: "/candidates-dashboard/overview",
//     },
//     {
//       role: "Intern",
//       label: "Interns",
//       loggedInLink: "/intern-dashboard/dashboard",
//       guestLink: "/intern-dashboard/overview",
//     },
//     {
//       role: "Investor",
//       label: "Investors",
//       loggedInLink: "/investors-dashboard/dashboard",
//       guestLink: "/investors-dashboard/overview",
//     },
//     {
//       role: "Networking Community",
//       label: "Networking Communities",
//       loggedInLink: "/networking-dashboard/dashboard",
//       guestLink: "/networking-dashboard/overview",
//     },
//   ];

//   const pagesMenu = [
//     { id: 1, name: "Events", routePath: "/events" },
//     { id: 2, name: "Contact Us", routePath: "/contact" },
//   ];

//   return (
//     <nav className="nav main-menu">
//       <ul className="navigation" id="navbar">
//         {user ? (
//           <>
//             {isAdmin ? (
//               // Add Admin link if user is admin
//               <li
//                 className={
//                   pathname?.includes("/admin-dashboard") ? "current" : ""
//                 }
//               >
//                 <Link href="/admin-dashboard/dashboard">Admin</Link>
//               </li>
//             ) : pathname === "/" ||
//               navItems.some((item) => pathname?.includes(item.guestLink)) ? (
//               // Render all items for authenticated users on homepage
//               navItems.map((item) => (
//                 <li
//                   key={item.role}
//                   className={
//                     pathname?.includes(
//                       item.role === role ? item.loggedInLink : item.guestLink
//                     )
//                       ? "current"
//                       : ""
//                   }
//                 >
//                   <Link
//                     href={
//                       item.role === role
//                         ? item.loggedInLink // Show loggedInLink for the current user's role
//                         : item.guestLink // Show guestLink for other roles
//                     }
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))
//             ) : (
//               // Render items based on user role for logged-in users (not on homepage)
//               navItems
//                 .filter((item) => item.role === role)
//                 .map((item) => (
//                   <li
//                     key={item.role}
//                     className={
//                       pathname?.includes(item.loggedInLink) ? "current" : ""
//                     }
//                   >
//                     <Link href={item.loggedInLink}>{item.label}</Link>
//                   </li>
//                 ))
//             )}
//           </>
//         ) : (
//           // Render all items with guest links for unauthenticated users
//           navItems.map((item) => (
//             <li
//               key={item.role}
//               className={pathname?.includes(item.guestLink) ? "current" : ""}
//             >
//               <Link href={item.guestLink}>{item.label}</Link>
//             </li>
//           ))
//         )}

//         {/* Always visible Pages menu */}
//         <li
//           className={`dropdown ${
//             pagesMenu.some((item) => pathname?.includes(item.routePath))
//               ? "current"
//               : ""
//           }`}
//         >
//           <span>More</span>
//           <ul>
//             {pagesMenu.map((page) => (
//               <li
//                 key={page.id}
//                 className={pathname?.includes(page.routePath) ? "current" : ""}
//               >
//                 <Link href={page.routePath}>{page.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default HeaderNavContent;
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "../../firebase"; // Firebase instance
import axios from "axios";

const HeaderNavContent = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const token = await currentUser.getIdToken();
          const response = await axios.get(
            "https://founders-clinic-backend.onrender.com/api/user/getRole",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const fetchedRole = response.data.role;
          setRole(fetchedRole);
          setIsAdmin(fetchedRole === "Admin");
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      } else {
        setUser(null);
        setRole(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    {
      role: "Enterprise",
      label: "Enterprises",
      guestLink: "/employers-dashboard/overview",
    },
    {
      role: "Professional",
      label: "Professionals",
      guestLink: "/candidates-dashboard/overview",
    },
    {
      role: "Intern",
      label: "Interns",
      guestLink: "/intern-dashboard/overview",
    },
    {
      role: "Investor",
      label: "Investors",
      guestLink: "/investors-dashboard/overview",
    },
    {
      role: "Networking Community",
      label: "Networking Communities",
      guestLink: "/networking-dashboard/overview",
    },
  ];

  const pagesMenu = [
    { id: 1, name: "Events", routePath: "/events" },
    { id: 2, name: "Contact Us", routePath: "/contact" },
  ];

  return (
    <nav className="nav main-menu">
      <ul className="navigation" id="navbar">
        {navItems.map((item) => (
          <li
            key={item.role}
            className={pathname?.includes(item.guestLink) ? "current" : ""}
          >
            <Link href={item.guestLink}>{item.label}</Link>
          </li>
        ))}

        {/* Always visible Pages menu */}
        <li
          className={`dropdown ${
            pagesMenu.some((item) => pathname?.includes(item.routePath))
              ? "current"
              : ""
          }`}
        >
          <span>More</span>
          <ul>
            {pagesMenu.map((page) => (
              <li
                key={page.id}
                className={pathname?.includes(page.routePath) ? "current" : ""}
              >
                <Link href={page.routePath}>{page.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavContent;
