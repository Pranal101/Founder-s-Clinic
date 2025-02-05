// import Link from "next/link";

// const Pricing = () => {
//   const pricingCotent = [
//     {
//       id: 1,
//       packageType: "Basic",
//       price: "199",
//       tag: "",
//       features: [
//         "30 job posting",
//         "3 featured job",
//         "Job displayed for 15 days",
//         "Premium Support 24/7",
//       ],
//     },
//     {
//       id: 2,
//       packageType: "Standard",
//       price: "499",
//       tag: "",
//       features: [
//         "40 job posting",
//         "5 featured job",
//         "Job displayed for 20 days",
//         "Premium Support 24/7",
//       ],
//     },
//     {
//       id: 3,
//       packageType: "Extended",
//       price: "799",
//       tag: "",
//       features: [
//         "50 job posting",
//         "10 featured job",
//         "Job displayed for 60 days",
//         "Premium Support 24/7",
//       ],
//     },
//   ];

//   return (
//     <div className="pricing-tabs tabs-box wow fadeInUp">
//       {/* <!--Tabs Container--> */}
//       <div className="row">
//         {pricingCotent.map((item) => (
//           <div
//             className={`pricing-table col-lg-6 col-md-6 col-sm-12 ${item.tag}`}
//             key={item.id}
//           >
//             <div className="inner-box">
//               {item.tag ? (
//                 <>
//                   <span className="tag">Recommended</span>
//                 </>
//               ) : (
//                 ""
//               )}

//               <div className="title">{item.packageType}</div>
//               <div className="price">
//                 ${item.price} <span className="duration">/ monthly</span>
//               </div>
//               <div className="table-content">
//                 <ul>
//                   {item.features.map((feature, i) => (
//                     <li key={i}>
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="table-footer">
//                 <Link href="/shop/cart" className="theme-btn btn-style-three">
//                   Add to Cart
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pricing;
"use client";
import { useEffect, useState } from "react";
import loadRazorpay from "@/components/razorpay/RazorpayPayment";
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
          "http://13.126.254.235:4000/api/admin/subscriptions/professional"
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
                <Link
                  href="#"
                  className="theme-btn btn-style-three"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default Link behavior
                    loadRazorpay(item.priceINR); // Trigger Razorpay
                  }}
                >
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
