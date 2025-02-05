"use client";

import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const WidgetContentBox = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applicants when the user is authenticated
  useEffect(() => {
    const fetchApplicants = async (user) => {
      try {
        const userToken = await user.getIdToken();

        const { data } = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/user/applicants",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );

        setApplicants(data.applicants || []);
      } catch (error) {
        console.error("Error fetching applicants:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchApplicants(user);
      } else {
        setApplicants([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userToken = await user.getIdToken();

        const response = await axios.put(
          `https://founders-clinic-backend.onrender.com/api/user/${applicationId}/status`,
          { status },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );

        const updatedApplicants = applicants.map((applicant) =>
          applicant.applicationId === applicationId
            ? { ...applicant, status: response.data.application.status }
            : applicant
        );
        setApplicants(updatedApplicants);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!applicants.length) {
    return <div>No applicants found.</div>;
  }

  // Filtered applicants
  const approvedApplicants = applicants.filter(
    (applicant) => applicant.status === "approved"
  );
  const rejectedApplicants = applicants.filter(
    (applicant) => applicant.status === "rejected"
  );

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>Senior Product Designer</h6>

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals">
                Total Applicants: {applicants.length}
              </Tab>
              <Tab className="tab-btn approved">
                Approved: {approvedApplicants.length}
              </Tab>
              <Tab className="tab-btn rejected">
                Rejected: {rejectedApplicants.length}
              </Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            {/* Total Applicants Tab */}
            <TabPanel>
              <div className="row">
                {applicants.map((candidate) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidate.applicationId}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <Image
                            width={90}
                            height={90}
                            src={"/default-avatar.png"} // No avatar in structure, using default
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link
                            href={`/candidates-single-v1/${candidate.applicantId}`}
                          >
                            {candidate.applicant?.name || "Anonymous"}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {candidate.applicant?.role || "N/A"}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidate.applicant?.city || "Unknown"},{" "}
                            {candidate.applicant?.country || ""}
                          </li>
                          <li>
                            <span className="icon flaticon-mail"></span>{" "}
                            {candidate.applicant?.email || "No Email"}
                          </li>
                          <li>
                            <span className="icon flaticon-briefcase"></span>{" "}
                            {candidate.applicant?.experienceYears || "0"} years
                            experience
                          </li>
                        </ul>

                        <ul className="post-tags">
                          {candidate.applicant?.portfolio && (
                            <li>
                              <a
                                href={candidate.applicant.portfolio}
                                target="_blank"
                              >
                                Portfolio
                              </a>
                            </li>
                          )}
                          {candidate.applicant?.website && (
                            <li>
                              <a
                                href={candidate.applicant.website}
                                target="_blank"
                              >
                                Website
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Application">
                              <span className="la la-eye"></span>
                            </button>
                          </li>

                          {candidate.status === "Pending" && (
                            <>
                              <li>
                                <button
                                  data-text="Approve Application"
                                  onClick={() =>
                                    handleStatusChange(
                                      candidate.applicationId,
                                      "approved"
                                    )
                                  }
                                >
                                  <span className="la la-check"></span>
                                </button>
                              </li>
                              <li>
                                <button
                                  data-text="Reject Application"
                                  onClick={() =>
                                    handleStatusChange(
                                      candidate.applicationId,
                                      "rejected"
                                    )
                                  }
                                >
                                  <span className="la la-times-circle"></span>
                                </button>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>

            {/* Approved Applicants Tab */}
            <TabPanel>
              <div className="row">
                {approvedApplicants.map((candidate) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidate.applicationId}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <Image
                            width={90}
                            height={90}
                            src={candidate.avatar || "/default-avatar.png"}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link
                            href={`/candidates-single-v1/${candidate.applicantId}`}
                          >
                            {candidate.applicant.name || "Anonymous"}
                          </Link>
                        </h4>
                        <ul className="candidate-info">
                          <li className="designation">
                            {candidate.applicant?.role || "N/A"}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidate.applicant?.city || "Unknown"},{" "}
                            {candidate.applicant?.country || ""}
                          </li>
                          <li>
                            <span className="icon flaticon-mail"></span>{" "}
                            {candidate.applicant?.email || "No Email"}
                          </li>
                          <li>
                            <span className="icon flaticon-briefcase"></span>{" "}
                            {candidate.applicant?.experienceYears || "0"} years
                            experience
                          </li>
                        </ul>

                        <ul className="post-tags">
                          {candidate.applicant?.portfolio && (
                            <li>
                              <a
                                href={candidate.applicant.portfolio}
                                target="_blank"
                              >
                                Portfolio
                              </a>
                            </li>
                          )}
                          {candidate.applicant?.website && (
                            <li>
                              <a
                                href={candidate.applicant.website}
                                target="_blank"
                              >
                                Website
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>

            {/* Rejected Applicants Tab */}
            <TabPanel>
              <div className="row">
                {rejectedApplicants.map((candidate) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidate.applicationId}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <Image
                            width={90}
                            height={90}
                            src={candidate.avatar || "/default-avatar.png"}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link
                            href={`/candidates-single-v1/${candidate.applicantId}`}
                          >
                            {candidate.applicant.name || "Anonymous"}
                          </Link>
                        </h4>
                        <ul className="candidate-info">
                          <li className="designation">
                            {candidate.applicant?.role || "N/A"}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidate.applicant?.city || "Unknown"},{" "}
                            {candidate.applicant?.country || ""}
                          </li>
                          <li>
                            <span className="icon flaticon-mail"></span>{" "}
                            {candidate.applicant?.email || "No Email"}
                          </li>
                          <li>
                            <span className="icon flaticon-briefcase"></span>{" "}
                            {candidate.applicant?.experienceYears || "0"} years
                            experience
                          </li>
                        </ul>

                        <ul className="post-tags">
                          {candidate.applicant?.portfolio && (
                            <li>
                              <a
                                href={candidate.applicant.portfolio}
                                target="_blank"
                              >
                                Portfolio
                              </a>
                            </li>
                          )}
                          {candidate.applicant?.website && (
                            <li>
                              <a
                                href={candidate.applicant.website}
                                target="_blank"
                              >
                                Website
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetContentBox;
