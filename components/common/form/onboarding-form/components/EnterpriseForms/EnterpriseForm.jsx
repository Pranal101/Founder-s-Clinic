"use client";
import Link from "next/link";
import Select from "react-select";

const PostBoxForm = () => {
  const entitySize = [
    { value: "Micro/Home grown", label: "Micro/Home grown" },
    { value: "Small/Medium", label: "Small/Medium" },
    { value: "Large Scale/Corporate", label: "Large Scale/Corporate" },
  ];

  return (
    <form className="default-form">
      <div className="row">
        <div className="sec-title text-center">
          <h3>About your entity</h3>
        </div>
        {/* <!-- About Company --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Entity's Name</label>
          <input type="text" name="name" placeholder="Name of the entity" />
        </div>
        {/* <!-- About Company --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Size </label>
          <Select
            defaultValue={[entitySize[0]]}
            name="colors"
            options={entitySize}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        {/* <!-- About Company --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input type="text" name="name" placeholder="Email" />
        </div>
        {/* <!-- About Company --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input type="text" placeholder="Contact number" />
        </div>
        {/* <!-- About Company --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Location</label>
          <select className="chosen-single form-select">
            <option>Australia</option>
            <option>Pakistan</option>
            <option>Chaina</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>
        {/* <!-- About Company --> */}{" "}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select className="chosen-single form-select">
            <option>Melbourne</option>
            <option>Pakistan</option>
            <option>Chaina</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>
        {/* <!-- About Company --> */}{" "}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
          />
        </div>
        <div className="sec-title text-center">
          <h3>About yourself</h3>
        </div>
        {/* <!-- About yourself --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input type="text" name="firstName" placeholder="First Name" />
        </div>
        {/* <!-- About yourself --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input type="text" name="lastName" placeholder="Last Name" />
        </div>
        {/* <!-- About yourself --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Role</label>
          <input type="text" placeholder="Role" />
        </div>
        {/* <!-- About yourself --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number(What'sApp)</label>
          <input type="text" name="name" placeholder="Contact Number" />
        </div>
        {/* <!-- Conditions checkbox --> */}
        <div className="form-group col-lg-12 col-md-12">
          <div className="field-outer">
            <div className="input-group new-checkboxes square">
              <input type="checkbox" name="accept-terms" id="accept-terms" />
              <label htmlFor="accept-terms" className="accept-terms">
                <span className="custom-checkbox"></span> I accept Founders
                Clinic’s Terms & Condition
              </label>
            </div>
          </div>
        </div>
        <div className="form-group col-lg-12 col-md-12 text-right">
          <Link
            href="/onboarding/enterprise-onboarding/form-2"
            className="theme-btn btn-style-one"
          >
            Next
          </Link>
          {/* <button className="theme-btn btn-style-one">Next</button> */}
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
