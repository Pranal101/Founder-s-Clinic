"use client";
import Link from "next/link";

const PostBoxForm = () => {
  const specialisms = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];
  const servicesProvided = [
    {
      value: "Business Consulting",
      label: "Business Consulting",
    },
    {
      value: "Financial Planning and Advisory",
      label: "Financial Planning and Advisory",
    },
    { value: "Marketing and Branding", label: "Marketing and Branding" },
    {
      value: "Human Resources and Recruitment",
      label: "Human Resources and Recruitment",
    },
    {
      value: "Operations and Process Optimization",
      label: "Operations and Process Optimization",
    },
    { value: "Legal Services", label: "Legal Services" },
    { value: "Project Management", label: "Project Management" },
    {
      value: "Coaching and Mentoring",
      label: "Coaching and Mentoring",
    },
    { value: "IT and tech support", label: "IT and tech support" },
    { value: "Administrative Support", label: "Administrative Support" },
  ];
  const pricingModel = [
    {
      value: "Hourly Rate",
      label: "Hourly Rate",
    },
    {
      value: "Fixed project fee",
      label: "Fixed project fee",
    },
    { value: "Retainer", label: "Retainer" },
    {
      value: "Subscription-based",
      label: "Subscription-based",
    },
  ];
  const serviceDelivery = [
    {
      value: "Onsite",
      label: "Onsite",
    },
    {
      value: "Remote/Virtual",
      label: "Remote/Virtual",
    },
    { value: "Hybrid", label: "Hybrid" },
  ];

  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input type="text" name="firstName" placeholder="First name" />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input type="text" name="lastName" placeholder="Last name" />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Entity Name</label>
          <input type="text" placeholder="Entity name" />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Role</label>
          <input type="text" placeholder="Role" />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input type="text" name="name" placeholder="" />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input type="text" placeholder="Contact Number" />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select className="chosen-single form-select">
            <option>Australia</option>
            <option>Pakistan</option>
            <option>Chaina</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>

        {/* <!-- Input --> */}
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

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
          />
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
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-12 col-md-12">
          <button className="theme-btn btn-style-three">Search Location</button>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <div className="map-outer">
            <div style={{ height: "420px", width: "100%" }}>
              <Map />
            </div>
          </div>
        </div> */}

        {/* <!-- Button --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <Link
            href="/onboarding/professional-onboarding/form-2"
            className="theme-btn btn-style-one"
          >
            Next
          </Link>
        </div>
        <div className="row">
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Full Name</label>
            <input type="text" name="firstName" placeholder="Full name" />
          </div>
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Business/Company Name</label>
            <input type="text" name="lastName" placeholder="Company name" />
          </div>
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Position/Title</label>
            <input type="text" placeholder="Entity name" />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Email Address</label>
            <input type="text" name="name" placeholder="Email Address" />
          </div>
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Contact Number</label>
            <input type="text" placeholder="Contact Number" />
          </div>
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Website Link</label>
            <input type="text" placeholder="Role" />
          </div>
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Social Media Link</label>
            <input type="text" placeholder="LinkedIn, Twitter, etc." />
          </div>
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Country</label>
            <select className="chosen-single form-select">
              <option>Australia</option>
              <option>Pakistan</option>
              <option>Chaina</option>
              <option>Japan</option>
              <option>India</option>
            </select>
          </div>

          {/* <!-- Input --> */}
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

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Complete Address</label>
            <input
              type="text"
              name="name"
              placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
            />
          </div>
          {/* <!-- Professional Background --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Years of Experience</label>
            <input type="text" name="name" placeholder="Experience" />
          </div>
          {/* <!-- Professional Background --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Educational Background</label>
            <input type="text" name="name" placeholder="Education" />
          </div>
          {/* <!-- Professional Background --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Certifications, Licenses, or Accreditations</label>
            <input type="text" name="name" placeholder="Certificates" />
          </div>
          {/* <!-- Professional Background --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Professional Associations or Memberships</label>
            <input type="text" name="name" placeholder="Associations" />
          </div>
          {/* <!-- Services Offerred --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>What types of business support services do you offer?</label>
            <Select
              // defaultValue={[servicesProvided[0]]}
              name="colors"
              isMulti
              options={servicesProvided}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          {/* <!-- Services Offerred --> */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>Provide description of each service you offer</label>
          <input type="text" name="name" placeholder="description" />
        </div> */}
          {/* <!-- Services Offerred --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Who are your primary clients?</label>
            <input
              type="text"
              name="name"
              placeholder="e.g., startups, small businesses, corporations, specific industries"
            />
          </div>
          {/* <!-- Service Delivery and Approach --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>How do you deliver your services?</label>
            <Select
              // defaultValue={[servicesProvided[0]]}
              name="colors"
              isMulti
              options={serviceDelivery}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          {/* <!-- Service Delivery and Approach --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              What is your typical process when working with clients?
            </label>
            <input
              type="text"
              name="name"
              placeholder="Briefly describe how you engage with clients, from consultation to execution."
            />
          </div>

          {/* <!-- Service Delivery and Approach --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              What is your typical process when working with clients?
            </label>
            <input
              type="text"
              name="name"
              placeholder="Briefly describe how you engage with clients, from consultation to execution."
            />
          </div>
          {/* <!-- Service Delivery and Approach --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Do you offer customized solutions for businesses?</label>
            <select className="chosen-single form-select">
              <option></option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          {/* <!-- Pricing and Packages --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>What is your pricing model?</label>
            <Select
              // defaultValue={[servicesProvided[0]]}
              name="colors"
              isMulti
              options={pricingModel}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          {/* <!-- Pricing and Packages --> */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>Do you offer different service packages?</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Basic Package</option>
            <option>Standard Package</option>
            <option>Premium Package</option>
          </select>
        </div> */}
          {/* <!-- Pricing and Packages --> */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Please describe the pricing and services included in each package
          </label>
          <input type="text" name="name" placeholder="" />
        </div> */}
          {/* <!-- Value Proposition --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              What differentiates you from other professionals offering similar
              services?
            </label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Value Proposition --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              What are the key pain points you help businesses solve?
            </label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Value Proposition --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Do you have any specific industry expertise?</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Value Proposition --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              How do your services contribute to business growth or operational
              efficiency?
            </label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* Client Success Stories and Testimonials */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Please share a few client success stories or case studies.
          </label>
          <input type="text" name="name" placeholder="" />
        </div> */}
          {/* Client Success Stories and Testimonials */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have client testimonials you would like to feature?
          </label>
          <input
            type="text"
            name="name"
            placeholder="Please provide quotes or links if available."
          />
        </div> */}
          {/* Collaboration and Partnerships */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you collaborate with other professionals or businesses to offer
            bundled services?
          </label>
          <input type="text" name="name" placeholder="" />
        </div> */}
          {/* Collaboration and Partnerships */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>If yes, please describe any notable partnerships.</label>
          <input type="text" name="name" placeholder="" />
        </div> */}
          {/* Tools and Technology */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            What tools or platforms do you use to manage or deliver your
            services?
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g., CRM tools, project management software, communication tools"
          />
        </div> */}
          {/* Tools and Technology */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Are there any specific features you look for in a digital platform
            to enhance your service delivery?
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g., client management, scheduling, payment processing"
          />
        </div> */}
          {/* <!-- Availability --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>What is your typical availability for new clients?</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Availability --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Do you offer free consultations?</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Availability --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              What is the best way for potential clients to reach you?
            </label>
            <input type="text" name="name" placeholder="" />
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

          {/* <!-- Button --> */}
          <div className="form-group col-lg-12 col-md-12 text-right">
            <Link
              href="/candidates-dashboard/dashboard"
              className="theme-btn btn-style-one"
            >
              Submit
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
