// "use client";
// import Link from "next/link";

// const selectRole = () => {
//   const pricingCotent = [
//     {
//       id: 1,
//       packageType: "",
//       price: "Enterprise",
//       tag: "",
//       features: [],
//       redirectTo: "/onboarding/enterprise-onboarding",
//     },
//     {
//       id: 2,
//       packageType: "",
//       price: "Professional",
//       tag: "",
//       features: [],
//       redirectTo: "/onboarding/professional-onboarding",
//     },
//     {
//       id: 3,
//       packageType: "",
//       price: "Intern",
//       tag: "",
//       features: [],
//       redirectTo: "/onboarding/intern-onboarding",
//     },
//     // {
//     //   id: 4,
//     //   packageType: "",
//     //   price: "Networking community",
//     //   tag: "",
//     //   features: [],
//     //   redirectTo: "/onboarding/intern-onboarding",
//     // },
//     // {
//     //   id: 5,
//     //   packageType: "",
//     //   price: "Investor",
//     //   tag: "",
//     //   features: [],
//     //   redirectTo: "/onboarding/intern-onboarding",
//     // },
//   ];

//   return (
//     <div className="pricing-tabs tabs-box wow fadeInUp">
//       {/* <!--Tabs Container--> */}
//       <div className="row">
//         {pricingCotent.map((item) => (
//           <div
//             className={`pricing-table col-lg-4 col-md-6 col-sm-12 ${item.tag}`}
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
//                 {item.price} <span className="duration"></span>
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
//                 <Link
//                   href={item.redirectTo}
//                   className="theme-btn btn-style-three"
//                 >
//                   Select
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default selectRole;
"use client";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

const SelectRole = () => {
  const router = useRouter();
  const auth = getAuth();
  const pricingContent = [
    {
      id: 1,
      price: "Enterprise",
      redirectTo: "/onboarding/enterprise-onboarding",
    },
    {
      id: 2,
      price: "Professional",
      redirectTo: "/onboarding/professional-onboarding",
    },
    {
      id: 3,
      price: "Intern",
      redirectTo: "/onboarding/intern-onboarding",
    },
    {
      id: 4,
      price: "Investor",
      redirectTo: "/onboarding/investor-onboarding",
    },
    {
      id: 5,
      price: "Networking Community",
      redirectTo: "/onboarding/networkingCommunity-onboarding",
    },
    // {
    //   id: 6,
    //   price: "Event Hosts",
    //   redirectTo: "/onboarding/eventHosts-onboarding",
    // },
  ];

  const handleSelectRole = async (role) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not found");
      }
      // Get user details (token can be fetched from localStorage/session or auth context)
      const userToken = await user.getIdToken();

      if (!userToken) {
        throw new Error("User not authenticated");
      }

      // Update the role in the database
      const response = await fetch("http://localhost:4000/api/user/role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Include user token for authentication
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Role successfully updated:", data);

        // Save role in localStorage
        localStorage.setItem("userRole", role);

        // Redirect to the relevant onboarding page
        const selectedItem = pricingContent.find((item) => item.price === role);
        if (selectedItem) {
          router.push(selectedItem.redirectTo);
        }
      } else {
        console.error("Error updating role:", data.message);
      }
    } catch (err) {
      console.error("Error in role selection:", err.message);
    }
  };

  return (
    <div className="pricing-tabs tabs-box wow fadeInUp">
      <div className="row">
        {pricingContent.map((item) => (
          <div
            className={`pricing-table col-lg-4 col-md-6 col-sm-12`}
            key={item.id}
          >
            <div className="inner-box">
              <div className="price">{item.price}</div>
              <div className="table-footer">
                <button
                  onClick={() => handleSelectRole(item.price)}
                  className="theme-btn btn-style-three"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRole;
