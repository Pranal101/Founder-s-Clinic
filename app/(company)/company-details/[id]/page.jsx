"use client";
import dynamic from "next/dynamic";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader2";
import MobileMenu from "@/components/header/MobileMenu";
import CompanyDetailsDescription from "@/components/employer-single-pages/shared-components/CompanyDetailsDescription";
import RelatedJobs from "@/components/employer-single-pages/related-jobs/RelatedJobs";
import MapJobFinder from "@/components/job-listing-pages/components/MapJobFinder";
import Social from "@/components/employer-single-pages/social/Social";
import Contact from "@/components/job-single-pages/shared-components/Contact";
import Image from "next/image";

const EmployersSingleV3 = ({ params }) => {
  const [employer, setEmployer] = useState(null);

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const { data } = await axios.get(
          `https://founders-clinic-backend.onrender.com/api/user/enterprise-details/${params.id}`
        );
        setEmployer(data.data);
      } catch (error) {
        console.error("Error fetching employer data:", error);
      }
    };

    fetchEmployer();
  }, [params.id]);

  if (!employer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Header */}
      <span className="header-span"></span>
      <LoginPopup />
      <DefaulHeader />
      <MobileMenu />

      {/* Job Detail Section */}
      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven style-three">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <Image
                      width={100}
                      height={100}
                      src={employer.logoUrl || "/placeholder.png"}
                      alt="logo"
                    />
                  </span>
                  <h4>{employer.entityName}</h4>
                  {/* <ul className="job-other-info">
                    <li className="time">Open Jobs – {employer.jobNumber}</li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-outer reverse">
          <div className="auto-container">
            <div className="row">
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar pd-right">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <ul className="company-info mt-0">
                        <li>
                          Primary industry: <span>{employer.industryType}</span>
                        </li>
                        <li>
                          Company size: <span>{employer.entitySize}</span>
                        </li>
                        <li>
                          Founded in: <span>{employer.foundedYear}</span>
                        </li>
                        <li>
                          Phone: <span>{employer.contactNumber}</span>
                        </li>
                        <li>
                          Email: <span>{employer.emailAddress}</span>
                        </li>
                        <li>
                          Location:{" "}
                          <span>
                            {employer.city}, {employer.country}
                          </span>
                        </li>
                        <li>
                          Services Offered:{" "}
                          <span>{employer.servicesOffered}</span>
                        </li>
                        {/* <li>
                          Social media: <Social />
                        </li> */}
                      </ul>
                      <div className="btn-box">
                        <a
                          href={employer.websiteLink}
                          className="theme-btn btn-style-three"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <div className="sidebar-widget">
                    <h4 className="widget-title">Job Location</h4>
                    <div className="widget-content">
                      <div style={{ height: "300px", width: "100%" }}>
                        <MapJobFinder />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="sidebar-widget contact-widget mb-0">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="default-form">
                      <Contact />
                    </div>
                  </div> */}
                </aside>
              </div>

              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <CompanyDetailsDescription
                  businessDescription={employer.businessDescription}
                />
                {/* <div className="related-jobs">
                  <div className="title-box">
                    <h3>3 Others jobs available</h3>
                    <div className="text">
                      2020 jobs live - 293 added today.
                    </div>
                  </div>
                  <RelatedJobs />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default dynamic(() => Promise.resolve(EmployersSingleV3), {
  ssr: false,
});
