import MobileMenu from "@/components/header/MobileMenu";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardAdminSidebar from "@/components/header/DashboardAdminSidebar";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter";
import PackageListingsTable from "./components/PackageListingsTable";
import AddPackage from "./components/AddPackage";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";

const Index = () => {
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

      <DashboardAdminSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Hello!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          {/* End .col */}
          <div className="row">
            <div className="col-xl-8 col-lg-12">
              {/* <!-- Graph widget --> */}
              <div className="graph-widget ls-widget">
                <PackageListingsTable />
              </div>
              {/* End profile chart */}
            </div>
            {/* End .col */}

            <div className="col-xl-4 col-lg-12">
              {/* <!-- Notification Widget --> */}
              <div className="notification-widget ls-widget">
                <div className="widget-title">
                  <h4>Add Package</h4>
                </div>
                <div className="widget-content">
                  <AddPackage />
                </div>
              </div>
            </div>
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
