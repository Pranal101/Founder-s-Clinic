// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const JobAlertsTable = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchJobs = async (user) => {
//     try {
//       const userToken = await user.getIdToken();
//       const { data } = await axios.get(
//         "http://13.126.254.235:4000/api/jobs/match-skills",
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Jobs from API:", data.jobs); // Log jobs for debugging
//       setJobs(data.jobs || []); // Set jobs (default to empty array if null)
//     } catch (error) {
//       console.error("Error fetching jobs:", error.response?.data || error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchJobs(user);
//       } else {
//         console.error("User not authenticated");
//         setLoading(false);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading spinner or message
//   }

//   return (
//     <div className="tabs-box">
//       {jobs.length === 0 ? (
//         // Display message if jobs array is empty
//         <div className="widget-title">
//           <h4>Inquiries for you</h4>
//         </div>
//       ) : (
//         // Display table when jobs are available
//         <div>
//           <div className="widget-title">
//             <h4>Inquiries for you</h4>
//           </div>
//           <div className="widget-content">
//             <div className="table-outer">
//               <table className="default-table manage-job-table">
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Posted on</th>
//                     <th>Required Skills</th>
//                     <th>Experience</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {jobs.slice(0, 6).map((item) => (
//                     <tr key={item._id}>
//                       <td>
//                         <div className="job-block">
//                           <div className="inner-box">
//                             <div className="content">
//                               <span className="company-logo">
//                                 <Image
//                                   width={50}
//                                   height={49}
//                                   src={item.logoUrl || "/default-logo.png"}
//                                   alt="logo"
//                                 />
//                               </span>
//                               <h4>
//                                 <Link href={`/job-single-v3/${item._id}`}>
//                                   {item.title}
//                                 </Link>
//                               </h4>
//                               <ul className="job-info">
//                                 <li>
//                                   <span className="icon flaticon-briefcase"></span>
//                                   {item.entityName || "Company Name"}
//                                 </li>
//                                 <li>
//                                   <span className="icon flaticon-map-locator"></span>
//                                   {item.jobLocation || "Location"}
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>{new Date(item.postedDate).toLocaleDateString()}</td>
//                       <td>
//                         {item.skillsRequired.length > 0
//                           ? item.skillsRequired.join(", ")
//                           : "Required Skills"}
//                       </td>
//                       <td>{item.experience || "Experience"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobAlertsTable;
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Pagination from "@/components/employers-listing-pages/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { addPerPage } from "@/features/filter/employerFilterSlice";

const JobAlertsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { perPage = { start: 0, end: 12 } } = useSelector(
    (state) => state.employerFilter
  );

  const fetchJobs = async (user) => {
    try {
      const userToken = await user.getIdToken();
      const { data } = await axios.get(
        "http://13.126.254.235:4000/api/jobs/match-jobs",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setJobs(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchJobs(user);
      } else {
        console.error("User not authenticated");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const displayedJobs = jobs.slice(perPage.start, perPage.end);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Inquiries for you</h4>
      </div>

      <div className="widget-content">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Posted on</th>
                  <th>Required Skills</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                {displayedJobs.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <Image
                                width={50}
                                height={49}
                                src={item.logoUrl || "/default-logo.png"}
                                alt="logo"
                              />
                            </span>
                            <h4>
                              <Link href={`/job-single-v3/${item._id}`}>
                                {item.title}
                              </Link>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{new Date(item.postedDate).toLocaleDateString()}</td>
                    <td>
                      {item.bussinessSupport?.length > 0
                        ? item.bussinessSupport.join(", ")
                        : "No skills listed"}
                    </td>
                    <td>{item.experience || "Not specified"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination totalJobs={jobs.length} />
      </div>
    </div>
  );
};

export default JobAlertsTable;
