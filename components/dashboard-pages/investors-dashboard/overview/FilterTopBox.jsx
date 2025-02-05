"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const FilterTopBox = () => {
  const [investors, setInvestors] = useState([]);
  const [displayInvestors, setDisplayInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define items per page
  const itemsPerPage = 12;

  // Fetch investors from API
  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/user/view-investors"
        );
        setInvestors(response.data.data);
        handlePageChange(1, response.data.data); // Set initial display items based on fetched data
      } catch (error) {
        console.error(
          "Error fetching investors:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  // Handle page change for pagination
  const handlePageChange = (page, investorsToDisplay = investors) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = investorsToDisplay.slice(startIndex, endIndex);
    setDisplayInvestors(pageItems);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="row">
        {displayInvestors.map((investor) => (
          <div
            className="company-block-four col-xl-3 col-lg-6 col-md-6 col-sm-12"
            key={investor._id}
          >
            <div className="inner-box">
              <h4>{investor.name}</h4>
              <ul className="job-info flex-column">
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {investor.city}, {investor.country}
                </li>
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {investor.position}
                </li>
                <li>
                  <span className="icon flaticon-phone-call"></span>
                  {investor.contactNumber}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalItems={investors.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FilterTopBox;
