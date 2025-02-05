// "use client";

// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import mobileMenuData from "../../../data/mobileMenuData";
// import SidebarFooter from "./SidebarFooter";
// import SidebarHeader from "./SidebarHeader";
// import {
//   isActiveLink,
//   isActiveParentChaild,
// } from "../../../utils/linkActiveChecker";
// import { usePathname, useRouter } from "next/navigation";

// const Index = () => {
//   const router = useRouter();

//   return (
//     <div
//       className="offcanvas offcanvas-start mobile_menu-contnet"
//       tabIndex="-1"
//       id="offcanvasMenu"
//       data-bs-scroll="true"
//     >
//       <SidebarHeader />
//       {/* End pro-header */}

//       {/* <Sidebar>
//         <Menu>
//           {mobileMenuData.map((item) => (
//             <SubMenu
//               className={
//                 isActiveParentChaild(item.items, usePathname())
//                   ? "menu-active"
//                   : ""
//               }
//               label={item.label}
//               key={item.id}
//             >
//               {item.items.map((menuItem, i) => (
//                 <MenuItem
//                   onClick={() => router.push(menuItem.routePath)}
//                   className={
//                     isActiveLink(menuItem.routePath, usePathname())
//                       ? "menu-active-link"
//                       : ""
//                   }
//                   key={i}
//                   // routerLink={<Link href={menuItem.routePath} />}
//                 >
//                   {menuItem.name}
//                 </MenuItem>
//               ))}
//             </SubMenu>
//           ))}
//         </Menu>
//       </Sidebar> */}
//       <Sidebar>
//         <Menu>
//           {mobileMenuData.map((item) =>
//             item.routePath ? ( // Check if the menu has a direct routePath
//               <MenuItem
//                 onClick={() => router.push(item.routePath)}
//                 className={
//                   isActiveLink(item.routePath, usePathname())
//                     ? "menu-active-link"
//                     : ""
//                 }
//                 key={item.id}
//               >
//                 {item.label}
//               </MenuItem>
//             ) : (
//               <SubMenu
//                 className={
//                   isActiveParentChaild(item.items, usePathname())
//                     ? "menu-active"
//                     : ""
//                 }
//                 label={item.label}
//                 key={item.id}
//               >
//                 {item.items.map((menuItem, i) => (
//                   <MenuItem
//                     onClick={() => router.push(menuItem.routePath)}
//                     className={
//                       isActiveLink(menuItem.routePath, usePathname())
//                         ? "menu-active-link"
//                         : ""
//                     }
//                     key={i}
//                   >
//                     {menuItem.name}
//                   </MenuItem>
//                 ))}
//               </SubMenu>
//             )
//           )}
//         </Menu>
//       </Sidebar>
//       <SidebarFooter />
//     </div>
//   );
// };

// export default Index;
"use client";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "../../../firebase"; // Firebase instance
import axios from "axios";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

const Index = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch role from the backend
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

          // Check if the fetched role is Admin
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
      loggedInLink: "/employers-dashboard/dashboard",
      guestLink: "/employers-dashboard/overview",
    },
    {
      role: "Professional",
      label: "Professionals",
      loggedInLink: "/candidates-dashboard/dashboard",
      guestLink: "/candidates-dashboard/overview",
    },
    {
      role: "Intern",
      label: "Interns",
      loggedInLink: "/intern-dashboard/dashboard",
      guestLink: "/intern-dashboard/overview",
    },
    {
      role: "Investor",
      label: "Investors",
      loggedInLink: "/investors-dashboard/dashboard",
      guestLink: "/investors-dashboard/overview",
    },
    {
      role: "Networking Community",
      label: "Networking Communities",
      loggedInLink: "/networking-dashboard/dashboard",
      guestLink: "/networking-dashboard/overview",
    },
  ];

  const pagesMenu = [
    { id: 1, name: "Events", routePath: "/events" },
    { id: 2, name: "Contact Us", routePath: "/contact" },
  ];

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      <Sidebar>
        <Menu>
          {user ? (
            <>
              {isAdmin && (
                <MenuItem
                  onClick={() => router.push("/admin-dashboard/dashboard")}
                  className={
                    pathname?.includes("/admin-dashboard")
                      ? "menu-active-link"
                      : ""
                  }
                >
                  Admin
                </MenuItem>
              )}
              {navItems
                .filter((item) => !isAdmin && item.role === role)
                .map((item) => (
                  <MenuItem
                    key={item.role}
                    onClick={() => router.push(item.loggedInLink)}
                    className={
                      pathname?.includes(item.loggedInLink)
                        ? "menu-active-link"
                        : ""
                    }
                  >
                    {item.label}
                  </MenuItem>
                ))}
            </>
          ) : (
            navItems.map((item) => (
              <MenuItem
                key={item.role}
                onClick={() => router.push(item.guestLink)}
                className={
                  pathname?.includes(item.guestLink) ? "menu-active-link" : ""
                }
              >
                {item.label}
              </MenuItem>
            ))
          )}
          <SubMenu
            className={
              pagesMenu.some((item) => pathname?.includes(item.routePath))
                ? "menu-active"
                : ""
            }
            label="More"
          >
            {pagesMenu.map((page) => (
              <MenuItem
                key={page.id}
                onClick={() => router.push(page.routePath)}
                className={
                  pathname?.includes(page.routePath) ? "menu-active-link" : ""
                }
              >
                {page.name}
              </MenuItem>
            ))}
          </SubMenu>
        </Menu>
      </Sidebar>
      <SidebarFooter />
    </div>
  );
};

export default Index;
