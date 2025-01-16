// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

// const SubscriptionListingTable = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSubscriptions = async (user) => {
//       try {
//         const userToken = await user.getIdToken();

//         const { data } = await axios.get(
//           "https://founders-clinic-backend.onrender.com/api/admin/all-package",
//           {
//             headers: { Authorization: `Bearer ${userToken}` },
//           }
//         );
//         setSubscriptions(data.subscriptions); // Update to set subscriptions
//       } catch (error) {
//         console.error("Error fetching subscriptions:", error.response || error);
//         toast.error("Failed to fetch subscriptions.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchSubscriptions(user);
//       } else {
//         setSubscriptions([]);
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!subscriptions.length) {
//     return <div>No subscriptions found.</div>;
//   }

//   return (
//     <div className="tabs-box">
//       <div className="widget-title">
//         <h4>All Subscription Packages</h4>
//       </div>

//       <div className="widget-content">
//         <div className="table-outer">
//           <table className="default-table manage-job-table">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Type</th>
//                 <th>Price</th>
//                 <th>Duration</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subscriptions.map((subscription) => (
//                 <tr key={subscription._id}>
//                   <td>
//                     <div className="job-block">
//                       <div className="inner-box">
//                         <div className="content">
//                           <span className="company-logo">
//                             {subscription.image && (
//                               <img
//                                 src={subscription.image}
//                                 alt={`${subscription.type} image`}
//                                 style={{
//                                   width: "50px",
//                                   height: "50px",
//                                   objectFit: "cover",
//                                 }}
//                               />
//                             )}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{subscription.type}</td>
//                   <td>${subscription.price.toFixed(2)}</td>
//                   <td>{subscription.duration}</td>
//                   <td>
//                     {/* <ul>
//                       {subscription.features.map((feature, index) => (
//                         <li key={index}>{feature}</li>
//                       ))}
//                     </ul> */}
//                     <div className="option-box">
//                       <ul className="option-list">
//                         <li>
//                           <button
//                             onClick={() => handleDeleteJob(job._id)}
//                             data-text="Delete Application"
//                           >
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
//     </div>
//   );
// };

// export default SubscriptionListingTable;
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const SubscriptionListingTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async (user) => {
      try {
        const userToken = await user.getIdToken();

        const { data } = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/admin/subscriptions/intern",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setSubscriptions(data.subscriptions); // Update to set subscriptions
      } catch (error) {
        console.error("Error fetching subscriptions:", error.response || error);
        toast.error("Failed to fetch subscriptions.");
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchSubscriptions(user);
      } else {
        setSubscriptions([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (subscriptionId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userToken = await user.getIdToken();

      const { data } = await axios.delete(
        `https://founders-clinic-backend.onrender.com/api/admin/package/${subscriptionId}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // Remove the deleted subscription from the local state
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter(
          (subscription) => subscription._id !== subscriptionId
        )
      );

      toast.success(data.message || "Subscription deleted successfully!");
    } catch (error) {
      console.error("Error deleting subscription:", error.response || error);
      toast.error(
        error.response?.data?.message || "Failed to delete subscription."
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!subscriptions.length) {
    return <div>No subscriptions found.</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>All Subscription Packages</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Type</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription._id}>
                  <td>
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            {subscription.image && (
                              <img
                                src={subscription.image}
                                alt={`${subscription.type} image`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{subscription.type}</td>
                  <td>₹{subscription.price.toFixed(2)}</td>
                  <td>{subscription.duration}</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button
                            onClick={() => handleDelete(subscription._id)}
                            data-text="Delete Subscription"
                          >
                            <span className="la la-trash"></span>
                          </button>
                        </li>
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

export default SubscriptionListingTable;
