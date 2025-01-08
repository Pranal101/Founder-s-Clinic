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
"use client";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
          "https://founders-clinic-backend.onrender.com/api/jobs/all-jobs",
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Secure API call
            },
          }
        );

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

        await axios.delete(
          `https://founders-clinic-backend.onrender.com/api/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        // Update job list
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete the job. Please try again.");
      }
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job); // Open a modal with job details (state to manage modal visibility)
  };

  const updateJob = async (updatedData) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userToken = await user.getIdToken();

      const response = await axios.patch(
        `https://founders-clinic-backend.onrender.com/api/jobs/${editingJob._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Update the job list with the updated job
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === editingJob._id ? response.data.job : job
        )
      );

      setEditingJob(null); // Close the modal
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update the job. Please try again.");
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Inqueries</h4>
        {/* <div className="chosen-outer">
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 24 Months</option>
          </select>
        </div> */}
      </div>

      <div className="widget-content">
        <div className="table-outer">
          {loading ? (
            <p>Loading inqueries...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Applications</th>
                  <th>Created & Expired</th>
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
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {job.jobLocation}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="applied">
                        <a href="#">3+ Applied</a>
                      </td>
                      <td>
                        {new Date(job.expectedStartDate).toLocaleDateString()}{" "}
                        <br />
                        {new Date(job.completionTimeline).toLocaleDateString()}
                      </td>
                      <td className="status">{job.status || "Active"}</td>
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
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No inqueries found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {editingJob && (
        <div className="modal">
          {/* Modal Content for Editing Job */}
          <h4>Edit Job</h4>
          {/* Form with pre-filled job data */}
          <button onClick={() => setEditingJob(null)}>Close</button>
          <button onClick={() => updateJob({ title: "Updated Title" })}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListingsTable;
