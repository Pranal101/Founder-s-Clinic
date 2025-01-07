// "use client";

// import Link from "next/link";
// import employerMenuData from "../../data/employerMenuData";
// import { isActiveLink } from "../../utils/linkActiveChecker";

// import { useDispatch, useSelector } from "react-redux";
// import { menuToggle } from "../../features/toggle/toggleSlice";
// import { usePathname } from "next/navigation";

// const DashboardEmployerSidebar = () => {
//   const { menu } = useSelector((state) => state.toggle);

//   const dispatch = useDispatch();
//   // menu togggle handler
//   const menuToggleHandler = () => {
//     dispatch(menuToggle());
//   };

//   return (
//     <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
//       {/* Start sidebar close icon */}
//       <div className="pro-header text-end pb-0 mb-0 show-1023">
//         <div className="fix-icon" onClick={menuToggleHandler}>
//           <span className="flaticon-close"></span>
//         </div>
//       </div>
//       {/* End sidebar close icon */}

//       <div className="sidebar-inner">
//         <ul className="navigation">
//           {employerMenuData.map((item) => (
//             <li
//               className={`${
//                 isActiveLink(item.routePath, usePathname()) ? "active" : ""
//               } mb-1`}
//               key={item.id}
//               onClick={menuToggleHandler}
//             >
//               <Link href={item.routePath}>
//                 <i className={`la ${item.icon}`}></i> {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default DashboardEmployerSidebar;
"use client";

import Link from "next/link";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { usePathname } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const DashboardEmployerSidebar = () => {
  const { menu } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const pathname = usePathname();

  // Menu toggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // Logout handler
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Firebase sign-out
      toast.success("Logged out!");
      console.log("User logged out successfully");
      // Redirect will happen via the `routePath` of the menu item
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {employerMenuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, pathname) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={async () => {
                menuToggleHandler();
                if (item.name === "Logout") {
                  await handleLogout(); // Trigger logout if item is "Logout"
                }
              }}
            >
              <Link href={item.routePath}>
                <i className={`la ${item.icon}`}></i> {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;
