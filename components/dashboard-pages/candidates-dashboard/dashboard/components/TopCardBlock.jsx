// const TopCardBlock = () => {
//   const cardContent = [
//     {
//       id: 1,
//       icon: "flaticon-briefcase",
//       countNumber: "22",
//       metaName: "Inqueries Responded",
//       uiClass: "ui-blue",
//     },
//     {
//       id: 2,
//       icon: "la-file-invoice",
//       countNumber: "9382",
//       metaName: "Proposal Alerts",
//       uiClass: "ui-red",
//     },
//     {
//       id: 3,
//       icon: "la-comment-o",
//       countNumber: "74",
//       metaName: "Messages",
//       uiClass: "ui-yellow",
//     },
//     {
//       id: 4,
//       icon: "la-bookmark-o",
//       countNumber: "32",
//       metaName: "Shortlisted Inqueries",
//       uiClass: "ui-green",
//     },
//   ];

//   return (
//     <>
//       {cardContent.map((item) => (
//         <div
//           className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
//           key={item.id}
//         >
//           <div className={`ui-item ${item.uiClass}`}>
//             <div className="left">
//               <i className={`icon la ${item.icon}`}></i>
//             </div>
//             <div className="right">
//               <h4>{item.countNumber}</h4>
//               <p>{item.metaName}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default TopCardBlock;
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth

const TopCardBlock = () => {
  const [jobCount, setJobCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);

  // Fetch job count
  const fetchJobCount = async () => {
    try {
      const response = await axios.get(
        "http://13.126.254.235:4000/api/jobs/jobs-count"
      ); // Adjust API route if necessary
      setJobCount(response.data.count);
    } catch (error) {
      console.error("Error fetching job count:", error);
    }
  };

  // Fetch inquiries count for the logged-in user
  const fetchInquiriesCount = async (user) => {
    try {
      const userToken = await user.getIdToken();
      const response = await axios.get(
        "http://13.126.254.235:4000/api/user/inquiries-count", // Adjust API route if necessary
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setInquiriesCount(response.data.count);
    } catch (error) {
      console.error("Error fetching inquiries count:", error);
    }
  };

  useEffect(() => {
    // Firebase authentication state change listener
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchJobCount(); // Fetch job count once
        fetchInquiriesCount(user); // Fetch inquiries count for logged-in user
      } else {
        console.error("User not authenticated");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: inquiriesCount, // Dynamically display inquiries count
      metaName: "Inquiries Responded",
      uiClass: "ui-blue",
      route: "/candidates-dashboard/applied-jobs",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: jobCount, // Dynamically display job count
      metaName: "All Proposals",
      uiClass: "ui-red",
      route: "/candidates-dashboard/job-alerts",
    },
    {
      id: 3,
      icon: "la-comment-o",
      countNumber: "74",
      metaName: "Messages",
      uiClass: "ui-yellow",
      route: "/candidates-dashboard/messages",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: "32",
      metaName: "Shortlisted Inquiries",
      uiClass: "ui-green",
      route: "/candidates-dashboard/short-listed-jobs",
    },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
          style={{ cursor: "pointer" }}
        >
          <Link href={item.route}>
            <div className={`ui-item ${item.uiClass}`}>
              <div className="left">
                <i className={`icon la ${item.icon}`}></i>
              </div>
              <div className="right">
                <h4>{item.countNumber}</h4>
                <p>{item.metaName}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
