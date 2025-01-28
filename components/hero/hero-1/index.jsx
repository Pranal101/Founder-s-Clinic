import SearchForm from "../../common/job-search/SearchForm";
import ImageBox from "./ImageBox";
import PopularSearch from "../PopularSearch";

const index = () => {
  return (
    <section className="banner-section">
      <div className="auto-container">
        <div className="row">
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div
              className="inner-column"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="title-box">
                <h3>
                  Unlock the right business resources-{" "}
                  <span className="colored">
                    smartly matched by AI.
                    <br />
                  </span>
                </h3>
                <div className="text">
                  Register on the platform for free and tell us what you need,
                  we will do the rest.
                </div>
              </div>
              <div className="form-group col-lg-12 col-md-12 text-right">
                <button
                  className="theme-btn btn-style-one"
                  data-bs-toggle="modal"
                  data-bs-target="#registerModal"
                >
                  Register Now
                </button>
              </div>
              {/* <!-- Job Search Form --> */}
              {/* <div className="job-search-form">
                <SearchForm />
              </div> */}
              {/* <!-- Job Search Form --> */}

              {/* <!-- Popular Search --> */}
              {/* <PopularSearch /> */}
              {/* <!-- End Popular Search --> */}
            </div>
          </div>
          {/* End .col */}

          <div className="image-column col-lg-5 col-md-12">
            <ImageBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
