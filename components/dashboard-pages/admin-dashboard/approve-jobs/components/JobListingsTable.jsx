"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const JobListingsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async (user) => {
      try {
        const userToken = await user.getIdToken();

        const { data } = await axios.get(
          "http://13.126.254.235:4000/api/admin/jobs",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setJobs(data.jobs); // Update to set jobs
      } catch (error) {
        console.error("Error fetching jobs:", error.response || error);
        toast.error("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchJobs(user);
      } else {
        setJobs([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (jobId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userToken = await user.getIdToken();

      const { data } = await axios.patch(
        `http://13.126.254.235:4000/api/admin/jobs/${jobId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // Update job status locally
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isApproved: true } : job
        )
      );

      toast.success(data.message || "Job approved successfully!");
    } catch (error) {
      console.error("Error approving job:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to approve job.");
    }
  };

  const handleReject = async (jobId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userToken = await user.getIdToken();

      const { data } = await axios.patch(
        `http://13.126.254.235:4000/api/admin/jobs/${jobId}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // Update job status locally
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isApproved: false } : job
        )
      );

      toast.success(data.message || "Job rejected successfully!");
    } catch (error) {
      console.error("Error rejecting job:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to reject job.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobs.length) {
    return <div>No jobs found.</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>All Inquiries</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Experience</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            {job.logoUrl && (
                              <Image
                                width={50}
                                height={50}
                                src={job.logoUrl}
                                alt={`${job.entityName} logo`}
                              />
                            )}
                          </span>
                          <h4>
                            <Link href={`/job-single-v3/${job._id}`}>
                              {job.title}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{job.entityName}</td>
                  <td>{job.experience}</td>
                  <td>{job.budget || "Not specified"}</td>
                  <td className="status">
                    {job.isApproved ? "Approved" : "Pending"}
                  </td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        {!job.isApproved && (
                          <li>
                            <button
                              onClick={() => handleApprove(job._id)}
                              data-text="Approve"
                            >
                              <span className="la la-check"></span>
                            </button>
                          </li>
                        )}
                        {job.isApproved && (
                          <li>
                            <button
                              onClick={() => handleReject(job._id)}
                              data-text="Reject"
                            >
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                        )}
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
