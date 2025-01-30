// import Link from "next/link.js";
// import jobs from "../../../../../data/job-featured.js";
// import Image from "next/image.js";

// const JobListingsTable = () => {
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
//                   <th>Job Title</th>
//                   <th>Date Applied</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {jobs.slice(0, 4).map((item) => (
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
//                     <td>Dec 5, 2020</td>
//                     <td className="status">Active</td>
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

// export default JobListingsTable;
"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const JobListingsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async (user) => {
      try {
        const userToken = await user.getIdToken();

        const { data } = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/user/applied-jobs",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchApplications(user);
      } else {
        setApplications([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!applications.length) {
    return <div>No inquiries found.</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Inquiries</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Inquiry Title</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            {app.job.logoUrl && (
                              <Image
                                width={50}
                                height={49}
                                src={app.job.logoUrl}
                                alt="logo"
                              />
                            )}
                          </span>
                          <h4>
                            <Link href={`/job-single-v3/${app.job._id}`}>
                              {app.job.title}
                            </Link>
                          </h4>
                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              {app.job.location}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                  <td className="status">{app.status}</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button data-text="View Application">
                            <span className="la la-eye"></span>
                          </button>
                        </li>
                        <li>
                          <button data-text="Delete Application">
                            <span className="la la-trash"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
