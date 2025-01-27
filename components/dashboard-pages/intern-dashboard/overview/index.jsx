import FooterDefault from "@/components/footer/common-footer";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import MobileMenu from "@/components/header/MobileMenu";
import FilterTopBox from "./FilterTopBox";

const Index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <section className="ls-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Listed Interns</h2>
          </div>
          <div className="row">
            <div className="content-column col-lg-12 col-md-12 col-sm-12">
              <div className="ls-outer">
                <FilterTopBox />
                {/* <!-- ls Switcher --> */}
              </div>
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default Index;
