// const LoginRegBanner = () => {
//   return (
//     <section
//       className="cta -type-2"
//       style={{ backgroundImage: "url(/images/role.jpeg)" }}
//     >
//       <div className="auto-container">
//         <div className="sec-title text-center">
//           <h2 style={{ color: "white" }}>Select User Type</h2>
//           <div className="text" style={{ color: "white" }}>
//             We have created this space where you can discover, analyze and
//             connect throughout the global business ecosystem and learn about the
//             best resources with our Matching algorithms.
//           </div>
//         </div>

//         <div className="row grid-base justify-content-between">
//           <div className="col-lg-5 col-md-6">
//             <div className="cta-item">
//               <div className="icon-wrap">
//                 <div className="icon icon-case"></div>
//               </div>
//               {/* End icon-wrap */}

//               <div className="content">
//                 <div className="title">I&apos;m an Enterprise</div>
//               </div>
//               {/* End content */}
//             </div>
//           </div>
//           {/* End .col */}

//           <div className="col-lg-5 col-md-6">
//             <div className="cta-item -blue">
//               <div className="icon-wrap">
//                 <div className="icon icon-task"></div>
//               </div>
//               {/* End icon-wrap */}

//               <div className="content">
//                 <div className="title">I&apos;m an Professional</div>
//               </div>
//               {/* End content */}
//             </div>
//           </div>
//           {/* End .col */}
//           <div className="col-lg-5 col-md-6">
//             <div className="cta-item -green">
//               <div className="icon-wrap">
//                 <div className="icon icon-drawing"></div>
//               </div>
//               {/* End icon-wrap */}

//               <div className="content">
//                 <div className="title">I&apos;m an Intern</div>
//               </div>
//               {/* End content */}
//             </div>
//           </div>
//           {/* End .col */}
//           <div className="col-lg-5 col-md-6">
//             <div className="cta-item -red">
//               <div className="icon-wrap">
//                 <div className="icon icon-doc"></div>
//               </div>
//               {/* End icon-wrap */}

//               <div className="content">
//                 <div className="title">I&apos;m an Investor</div>
//               </div>
//               {/* End content */}
//             </div>
//           </div>
//           {/* End .col */}
//           <div className="col-lg-5 col-md-6">
//             <div className="cta-item -yellow">
//               <div className="icon-wrap">
//                 <div className="icon icon-process"></div>
//               </div>
//               {/* End icon-wrap */}

//               <div className="content">
//                 <div className="title">I&apos;m a Networking Community</div>
//                 {/* <div className="text">
//                   Lorem Ipsum is simply dummy text of the printing and
//                   typesetting industry but also the leap into electronic
//                   typesetting
//                 </div> */}
//               </div>
//               {/* End content */}
//             </div>
//           </div>
//           {/* End .col */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LoginRegBanner;
"use client";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

const LoginRegBanner = () => {
  const router = useRouter();
  const auth = getAuth();

  // Role selection data
  const userRoles = [
    {
      id: 1,
      title: "I'm an Enterprise",
      role: "Enterprise",
      redirectTo: "/onboarding/enterprise-onboarding",
      className: "cta-item",
      iconClass: "icon-case",
    },
    {
      id: 2,
      title: "I'm a Professional",
      role: "Professional",
      redirectTo: "/onboarding/professional-onboarding",
      className: "cta-item -blue",
      iconClass: "icon-task",
    },
    {
      id: 3,
      title: "I'm an Intern",
      role: "Intern",
      redirectTo: "/onboarding/intern-onboarding",
      className: "cta-item -green",
      iconClass: "icon-drawing",
    },
    {
      id: 4,
      title: "I'm an Investor",
      role: "Investor",
      redirectTo: "/onboarding/investor-onboarding",
      className: "cta-item -red",
      iconClass: "icon-doc",
    },
    {
      id: 5,
      title: "I'm a Networking Community",
      role: "Networking Community",
      redirectTo: "/onboarding/networkingCommunity-onboarding",
      className: "cta-item -yellow",
      iconClass: "icon-process",
    },
  ];

  // Handle role selection
  const handleSelectRole = async (role, redirectTo) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not found");
      }

      // Get user authentication token
      const userToken = await user.getIdToken();
      if (!userToken) {
        throw new Error("User not authenticated");
      }

      // Update role in backend
      const response = await fetch(
        "https://founders-clinic-backend.onrender.com/api/user/role",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`, // Authentication header
          },
          body: JSON.stringify({ role }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Role successfully updated:", data);
        router.push(redirectTo); // Redirect to appropriate onboarding page
      } else {
        console.error("Error updating role:", data.message);
      }
    } catch (err) {
      console.error("Error in role selection:", err.message);
    }
  };

  return (
    <section
      className="cta -type-2"
      style={{ backgroundImage: "url(/images/role.jpeg)" }}
    >
      <div className="auto-container">
        <div className="sec-title text-center">
          <h2 style={{ color: "white" }}>Select User Type</h2>
          <div className="text" style={{ color: "white" }}>
            We have created this space where you can discover, analyze and
            connect throughout the global business ecosystem and learn about the
            best resources with our matching algorithms.
          </div>
        </div>

        <div className="row grid-base justify-content-between">
          {userRoles.map((item) => (
            <div className="col-lg-5 col-md-6" key={item.id}>
              <div
                className={item.className}
                onClick={() => handleSelectRole(item.role, item.redirectTo)}
                style={{ cursor: "pointer" }}
              >
                <div className="icon-wrap">
                  <div className={`icon ${item.iconClass}`}></div>
                </div>
                <div className="content">
                  <div className="title">{item.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoginRegBanner;
