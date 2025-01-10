"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const FilterTopBox = () => {
  const [professionals, setProfessionals] = useState([]);
  const [displayProfessionals, setDisplayProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define items per page
  const itemsPerPage = 12;

  // Function to fetch professionals
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/view-professionals"
        );
        const fetchedProfessionals = response.data.data;
        setProfessionals(fetchedProfessionals);
        handlePageChange(1, fetchedProfessionals); // Set initial display items based on fetched data
      } catch (error) {
        console.error(
          "Error fetching professionals:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  // Handle page change for pagination
  const handlePageChange = (page, professionalsToDisplay = professionals) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = professionalsToDisplay.slice(startIndex, endIndex);
    setDisplayProfessionals(pageItems);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="row">
        {displayProfessionals.map((professional) => (
          <div
            className="company-block-four col-xl-3 col-lg-6 col-md-6 col-sm-12"
            key={professional._id}
          >
            <div className="inner-box">
              <h4>*******</h4>
              <ul className="job-info flex-column">
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {professional.city}, {professional.country}
                </li>
                <li>
                  <ul className="post-tags">
                    {professional.industryExpertise}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalItems={professionals.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FilterTopBox;
