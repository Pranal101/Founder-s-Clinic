// import Link from "next/link";
// import jobs from "../../../../../data/job-featured.js";
// import Image from "next/image.js";

// const JobListingsTable = () => {
//   return (
//     <div className="tabs-box">
//       <div className="widget-title">
//         <h4>My Job Listings</h4>

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
//           <table className="default-table manage-job-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Applications</th>
//                 <th>Created & Expired</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {jobs.slice(0, 4).map((item) => (
//                 <tr key={item.id}>
//                   <td>
//                     {/* <!-- Job Block --> */}
//                     <div className="job-block">
//                       <div className="inner-box">
//                         <div className="content">
//                           <span className="company-logo">
//                             <Image
//                               width={50}
//                               height={49}
//                               src={item.logo}
//                               alt="logo"
//                             />
//                           </span>
//                           <h4>
//                             <Link href={`/job-single-v3/${item.id}`}>
//                               {item.jobTitle}
//                             </Link>
//                           </h4>
//                           <ul className="job-info">
//                             <li>
//                               <span className="icon flaticon-briefcase"></span>
//                               Segment
//                             </li>
//                             <li>
//                               <span className="icon flaticon-map-locator"></span>
//                               London, UK
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="applied">
//                     <a href="#">3+ Applied</a>
//                   </td>
//                   <td>
//                     October 27, 2017 <br />
//                     April 25, 2011
//                   </td>
//                   <td className="status">Active</td>
//                   <td>
//                     <div className="option-box">
//                       <ul className="option-list">
//                         <li>
//                           <button data-text="View Aplication">
//                             <span className="la la-eye"></span>
//                           </button>
//                         </li>
//                         <li>
//                           <button data-text="Reject Aplication">
//                             <span className="la la-pencil"></span>
//                           </button>
//                         </li>
//                         <li>
//                           <button data-text="Delete Aplication">
//                             <span className="la la-trash"></span>
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {/* End table widget content */}
//     </div>
//   );
// };

// export default JobListingsTable;
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const JobListingsTable = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editingJob, setEditingJob] = useState(null);

//   useEffect(() => {
//     const fetchUserJobs = async () => {
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (!user) {
//           throw new Error("User not authenticated");
//         }

//         const userToken = await user.getIdToken();
//         const response = await axios.get(
//           "http://13.126.254.235:4000/api/jobs/all-jobs",
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`, // Secure API call
//             },
//           }
//         );

//         setJobs(response.data.jobs);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//         setError("Failed to load job listings");
//       } finally {
//         setLoading(false);
//       }
//     };
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchUserJobs(user);
//       } else {
//         console.error("User not authenticated");
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe(); // Clean up the observer on unmount
//   }, []);
//   const handleDeleteJob = async (jobId) => {
//     if (confirm("Are you sure you want to delete this job?")) {
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;
//         const userToken = await user.getIdToken();

//         await axios.delete(
//           `http://13.126.254.235:4000/api/jobs/${jobId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//             },
//           }
//         );

//         // Update job list
//         setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
//       } catch (error) {
//         console.error("Error deleting job:", error);
//         alert("Failed to delete the job. Please try again.");
//       }
//     }
//   };

//   const handleEditJob = (job) => {
//     setEditingJob(job); // Open a modal with job details (state to manage modal visibility)
//   };

//   const updateJob = async (updatedData) => {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       const userToken = await user.getIdToken();

//       const response = await axios.patch(
//         `http://13.126.254.235:4000/api/jobs/${editingJob._id}`,
//         updatedData,
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );

//       // Update the job list with the updated job
//       setJobs((prevJobs) =>
//         prevJobs.map((job) =>
//           job._id === editingJob._id ? response.data.job : job
//         )
//       );

//       setEditingJob(null); // Close the modal
//     } catch (error) {
//       console.error("Error updating job:", error);
//       alert("Failed to update the job. Please try again.");
//     }
//   };

//   return (
//     <div className="tabs-box">
//       <div className="widget-title">
//         <h4>My Inqueries</h4>
//         {/* <div className="chosen-outer">
//           <select className="chosen-single form-select">
//             <option>Last 6 Months</option>
//             <option>Last 12 Months</option>
//             <option>Last 24 Months</option>
//           </select>
//         </div> */}
//       </div>

//       <div className="widget-content">
//         <div className="table-outer">
//           {loading ? (
//             <p>Loading inqueries...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : (
//             <table className="default-table manage-job-table">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Applications</th>
//                   <th>Created & Expired</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {jobs.length > 0 ? (
//                   jobs.map((job) => (
//                     <tr key={job._id}>
//                       <td>
//                         <div className="job-block">
//                           <div className="inner-box">
//                             <div className="content">
//                               <span className="company-logo">
//                                 <Image
//                                   width={50}
//                                   height={49}
//                                   src={
//                                     job.logoUrl || "/images/default-logo.png"
//                                   }
//                                   alt="logo"
//                                 />
//                               </span>
//                               <h4>
//                                 <Link href={`/job-single-v3/${job._id}`}>
//                                   {job.title}
//                                 </Link>
//                               </h4>
//                               <ul className="job-info">
//                                 <li>
//                                   <span className="icon flaticon-briefcase"></span>
//                                   {job.entityName}
//                                 </li>
//                                 <li>
//                                   <span className="icon flaticon-map-locator"></span>
//                                   {job.jobLocation}
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="applied">
//                         <a href="#">3+ Applied</a>
//                       </td>
//                       <td>
//                         {new Date(job.expectedStartDate).toLocaleDateString()}{" "}
//                         <br />
//                         {new Date(job.completionTimeline).toLocaleDateString()}
//                       </td>
//                       <td className="status">{job.status || "Active"}</td>
//                       <td>
//                         <div className="option-box">
//                           <ul className="option-list">
//                             <li>
//                               <button
//                                 onClick={() => handleDeleteJob(job._id)}
//                                 data-text="Delete Application"
//                               >
//                                 <span className="la la-trash"></span>
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5">No inqueries found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//       {editingJob && (
//         <div className="modal">
//           {/* Modal Content for Editing Job */}
//           <h4>Edit Job</h4>
//           {/* Form with pre-filled job data */}
//           <button onClick={() => setEditingJob(null)}>Close</button>
//           <button onClick={() => updateJob({ title: "Updated Title" })}>
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobListingsTable;
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const JobListingsTable = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUserJobs = async () => {
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (!user) {
//           throw new Error("User not authenticated");
//         }

//         const userToken = await user.getIdToken();
//         const response = await axios.get(
//           "http://13.126.254.235:4000/api/jobs/all-jobs",
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//             },
//           }
//         );

//         setJobs(response.data.jobs);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//         setError("Failed to load job listings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchUserJobs(user);
//       } else {
//         console.error("User not authenticated");
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleToggleJobStatus = async (jobId) => {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       const userToken = await user.getIdToken();

//       const response = await axios.patch(
//         `http://13.126.254.235:4000/api/jobs/toggle-status/${jobId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );

//       // Update job list
//       setJobs((prevJobs) =>
//         prevJobs.map((job) =>
//           job._id === jobId
//             ? { ...job, isClosed: response.data.job.isClosed }
//             : job
//         )
//       );

//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error toggling job status:", error);
//       alert("Failed to update job status. Please try again.");
//     }
//   };

//   return (
//     <div className="tabs-box">
//       <div className="widget-title">
//         <h4>My Inqueries</h4>
//       </div>

//       <div className="widget-content">
//         <div className="table-outer">
//           {loading ? (
//             <p>Loading inqueries...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : (
//             <table className="default-table manage-job-table">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Applications</th>
//                   <th>Created & Expired</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {jobs.length > 0 ? (
//                   jobs.map((job) => (
//                     <tr key={job._id}>
//                       <td>
//                         <div className="job-block">
//                           <div className="inner-box">
//                             <div className="content">
//                               <span className="company-logo">
//                                 <Image
//                                   width={50}
//                                   height={49}
//                                   src={
//                                     job.logoUrl || "/images/default-logo.png"
//                                   }
//                                   alt="logo"
//                                 />
//                               </span>
//                               <h4>
//                                 <Link href={`/job-single-v3/${job._id}`}>
//                                   {job.title}
//                                 </Link>
//                               </h4>
//                               <ul className="job-info">
//                                 <li>
//                                   <span className="icon flaticon-briefcase"></span>
//                                   {job.entityName}
//                                 </li>
//                                 <li>
//                                   <span className="icon flaticon-map-locator"></span>
//                                   {job.jobLocation}
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="applied">
//                         <a href="#">3+ Applied</a>
//                       </td>
//                       <td>
//                         {new Date(job.expectedStartDate).toLocaleDateString()}{" "}
//                         <br />
//                         {new Date(job.completionTimeline).toLocaleDateString()}
//                       </td>
//                       <td className="status">
//                         {job.isClosed ? "Closed" : "Active"}
//                       </td>
//                       <td>
//                         <div className="option-box">
//                           <ul className="option-list">
//                             <li>
//                               <button
//                                 data-text={
//                                   job.isClosed ? "Reopen Job" : "Close Job"
//                                 }
//                                 onClick={() => handleToggleJobStatus(job._id)}
//                               >
//                                 <span
//                                   className={
//                                     job.isClosed
//                                       ? "la la-check-circle"
//                                       : "la la-times-circle"
//                                   }
//                                 ></span>
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5">No inqueries found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobListingsTable;
"use client";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const JobListingsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error("User not authenticated");
        }

        const userToken = await user.getIdToken();
        const response = await axios.get(
          "http://13.126.254.235:4000/api/jobs/all-jobs",
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Secure API call
            },
          }
        );
        console.log("Fetched Jobs:", response.data.jobs);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load job listings");
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserJobs(user);
      } else {
        console.error("User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up the observer on unmount
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const userToken = await user.getIdToken();

        await axios.delete(`http://13.126.254.235:4000/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        // Update job list
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete the job. Please try again.");
      }
    }
  };

  const handleToggleJobStatus = async (jobId, currentStatus) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userToken = await user.getIdToken();

      // Toggle job status (from open to closed or vice versa)
      const newStatus = currentStatus === "Open" ? "Closed" : "Open";

      const response = await axios.patch(
        `http://13.126.254.235:4000/api/jobs/${jobId}`,
        { isClosed: newStatus === "Closed" },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Update job list with new status
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isClosed: newStatus === "Closed" } : job
        )
      );
      toast.success("Job status updated!");
    } catch (error) {
      console.error("Error toggling job status:", error);
      toast.error("Failed to update the job status. Please try again.");
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Inquiries</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          {loading ? (
            <p>Loading inquiries...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Applications</th>
                  <th>Created & Expired</th>
                  <th>Inquiry Status</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job._id}>
                      <td>
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <Image
                                  width={50}
                                  height={49}
                                  src={
                                    job.logoUrl || "/images/default-logo.png"
                                  }
                                  alt="logo"
                                />
                              </span>
                              <h4>
                                <Link href={`/job-single-v3/${job._id}`}>
                                  {job.title}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {job.entityName}
                                </li>
                                {/* <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {job.jobLocation}
                                </li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="applied">
                        <a
                          href="/employers-dashboard/all-applicants"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default navigation
                            localStorage.setItem("selectedJobId", job._id); // Store job ID in localStorage
                            window.location.href =
                              "/employers-dashboard/all-applicants"; // Redirect to the new page
                          }}
                        >
                          View Applied
                        </a>
                      </td>
                      <td>
                        {new Date(job.expectedStartDate).toLocaleDateString()}{" "}
                        <br />
                        {new Date(job.completionTimeline).toLocaleDateString()}
                      </td>
                      <td className="job-status">
                        {job.isClosed ? "Closed" : "Open"}
                      </td>
                      <td className="status">
                        {job.isApproved ? "Approved" : "Pending"}
                      </td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button
                                onClick={() => handleDeleteJob(job._id)}
                                data-text="Delete Application"
                              >
                                <span className="la la-trash"></span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  handleToggleJobStatus(
                                    job._id,
                                    job.isClosed ? "Closed" : "Open"
                                  )
                                }
                                data-text={
                                  job.isClosed ? "Reopen Job" : "Close Job"
                                }
                              >
                                <span
                                  className={`la ${
                                    job.isClosed
                                      ? "la-check"
                                      : "la-times-circle"
                                  }`}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No inquiries found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
