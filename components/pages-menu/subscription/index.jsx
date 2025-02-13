import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader from "../../header/DefaulHeader";
import MobileMenu from "../../header/MobileMenu";
import MemberPlan from "./membershipPlanSection";
import InternPlan from "./internPlan";
import EnterpirsePlan from "./enterprisePlan";
import NetworkingPlan from "./networkingPlan";

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

      {/* Professional Plans*/}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="sec-title text-center">
                    <h2>Find the Best Services for Your Enterprise</h2>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    {/* <div className="table-outer"> */}
                    <MemberPlan />
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
      {/* Professional Plans END*/}

      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="sec-title text-center">
                    <h2>Find the Best Services for Your Enterprise</h2>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    {/* <div className="table-outer"> */}
                    <EnterpirsePlan />
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
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="sec-title text-center">
                    <h2>Find the Best Services for Your Enterprise</h2>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    {/* <div className="table-outer"> */}
                    <NetworkingPlan />
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
      {/* <!-- End TNC Section --> */}

      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="sec-title text-center">
                    <h2>Find the Best Services for Your Enterprise</h2>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    {/* <div className="table-outer"> */}
                    <InternPlan />
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

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
