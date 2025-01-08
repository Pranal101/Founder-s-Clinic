"use client";
import Link from "next/link";
import About from "../about/About";
import Blog3 from "../blog/Blog3";
import LoginPopup from "../common/form/login/LoginPopup";
import Partner from "../common/partner/Partner";
import FooterDefault from "../footer/common-footer";
import Funfact from "../fun-fact-counter/Funfact";
import DefaulHeader2 from "../header/DefaulHeader2";
import MobileMenu from "../header/MobileMenu";
import Hero1 from "../hero/hero-1";
import JobCategorie8 from "../job-categories/JobCategorie8";
import JobFeatured1 from "../job-featured/JobFeatured1";
import Testimonial from "../testimonial/Testimonial";
import Candidates2 from "../candidates/Candidates2";
import FeaturedBlock from "../block/FeaturedBlock";
import Block9 from "../block/Block9";
import Pricing3 from "../pricing/Pricing3";
import Pricing from "../pricing/Pricing";
import FaqChildHome from "@/components/pages-menu/faq/FaqChildHome";
import RegBanner from "../block/RegBanner";

const index = () => {
  return (
    <>
      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero1 />
      {/* End Hero Section */}

      <section className="features-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>User Types</h2>
            <div className="text">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
            </div>
          </div>

          <div className="row" data-aos="fade-up">
            <FeaturedBlock />
          </div>
        </div>
      </section>
      {/* <!-- End Features Section --> */}

      <section className="layout-pt-120 layout-pb-60 testimonial-section style-two">
        <div className="auto-container">
          {/* <!-- Sec Title --> */}
          <div className="sec-title text-center">
            <h2 className="fw-700">How it Works</h2>
            <div className="text">
              All service providers on our platform undergo a rigorous vetting
              process to ensure they're credible, reliable, and highly
              qualified.
            </div>
          </div>

          <div className="row grid-base">
            <Block9 />
          </div>
        </div>
      </section>
      {/* <!-- End Business Block --> */}
      {/* <!-- End Process Section --> */}
      <section className="layout-pt-60 layout-pb-60">
        <div className="auto-container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="sec-title -type-2 text-center">
                <h2>Choose a plan that’s right for you.</h2>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row grid-base pricing3_hover" data-aos="fade-up">
            <Pricing3 />
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* <!-- End Pricing Section --> */}
      <section className="layout-pt-120 layout-pb-120 border-bottom-none">
        <div className="auto-container">
          <div className="row grid-base justify-content-between align-items-end">
            <div className="col-lg-6">
              <div className="sec-title mb-0">
                <h2>Explore Popular Inqueries</h2>
              </div>
            </div>
            {/* End .col */}
            <div className="col-auto">
              <Link href="/job-list-v9" className="button -arrow">
                Browse
                <span className="fa fa-angle-right"></span>
              </Link>
            </div>
          </div>
          {/* End .row */}

          <div className="row grid-base pt-50" data-aos="fade-up">
            <JobCategorie8 />
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End .row */}
      {/* End Job Categorie Section */}

      <section className="candidates-section-two">
        <div className="auto-container">
          <div className="sec-title">
            <h2>Featured Candidates</h2>
            <div className="text">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
            </div>
          </div>

          <div className="row" data-aos="fade-up">
            <Candidates2 />
          </div>
        </div>
      </section>
      {/* <!-- End Candidates Section --> */}

      <section className="news-section style-three">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Featured Events</h2>
            <div className="text">
              Fresh job related news content posted each day.
            </div>
          </div>
          {/* End .sec-title */}

          <div className="row" data-aos="fade-up">
            <Blog3 />
          </div>
        </div>
      </section>
      {/* <!-- End News Section --> */}
      {/* <!-- End News Section --> */}
      {/* <!-- End Candidates Section --> */}
      {/* <section className="job-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Featured Jobs</h2>
            <div className="text">
              Know your worth and find the job that qualify your life
            </div>
          </div>

          <div className="row " data-aos="fade-up">
            <JobFeatured1 />
          </div>

          <div className="btn-box">
            <Link
              href="/job-list-v1"
              className="theme-btn btn-style-one bg-blue"
            >
              <span className="btn-title">Load More Listing</span>
            </Link>
          </div>
        </div>
      </section> */}
      {/* End Job Featured Section */}

      <section className="testimonial-section">
        <div className="container-fluid">
          {/* <!-- Sec Title --> */}
          <div className="sec-title text-center">
            <h2>Testimonials From Our Customers</h2>
            <div className="text">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
            </div>
          </div>
        </div>
        <div className="carousel-outer" data-aos="fade-up">
          {/* <!-- Testimonial Carousel --> */}
          <div className="testimonial-carousel gap-x25 center-item-active slick-list-visible">
            <Testimonial />
          </div>
        </div>
      </section>
      {/* <!-- End Testimonial Section --> */}

      <section className="clients-section">
        <div className="sponsors-outer" data-aos="fade">
          {/* <!--Sponsors Carousel--> */}
          <ul className="sponsors-carousel">
            <Partner />
          </ul>
        </div>
      </section>
      {/* <!-- End Clients Section--> */}

      <section className="layout-pt-60 layout-pb-60">
        <div className="auto-container">
          <div className="row" data-aos="fade-up">
            <RegBanner />
          </div>
        </div>
      </section>
      {/* <!-- End Registeration Banners --> */}
      <section className="faqs-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Frequently Asked Questions</h2>
          </div>

          {/* <!--Accordian Box--> */}
          <ul className="accordion-box">
            <FaqChildHome />
          </ul>
        </div>
      </section>
      {/* <!-- End Faqs Section --> */}

      {/* <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <About />
          </div>


          <div className="fun-fact-section">
            <div className="row">
              <Funfact />
            </div>
          </div>

        </div>
      </section> */}
      {/* <!-- End About Section --> */}

      {/* <section className="app-section">
        <div className="auto-container">
          <AppSection />
        </div>
      </section> */}
      {/* <!-- End App Section --> */}

      {/* <CallToAction /> */}
      {/* <!-- End Call To Action --> */}

      <FooterDefault />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
