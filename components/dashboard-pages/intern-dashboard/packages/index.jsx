import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardInternSidebar from "../../../header/DashboardInternSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import PackageDataTable from "./components/PackageDataTable";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import Candidates from "@/components/candidates/Candidates";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardInternSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Packages!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Offers</h4>
                  </div>
                  <div className="auto-container">
                    <div className="carousel-outer" data-aos="fade-up">
                      <div className="candidates-carousel default-dots">
                        <Candidates />
                      </div>
                    </div>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    {/* <div className="table-outer"> */}
                    {/* <PackageDataTable /> */}
                    {/* </div> */}
                  </div>
                  {/* End widget-content */}
                </div>
              </div>
              {/* <!-- Ls widget --> */}
            </div>
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Packages for Interns</h4>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    {/* <div className="table-outer"> */}
                    <PackageDataTable />
                    {/* </div> */}
                  </div>
                  {/* End widget-content */}
                </div>
              </div>
              {/* <!-- Ls widget --> */}
            </div>
          </div>
          {/* End .row */}
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

export default index;
