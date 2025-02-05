// import Link from "next/link";
// import recentJobApplied from "../../../../../data/job-featured";
// import Image from "next/image";

// const JobApplied = () => {
//   return (
//     <>
//       {recentJobApplied.slice(0, 6).map((item) => (
//         <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id}>
//           <div className="inner-box">
//             <div className="content">
//               <span className="company-logo">
//                 <Image
//                   width={50}
//                   height={49}
//                   src={item.logo}
//                   alt="item brand"
//                 />
//               </span>
//               <h4>
//                 <Link href={`/job-single-v1/${item.id}`}>{item.jobTitle}</Link>
//               </h4>

//               <ul className="job-info">
//                 <li>
//                   <span className="icon flaticon-briefcase"></span>
//                   {item.company}
//                 </li>
//                 {/* compnay info */}
//                 <li>
//                   <span className="icon flaticon-map-locator"></span>
//                   {item.location}
//                 </li>
//                 {/* location info */}
//                 <li>
//                   <span className="icon flaticon-clock-3"></span> {item.time}
//                 </li>
//                 {/* time info */}
//                 <li>
//                   <span className="icon flaticon-money"></span> {item.salary}
//                 </li>
//                 {/* salary info */}
//               </ul>
//               {/* End .job-info */}

//               <ul className="job-other-info">
//                 {item.jobType.map((val, i) => (
//                   <li key={i} className={`${val.styleClass}`}>
//                     {val.type}
//                   </li>
//                 ))}
//               </ul>
//               {/* End .job-other-info */}

//               <button className="bookmark-btn">
//                 <span className="flaticon-bookmark"></span>
//               </button>
//             </div>
//           </div>
//         </div>
//         // End job-block
//       ))}
//     </>
//   );
// };

// export default JobApplied;
// import Link from "next/link.js";
// import jobs from "../../../../../data/job-featured.js";
// import Image from "next/image.js";

// const JobAlertsTable = () => {
//   return (
//     <div className="tabs-box">
//       <div className="widget-title">
//         <h4>My Applied Jobs</h4>

//         <div className="chosen-outer">
//           {/* <!--Tabs Box--> */}
//           <select className="chosen-single form-select">
//             <option>Last 6 Months</option>
//             <option>Last 12 Months</option>
//             <option>Last 16 Months</option>
//             <option>Last 24 Months</option>
//             <option>Last 5 year</option>
//           </select>
//         </div>
//       </div>
//       {/* End filter top bar */}

//       {/* Start table widget content */}
//       <div className="widget-content">
//         <div className="table-outer">
//           <div className="table-outer">
//             <table className="default-table manage-job-table">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Criteria</th>
//                   <th>Created</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {jobs.slice(4, 8).map((item) => (
//                   <tr key={item.id}>
//                     <td>
//                       {/* <!-- Job Block --> */}
//                       <div className="job-block">
//                         <div className="inner-box">
//                           <div className="content">
//                             <span className="company-logo">
//                               <Image
//                                 width={50}
//                                 height={49}
//                                 src={item.logo}
//                                 alt="logo"
//                               />
//                             </span>
//                             <h4>
//                               <Link href={`/job-single-v3/${item.id}`}>
//                                 {item.jobTitle}
//                               </Link>
//                             </h4>
//                             <ul className="job-info">
//                               <li>
//                                 <span className="icon flaticon-briefcase"></span>
//                                 Segment
//                               </li>
//                               <li>
//                                 <span className="icon flaticon-map-locator"></span>
//                                 London, UK
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>Human Resources, Junior</td>
//                     <td>Nov 12, 2021 </td>
//                     <td>
//                       <div className="option-box">
//                         <ul className="option-list">
//                           <li>
//                             <button data-text="View Aplication">
//                               <span className="la la-eye"></span>
//                             </button>
//                           </li>
//                           <li>
//                             <button data-text="Delete Aplication">
//                               <span className="la la-trash"></span>
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       {/* End table widget content */}
//     </div>
//   );
// };

// export default JobAlertsTable;
// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import Pagination from "@/components/employers-listing-pages/components/Pagination";
// import { useDispatch, useSelector } from "react-redux";
// import { addPerPage } from "@/features/filter/employerFilterSlice";

// const JobAlertsTable = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const { perPage = { start: 0, end: 12 } } = useSelector(
//     (state) => state.employerFilter
//   );

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
//       setJobs(data.jobs);
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

//   const displayedJobs = jobs.slice(perPage.start, perPage.end);

//   return (
//     <div className="tabs-box">
//       <div className="widget-title">
//         <h4>Projects for you</h4>
//       </div>

//       <div className="widget-content">
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <div className="table-outer">
//             <table className="default-table manage-job-table">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   {/* <th>Criteria</th> */}
//                   <th>Posted on</th>
//                   <th>Required Skills</th>
//                   <th>Experience</th>
//                   {/* <th>Action</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {displayedJobs.map((item) => (
//                   <tr key={item._id}>
//                     <td>
//                       <div className="job-block">
//                         <div className="inner-box">
//                           <div className="content">
//                             <span className="company-logo">
//                               <Image
//                                 width={50}
//                                 height={49}
//                                 src={item.logoUrl || "/default-logo.png"}
//                                 alt="logo"
//                               />
//                             </span>
//                             <h4>
//                               <Link href={`/job-single-v3/${item._id}`}>
//                                 {item.title}
//                               </Link>
//                             </h4>
//                             <ul className="job-info">
//                               <li>
//                                 <span className="icon flaticon-briefcase"></span>
//                                 {item.entityName || "Company Name"}
//                               </li>
//                               <li>
//                                 <span className="icon flaticon-map-locator"></span>
//                                 {item.jobLocation || "Location"}
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     {/* <td>{item.criteria || "Human Resources, Junior"}</td> */}
//                     <td>{new Date(item.postedDate).toLocaleDateString()}</td>
//                     <td>
//                       {item.skillsRequired.length > 0
//                         ? item.skillsRequired.join(", ")
//                         : "Required Skills"}
//                     </td>

//                     <td>{item.experience || "Experience"}</td>
//                     {/* <td>
//                       <div className="option-box">
//                         <ul className="option-list">
//                           <li>
//                             <button data-text="View Application">
//                               <span className="la la-eye"></span>
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         <Pagination totalJobs={jobs.length} />
//       </div>
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
                      {item.skills?.length > 0
                        ? item.skills.join(", ")
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
