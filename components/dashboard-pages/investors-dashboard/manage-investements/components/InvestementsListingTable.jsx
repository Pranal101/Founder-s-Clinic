"use client";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const InvestmentListingsTable = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error("User not authenticated");
        }

        const userToken = await user.getIdToken();
        const response = await axios.get(
          "http://13.126.254.235:4000/api/user/all-investors",
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Secure API call
            },
          }
        );

        setInvestments(response.data.data); // Assuming the API response contains investments in `data.data`
      } catch (error) {
        console.error("Error fetching investments:", error);
        setError("Failed to load investments");
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchInvestments();
      } else {
        console.error("User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up the observer on unmount
  }, []);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Companies Looking for Investments</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          {loading ? (
            <p>Loading investments...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Business Name</th>
                  <th>Industry Type</th>
                  <th>Country</th>
                  <th>Funding Amount</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>

              <tbody>
                {investments.length > 0 ? (
                  investments.map((investment) => (
                    <tr key={investment._id}>
                      <td>
                        <div className="investment-block">
                          <h4>
                            <Link href={`/job-single-v2/${investment._id}`}>
                              {investment.businessName || "N/A"}
                            </Link>
                          </h4>
                        </div>
                      </td>
                      <td>{investment.industryType || "N/A"}</td>
                      <td>{investment.country || "N/A"}</td>
                      <td>
                        {investment.fundingAmount
                          ? `$${investment.fundingAmount}`
                          : "N/A"}
                      </td>
                      {/* <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button
                                onClick={() =>
                                  console.log(
                                    `View details for ${investment._id}`
                                  )
                                }
                                data-text="View Details"
                              >
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No investments found</td>
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

export default InvestmentListingsTable;
