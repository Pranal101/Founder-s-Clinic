// const PackageDataTable = () => {
//   return (
//     <table className="default-table manage-job-table">
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Transaction id</th>
//           <th>Package</th>
//           <th>Expiry</th>
//           <th>Total Jobs/CVs</th>
//           <th>Used</th>
//           <th>Remaining</th>
//           <th>Status</th>
//         </tr>
//       </thead>

//       <tbody>
//         <tr>
//           <td>1</td>
//           <td className="trans-id">#593677663</td>
//           <td className="package">
//             <a href="#">Super CV Pack</a>
//           </td>
//           <td className="expiry">Jan 11, 2021</td>
//           <td className="total-jobs">50</td>
//           <td className="used">8</td>
//           <td className="remaining">42</td>
//           <td className="status">Active</td>
//         </tr>
//         {/* End tr */}

//         <tr>
//           <td>2</td>
//           <td className="trans-id">#593677663</td>
//           <td className="package">
//             <a href="#">Gold Jobs package</a>
//           </td>
//           <td className="expiry">Jan 11, 2021</td>
//           <td className="total-jobs">50</td>
//           <td className="used">8</td>
//           <td className="remaining">42</td>
//           <td className="status">Active</td>
//         </tr>
//         {/* End tr */}

//         <tr>
//           <td>3</td>
//           <td className="trans-id">#593677663</td>
//           <td className="package">
//             <a href="#">Silver Jobs package</a>
//           </td>
//           <td className="expiry">Jan 11, 2021</td>
//           <td className="total-jobs">50</td>
//           <td className="used">8</td>
//           <td className="remaining">42</td>
//           <td className="status">Active</td>
//         </tr>
//         {/* End tr */}

//         <tr>
//           <td>4</td>
//           <td className="trans-id">#593677663</td>
//           <td className="package">
//             <a href="#">Super CV Pack</a>
//           </td>
//           <td className="expiry">Jan 11, 2021</td>
//           <td className="total-jobs">50</td>
//           <td className="used">8</td>
//           <td className="remaining">42</td>
//           <td className="status">Active</td>
//         </tr>
//         {/* End tr */}

//         <tr>
//           <td>5</td>
//           <td className="trans-id">#593677663</td>
//           <td className="package">
//             <a href="#">Gold Jobs package</a>
//           </td>
//           <td className="expiry">Jan 11, 2021</td>
//           <td className="total-jobs">50</td>
//           <td className="used">8</td>
//           <td className="remaining">42</td>
//           <td className="status">Active</td>
//         </tr>
//         {/* End tr */}

//         <tr>
//           <td>6</td>
//           <td className="trans-id">#593677663</td>
//           <td className="package">
//             <a href="#">Silver Jobs package</a>
//           </td>
//           <td className="expiry">Jan 11, 2021</td>
//           <td className="total-jobs">50</td>
//           <td className="used">8</td>
//           <td className="remaining">42</td>
//           <td className="status">Active</td>
//         </tr>
//         {/* End tr */}
//       </tbody>
//     </table>
//   );
// };

// export default PackageDataTable;
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Pricing = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subscriptions from the server
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "https://founders-clinic-backend.onrender.com/api/admin/subscriptions/enterprise"
        ); // Adjust the API path if necessary
        const data = await response.json();

        if (response.ok) {
          setSubscriptions(data.subscriptions);
        } else {
          setError(data.message || "Failed to fetch subscriptions");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pricing-tabs tabs-box wow fadeInUp">
      <div className="row">
        {subscriptions.map((item) => (
          <div
            className={`pricing-table col-lg-4 col-md-6 col-sm-12`}
            key={item._id}
          >
            <div className="inner-box">
              <div className="title">{item.type}</div>
              <div className="price">
                ₹{item.priceINR} (
                <span className="usd-price">${item.priceUSD}</span>)
                <span className="duration">/ {item.duration}</span>
              </div>
              <div className="table-content">
                <ul>
                  {item.features.map((feature, i) => (
                    <li key={i}>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="table-footer">
                <Link href="" className="theme-btn btn-style-three">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
