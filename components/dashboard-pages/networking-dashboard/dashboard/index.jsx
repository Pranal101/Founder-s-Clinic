import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardNetworkingSidebar from "../../../header/DashboardNetworkingSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
// import ProfileChart from "./components/ProfileChart";
// import Applicants from "./components/Applicants";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import Candidates2 from "@/components/candidates/Candidates2";

const Index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardNetworkingSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Dashboard Home!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          {/* <div className="row">
            <TopCardBlock />
          </div> */}
          {/* End .row top card block */}
          <div className="col-lg-12">
            {/* <!-- applicants Widget --> */}
            <div className="applicants-widget ls-widget">
              <div className="widget-title">
                <h4>Recent Events</h4>
              </div>
              <div className="widget-content">
                <div className="row">
                  {/* <!-- Candidate block three --> */}

                  {/* <Applicants /> */}
                </div>
              </div>
            </div>
          </div>
          {/* End .col */}
          <div className="col-lg-12">
            <div className="applicants-widget ls-widget">
              <div className="widget-title">
                <h4>Featured Founders</h4>
              </div>
              <div className="widget-content">
                <div className="row">
                  <Candidates2 />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-7 col-lg-12">
              {/* <!-- Graph widget --> */}
              <div className="graph-widget ls-widget">
                {/* <ProfileChart /> */}
              </div>
              {/* End profile chart */}
            </div>
            {/* End .col */}

            {/* <div className="col-xl-5 col-lg-12">
              <div className="notification-widget ls-widget">
                <div className="widget-title">
                  <h4>Notifications</h4>
                </div>
                <div className="widget-content"><Notification /></div>
              </div>
            </div> */}
            {/* End .col */}
          </div>
          {/* End .row profile and notificatins */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
