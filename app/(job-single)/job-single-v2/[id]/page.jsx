// "use client";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import LoginPopup from "@/components/common/form/login/LoginPopup";
// import FooterDefault from "@/components/footer/common-footer";
// import DefaulHeader from "@/components/header/DefaulHeader";
// import MobileMenu from "@/components/header/MobileMenu";
// import JobOverView from "@/components/job-single-pages/investmet-components/InvestmentOverview";
// import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
// import InvestmentDetailsDescriptions from "@/components/job-single-pages/investmet-components/InvestmentDetailsDescription";
// import Contact from "@/components/job-single-pages/shared-components/Contact";
// import RelatedJobs3 from "@/components/job-single-pages/related-jobs/RelatedJobs3";
// import ApplyInvestmentModelContent from "@/components/job-single-pages/investmet-components/ApplyInvestmentModelContent";
// import Image from "next/image";

// const JobSingleDynamicV2 = ({ params }) => {
//   const [investment, setInvestment] = useState(null);

//   useEffect(() => {
//     // Fetch investment data using the id from params
//     const fetchInvestment = async () => {
//       try {
//         const res = await fetch(
//           `http://13.126.254.235:4000/api/user/investement/${params.id}`
//         );
//         const data = await res.json();
//         setInvestment(data);
//       } catch (error) {
//         console.error("Error fetching investment data:", error);
//       }
//     };

//     fetchInvestment();
//   }, [params.id]);

//   if (!investment) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <span className="header-span"></span>

//       <LoginPopup />
//       <DefaulHeader />
//       <MobileMenu />

//       <section className="job-detail-section">
//         <div className="job-detail-outer">
//           <div className="auto-container">
//             <div className="row">
//               <div className="content-column col-lg-8 col-md-12 col-sm-12">
//                 <div className="job-block-outer">
//                   <div className="job-block-seven">
//                     <div className="inner-box">
//                       <div className="content">
//                         <span className="company-logo">
//                           <Image
//                             width={100}
//                             height={98}
//                             src={investment.logo}
//                             alt="logo"
//                           />
//                         </span>
//                         <h4>{investment.businessName}</h4>

//                         <ul className="job-info">
//                           <li>
//                             <span className="icon flaticon-briefcase"></span>
//                             {investment.businessType}
//                           </li>
//                           <li>
//                             <span className="icon flaticon-map-locator"></span>
//                             {investment.city}, {investment.country}
//                           </li>
//                           <li>
//                             <span className="icon flaticon-clock-3"></span>
//                             Founded: {investment.foundedYear}
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Pass investment as prop */}
//                 <InvestmentDetailsDescriptions investment={investment} />

//                 <div className="other-options">
//                   <div className="social-share">
//                     <h5>Share this investment</h5>
//                     <SocialTwo />
//                   </div>
//                 </div>

//                 <div className="related-jobs">
//                   <div className="title-box">
//                     <h3>Related Investments</h3>
//                     <div className="text">
//                       2020 investments live - 293 added today.
//                     </div>
//                   </div>
//                   <div className="row">
//                     <RelatedJobs3 />
//                   </div>
//                 </div>
//               </div>

//               <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
//                 <aside className="sidebar">
//                   <div className="btn-box">
//                     <a
//                       href="#"
//                       className="theme-btn btn-style-one"
//                       data-bs-toggle="modal"
//                       data-bs-target="#applyJobModal"
//                     >
//                       Apply for Investment
//                     </a>
//                   </div>

//                   <div
//                     className="modal fade"
//                     id="applyJobModal"
//                     tabIndex="-1"
//                     aria-hidden="true"
//                   >
//                     <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//                       <div className="apply-modal-content modal-content">
//                         <div className="text-center">
//                           <h3 className="title">Apply for this investment</h3>
//                           <button
//                             type="button"
//                             className="closed-modal"
//                             data-bs-dismiss="modal"
//                             aria-label="Close"
//                           ></button>
//                         </div>
//                         <ApplyInvestmentModelContent />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="sidebar-widget">
//                     <h4 className="widget-title">Investment Overview</h4>
//                     <JobOverView investment={investment} />
//                   </div>

//                   <div className="sidebar-widget company-widget">
//                     <div className="widget-content">
//                       <div className="company-title">
//                         <div className="company-logo">
//                           <Image
//                             width={54}
//                             height={53}
//                             src={investment.logo}
//                             alt="resource"
//                           />
//                         </div>
//                         <h5 className="company-name">
//                           {investment.businessName}
//                         </h5>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="sidebar-widget contact-widget">
//                     <h4 className="widget-title">Contact Us</h4>
//                     <div className="widget-content">
//                       <Contact />
//                     </div>
//                   </div>
//                 </aside>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <FooterDefault footerStyle="alternate5" />
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(JobSingleDynamicV2), {
//   ssr: false,
// });
// "use client";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import LoginPopup from "@/components/common/form/login/LoginPopup";
// import FooterDefault from "@/components/footer/common-footer";
// import DefaulHeader from "@/components/header/DefaulHeader";
// import MobileMenu from "@/components/header/MobileMenu";
// import InvestmentInfo from "@/components/job-single-pages/investmet-components/InvestmentInfo";
// import InvestmentDetailsDescriptions from "@/components/job-single-pages/investmet-components/InvestmentDetailsDescription";
// import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
// import InvestmentOverview from "@/components/job-single-pages/investmet-components/InvestmentOverview";
// import Contact from "@/components/job-single-pages/shared-components/Contact";
// import RelatedJobs2 from "@/components/job-single-pages/related-jobs/RelatedJobs2";
// import ApplyInvestmentModalContent from "@/components/job-single-pages/investmet-components/ApplyInvestmentModelContent";
// import Image from "next/image";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const JobSingleDynamicV2 = ({ params }) => {
//   const [investment, setInvestment] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInvestment = async (user) => {
//       const userToken = await user.getIdToken();
//       try {
//         const res = await fetch(
//           `http://13.126.254.235:4000/api/user/investement/${params.id}`
//         );
//         const data = await res.json();
//         console.log(data);
//         setInvestment(data);
//       } catch (error) {
//         console.error("Error fetching investment data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvestment();
//   }, [params.id]);
//   const timeSincePosted = (date) => {
//     if (!date) return "N/A";
//     const parsedDate = new Date(date);
//     return formatDistanceToNow(parsedDate, { addSuffix: true });
//   };
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is authenticated, fetch investment data
//         fetchInvestment(user);
//       } else {
//         // User is not authenticated
//         console.error("User not authenticated");
//         setLoading(false);
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, [params.id]);
//   if (loading) return <div>Loading...</div>;
//   if (!investment) return <div>Investment not found</div>;

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

//       {/* <!-- Job Detail Section --> */}
//       <section className="job-detail-section">
//         <div className="job-detail-outer">
//           <div className="auto-container">
//             <div className="row">
//               <div className="content-column col-lg-8 col-md-12 col-sm-12">
//                 <div className="job-block-outer">
//                   <div className="job-block-seven style-two">
//                     <div className="inner-box">
//                       <div className="content">
//                         <h4>{investment?.title}</h4>

//                         <ul className="job-info">
//                           <li>
//                             <span className="icon flaticon-briefcase"></span>
//                             {investment?.entityName}
//                           </li>
//                           {/* compnay info */}
//                           <li>
//                             <span className="icon flaticon-map-locator"></span>
//                             {investment?.jobLocation}
//                           </li>
//                           {/* location info */}
//                           <li>
//                             <span className="icon flaticon-clock-3"></span>{" "}
//                             {timeSincePosted(investment.postedDate)}
//                           </li>
//                           {/* time info */}
//                           <li>
//                             <span className="icon flaticon-money"></span>{" "}
//                             {investment?.budget}
//                           </li>
//                           {/* salary info */}
//                         </ul>
//                         {/* End .job-info */}

//                         <ul className="job-other-info">
//                           {investment?.investmentType?.map((val, i) => (
//                             <li key={i} className={`${val.styleClass}`}>
//                               {val.type}
//                             </li>
//                           ))}
//                         </ul>
//                         {/* End .job-other-info */}
//                       </div>
//                       {/* End .content */}
//                     </div>
//                   </div>
//                   {/* <!-- Job Block --> */}
//                 </div>
//                 {/* <!-- job block outer --> */}

//                 <div className="job-overview-two">
//                   <h4>investment Description</h4>
//                   <InvestmentOverview investment={investment} />
//                 </div>
//                 {/* <!-- job-overview-two --> */}

//                 <InvestmentDetailsDescriptions investment={investment} />
//                 {/* End job-details */}

//                 <div className="other-options">
//                   <div className="social-share">
//                     <h5>Share this investment</h5>
//                     <SocialTwo />
//                   </div>
//                 </div>
//                 {/* <!-- Other Options --> */}
//               </div>
//               {/* End .content-column */}

//               <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
//                 <aside className="sidebar">
//                   <div className="btn-box">
//                     <a
//                       href="#"
//                       className="theme-btn btn-style-one"
//                       data-bs-toggle="modal"
//                       data-bs-target="#applyJobModal"
//                     >
//                       Apply For investment
//                     </a>
//                     <button className="bookmark-btn">
//                       <i className="flaticon-bookmark"></i>
//                     </button>
//                   </div>
//                   {/* End apply for job btn */}

//                   {/* <!-- Modal --> */}
//                   <div
//                     className="modal fade"
//                     id="applyJobModal"
//                     tabIndex="-1"
//                     aria-hidden="true"
//                   >
//                     <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//                       <div className="apply-modal-content modal-content">
//                         <div className="text-center">
//                           <h3 className="title">Apply for this investment</h3>
//                           <button
//                             type="button"
//                             className="closed-modal"
//                             data-bs-dismiss="modal"
//                             aria-label="Close"
//                           ></button>
//                         </div>
//                         {/* End modal-header */}

//                         <ApplyInvestmentModalContent investment={investment} />
//                         {/* End PrivateMessageBox */}
//                       </div>
//                       {/* End .send-private-message-wrapper */}
//                     </div>
//                   </div>
//                   {/* End .modal */}

//                   <div className="sidebar-widget company-widget">
//                     <div className="widget-content">
//                       <div className="company-title">
//                         <div className="company-logo">
//                           <Image
//                             width={54}
//                             height={53}
//                             src={investment.logo}
//                             alt="resource"
//                           />
//                         </div>
//                         <h5 className="company-name">{investment.company}</h5>
//                         <a href="#" className="profile-link">
//                           View company profile
//                         </a>
//                       </div>
//                       {/* End company title */}

//                       <InvestmentInfo investment={investment} />

//                       <div className="btn-box">
//                         <a
//                           href="#"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="theme-btn btn-style-three"
//                         >
//                           {investment?.title}
//                         </a>
//                       </div>
//                       {/* End btn-box */}
//                     </div>
//                   </div>
//                   {/* End .company-widget */}

//                   <div className="sidebar-widget contact-widget">
//                     <h4 className="widget-title">Contact Us</h4>
//                     <div className="widget-content">
//                       <div className="default-form">
//                         <Contact />
//                       </div>
//                       {/* End .default-form */}
//                     </div>
//                   </div>
//                   {/* End contact-widget */}
//                 </aside>
//                 {/* End .sidebar */}
//               </div>
//               {/* End .sidebar-column */}
//             </div>
//             {/* End .row  */}
//           </div>
//           {/* End auto-container */}
//         </div>
//         {/* <!-- job-detail-outer--> */}
//       </section>
//       {/* <!-- End Job Detail Section --> */}

//       <FooterDefault footerStyle="alternate5" />
//       {/* <!-- End Main Footer --> */}
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(JobSingleDynamicV2), {
//   ssr: false,
// });
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { formatDistanceToNow } from "date-fns";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import InvestmentInfo from "@/components/job-single-pages/investmet-components/InvestmentInfo";
import InvestmentDetailsDescriptions from "@/components/job-single-pages/investmet-components/InvestmentDetailsDescription";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import InvestmentOverview from "@/components/job-single-pages/investmet-components/InvestmentOverview";
import Contact from "@/components/job-single-pages/shared-components/Contact";
import RelatedJobs2 from "@/components/job-single-pages/related-jobs/RelatedJobs2";
import ApplyInvestmentModalContent from "@/components/job-single-pages/investmet-components/ApplyInvestmentModelContent";
import Image from "next/image";

const JobSingleDynamicV2 = ({ params }) => {
  // State management for investment data and loading state
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch investment data with authentication
  const fetchInvestment = async (user) => {
    try {
      // Get the authentication token
      const userToken = await user.getIdToken();

      // Make authenticated API request
      const response = await axios.get(
        `http://13.126.254.235:4000/api/user/investement/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setInvestment(response.data);
    } catch (error) {
      console.error(
        "Error fetching investment data:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format the time since posting
  const timeSincePosted = (date) => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  };

  // Set up authentication listener and fetch data
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, fetch investment data
        fetchInvestment(user);
      } else {
        // User is not authenticated
        console.error("User not authenticated");
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [params.id]);

  // Loading state handler
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state handler
  if (!investment) {
    return <div>Investment not found</div>;
  }

  // Rest of your component remains the same
  return (
    <>
      <span className="header-span"></span>
      <LoginPopup />
      <DefaulHeader />
      <MobileMenu />

      <section className="job-detail-section">
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {/* Investment block outer */}
                <div className="job-block-outer">
                  <div className="job-block-seven style-two">
                    <div className="inner-box">
                      <div className="content">
                        <h4>{investment?.title}</h4>
                        <ul className="job-info">
                          <li>
                            <span className="icon flaticon-briefcase"></span>
                            {investment?.businessName}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>
                            {investment?.city}
                          </li>
                          <li>
                            <span className="icon flaticon-clock-3"></span>
                            {timeSincePosted(investment.postedDate)}
                          </li>
                        </ul>
                        <ul className="job-other-info">
                          {investment?.investmentType?.map((val, i) => (
                            <li key={i} className={`${val.styleClass}`}>
                              {val.type}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rest of the content section */}
                <div className="job-overview-two">
                  <h4>Investment Description</h4>
                  <InvestmentOverview investment={investment} />
                </div>

                <InvestmentDetailsDescriptions investment={investment} />

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this investment</h5>
                    <SocialTwo />
                  </div>
                </div>
              </div>

              {/* Sidebar content */}
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  {/* Apply button and modal */}
                  <div className="btn-box">
                    <a
                      href="#"
                      className="theme-btn btn-style-one"
                      data-bs-toggle="modal"
                      data-bs-target="#applyJobModal"
                    >
                      Apply For Investment
                    </a>
                    {/* <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button> */}
                  </div>

                  {/* Apply Modal */}
                  <div
                    className="modal fade"
                    id="applyJobModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="apply-modal-content modal-content">
                        <div className="text-center">
                          <h3 className="title">Apply for this investment</h3>
                          <button
                            type="button"
                            className="closed-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <ApplyInvestmentModalContent investment={investment} />
                      </div>
                    </div>
                  </div>

                  {/* Company widget */}
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <InvestmentInfo investment={investment} />
                      {/* <div className="btn-box">
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          {investment?.title}
                        </a>
                      </div> */}
                    </div>
                  </div>

                  {/* Contact widget */}
                  {/* <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div> */}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV2), {
  ssr: false,
});
