"use client";

import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import internMenuData from "../../data/internMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { usePathname } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const DashboardCandidatesSidebar = () => {
  const { menu } = useSelector((state) => state.toggle);
  const percentage = 30;

  const dispatch = useDispatch();
  const pathname = usePathname();
  // menu togggle handler
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
          {internMenuData.map((item) => (
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
        {/* End navigation */}

        {/* <div className="skills-percentage">
          <h4>Skills Percentage</h4>
          <p>
            `Put value for <strong>Cover Image</strong> field to increase your
            skill up to <strong>85%</strong>`
          </p>
          <div style={{ width: 200, height: 200, margin: "auto" }}>
            <CircularProgressbar
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#7367F0",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>{" "}
        </div> */}
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
