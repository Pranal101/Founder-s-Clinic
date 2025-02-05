// "use client";
// import React from "react";
// import SelectRole from "@/components/selectRole/selectRole";
// import Breadcrumb from "../../Breadcrumb";
// import LoginPopup from "../../form/login/LoginPopup";
// import FooterDefault from "@/components/footer/common-footer";
// import DefaulHeader from "@/components/header/DefaulHeader";
// import MobileMenu from "@/components/header/MobileMenu";

// const index = () => {
//   return (
//     <>
//       {/* <!-- Header Span --> */}
//       <span className="header-span"></span>

//       <LoginPopup />
//       {/* End Login Popup Modal */}

//       <DefaulHeader />
//       {/* <!--End Main Header --> */}

//       <MobileMenu />
//       {/* End MobileMenu */}

//       {/* <Breadcrumb title="Select User Type" meta="selectRole" /> */}
//       {/* <!--End Page Title--> */}

//       <section className="pricing-section">
//         <div className="auto-container">
//           <div className="sec-title text-center">
//             <h2>Select User Type</h2>
//             <div className="text">
//               We have created this space where you can discover, analyze and
//               connect throughout the global business ecosystem and learn about
//               the best resources with our Matching algorithms.
//             </div>
//           </div>
//           {/* End title */}
//           <SelectRole />
//           {/* End .{/* <!--Pricing Tabs--> */}
//         </div>
//       </section>
//       {/* <!-- End Pricing Section --> */}

//       <FooterDefault footerStyle="alternate5" />
//       {/* <!-- End Main Footer --> */}
//     </>
//   );
// };

// export default index;
"use client";
import React from "react";
import SelectRole from "@/components/selectRole/selectRole";
import Breadcrumb from "../../Breadcrumb";
import LoginPopup from "../../form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import LoginRegBanner from "@/components/block/LoginRegBanner";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <Breadcrumb title="Select User Type" meta="selectRole" /> */}
      {/* <!--End Page Title--> */}

      <LoginRegBanner />
      {/* <!-- End Pricing Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
