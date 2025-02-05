"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const FilterTopBox = () => {
  const [networkingCommunities, setNetworkingCommunities] = useState([]);
  const [displayNetworkingCommunities, setDisplayNetworkingCommunities] =
    useState([]);
  const [loading, setLoading] = useState(true);

  // Define items per page
  const itemsPerPage = 12;

  // Fetch networking community profiles from API
  useEffect(() => {
    const fetchNetworkingCommunities = async () => {
      try {
        const response = await axios.get(
          "http://13.126.254.235:4000/api/user/view-networking"
        );
        setNetworkingCommunities(response.data.data);
        handlePageChange(1, response.data.data); // Set initial display items based on fetched data
      } catch (error) {
        console.error(
          "Error fetching networking communities:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkingCommunities();
  }, []);

  // Handle page change for pagination
  const handlePageChange = (
    page,
    networkingCommunitiesToDisplay = networkingCommunities
  ) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = networkingCommunitiesToDisplay.slice(
      startIndex,
      endIndex
    );
    setDisplayNetworkingCommunities(pageItems);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="row">
        {displayNetworkingCommunities.map((community) => (
          <div
            className="company-block-four col-xl-3 col-lg-6 col-md-6 col-sm-12"
            key={community._id}
          >
            <div className="inner-box">
              <h4>{community.communityName}</h4>
              <ul className="job-info flex-column">
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {community.city}, {community.country}
                </li>
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {community.primaryFocus.join(", ")}
                </li>
                <li>
                  <span className="icon flaticon-phone-call"></span>
                  {community.contactNumber}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalItems={networkingCommunities?.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FilterTopBox;
