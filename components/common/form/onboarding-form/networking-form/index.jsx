import MobileMenu from "@/components/header/MobileMenu";
import DashboardHeader from "@/components/header/DefaulHeader";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import NetworkingForm from "../components/NetworkingForms/NetworkingForm";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter";

const index = () => {
  return (
    <div className="page-wrapper custom-dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <DashboardEmployerSidebar /> */}
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          {/* <BreadCrumb title="Post a New Job!" /> */}
          {/* breadCrumb */}

          {/* <MenuToggler /> */}
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Onbaording Questionaire for Networking Community</h4>
                  </div>

                  <div className="widget-content">
                    {/* <PostJobSteps /> */}
                    {/* End job steps form */}
                    <NetworkingForm />
                    {/* End post box form */}
                  </div>
                </div>
              </div>
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
