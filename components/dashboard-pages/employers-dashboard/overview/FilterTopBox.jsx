// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Pagination from "./Pagination";

// const FilterTopBox = () => {
//   const [items, setItems] = useState([]);
//   const [displayItems, setDisplayItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get(
//           "https://founders-clinic-backend.onrender.com/api/user/view-enterprises"
//         );
//         console.log("Fetched Data:", response.data.data); // Debugging
//         setItems(response.data.data); // Correctly access the `data` field
//       } catch (error) {
//         console.error(
//           "Error fetching enterprises:",
//           error.response?.data || error
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const handlePageChange = (page) => {
//     const startIndex = (page - 1) * 12;
//     const endIndex = startIndex + 12;
//     const pageItems = items.slice(startIndex, endIndex);
//     console.log("Page Items:", pageItems); // Debugging
//     setDisplayItems(pageItems);
//   };

//   useEffect(() => {
//     handlePageChange(1);
//   }, [items]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <div className="row">
//         {displayItems.map((item) => (
//           <div
//             className="company-block-four col-xl-3 col-lg-6 col-md-6 col-sm-12"
//             key={item._id}
//           >
//             <div className="inner-box">
//               <figure className="image">
//                 <a
//                   href={item.websiteLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <img src={item.logoUrl} alt={item.entityName} />
//                 </a>
//               </figure>
//               <h4>
//                 <a
//                   href={item.websiteLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {item.entityName}
//                 </a>
//               </h4>
//               <ul className="job-info flex-column">
//                 <li>
//                   <span className="icon flaticon-map-locator"></span>
//                   {item.city}, {item.country}
//                 </li>
//                 <li>
//                   <span className="icon flaticon-briefcase"></span>
//                   {item.businessType}
//                 </li>
//                 <li>
//                   <span className="icon flaticon-user"></span>
//                   Team Size: {item.teamSize}
//                 </li>
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Pagination
//         totalItems={items.length}
//         itemsPerPage={12}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default FilterTopBox;
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Pagination from "./Pagination";

const FilterTopBox = () => {
  const [items, setItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/user/view-enterprises"
        );
        setItems(response.data.data || []);
      } catch (error) {
        console.error(
          "Error fetching enterprises:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayItems(items.slice(startIndex, endIndex));
  };

  useEffect(() => {
    handlePageChange(1);
  }, [items]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="row">
        {displayItems.map((item) => (
          <div
            className="company-block-four col-xl-4 col-lg-6 col-md-6 col-sm-12" //changed col-xl-3
            key={item._id}
          >
            <div className="inner-box">
              {/* <figure className="image">
                <a
                  href={item.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.logoUrl} alt={item.entityName} />
                </a>
              </figure> */}
              <h4>
                <Link href={`/company-details/${item._id}`}>
                  {item.entityName}
                </Link>
              </h4>
              <ul className="job-info flex-column">
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.city}, {item.country}
                </li>
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.businessType}
                </li>
                <li>
                  <span className="icon flaticon-user"></span>
                  Team Size: {item.teamSize}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FilterTopBox;
