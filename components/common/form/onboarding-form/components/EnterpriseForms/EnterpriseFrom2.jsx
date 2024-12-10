"use client";
import Link from "next/link";
import Select from "react-select";

const PostBoxForm = () => {
  const businessRegistration = [
    {
      value: "Registered Company",
      label: "Registered Company",
    },
    { value: "Startup", label: "Startup" },
    { value: "Sole Proprietorship", label: "Sole Proprietorship" },
  ];
  const servicesProvided = [
    {
      value: "Talent acquisition or recruitment",
      label: "Talent acquisition or recruitment",
    },
    {
      value: "Networking with other entrepreneurs",
      label: "Networking with other entrepreneurs",
    },
    { value: "Finding business partners", label: "Finding business partners" },
    { value: "Access to investors", label: "Access to investors" },
    { value: "Mentorship and advisory", label: "Mentorship and advisory" },
    { value: "Legal support", label: "Legal support" },
    { value: "Marketing support", label: "Marketing support" },
    {
      value: "Financial or accounting services",
      label: "Financial or accounting services",
    },
    { value: "IT and tech support", label: "IT and tech support" },
  ];

  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Business Name</label>
          <input type="text" name="name" placeholder="Business Name" />
        </div>
        {/* <!-- Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input type="text" name="name" placeholder="Email" />
        </div>
        {/* <!-- Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Year Founded</label>
          <input type="text" name="name" placeholder="Year Founded" />
        </div>
        {/* <!-- Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Business Registration (if applicable) </label>
          <Select
            defaultValue={[businessRegistration[0]]}
            name="colors"
            options={businessRegistration}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        {/* <!-- Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input type="text" placeholder="Contact number" />
        </div>
        {/* <!-- Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website Link</label>
          <input type="text" placeholder="Website url" />
        </div>
        {/* <!--Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Social Media Links</label>
          <input type="text" placeholder="LinkedIn, Twitter, etc" />
        </div>
        {/* <!-- Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Location</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Australia</option>
            <option>Pakistan</option>
            <option>Chaina</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>
        {/* <!-- Basic info --> */}{" "}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Melbourne</option>
            <option>Pakistan</option>
            <option>Chaina</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>
        {/* <!-- Basic info -->
        <div className="form-group col-lg-6 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
          />
        </div> */}
        {/* <!-- Bussiness info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Industry/Sector</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., Technology, Finance, Retail, Manufacturing, etc."
          />
        </div>
        {/* <!-- Bussiness info --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Business Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div>
        {/* <!-- Bussiness info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Mission Statement</label>
          <input type="text" name="name" placeholder="Mission" />
        </div>
        {/* <!-- Bussiness info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Vision</label>
          <input type="text" name="name" placeholder="Vision" />
        </div>
        {/* <!-- Bussiness info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Core value</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., Technology, Finance, Retail, Manufacturing, etc."
          />
        </div>
        {/* <!-- Bussiness info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Current Business Stage</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Early-stage startup</option>
            <option>Growth-stage</option>
            <option>Established business</option>
          </select>
        </div>
        {/* <!-- Bussiness offerings --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Mention products or services your business offers</label>
          <input type="text" name="name" placeholder="e.g. Service" />
        </div>
        {/* <!-- Bussiness offerings --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Target Market</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., B2B, B2C, specific demographics, industries"
          />
        </div>
        {/* <!-- Bussiness offerings --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Unique Selling Proposition (USP)</label>
          <input type="text" name="name" placeholder="USP" />
        </div>
        {/* <!-- Bussiness offerings --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Mention key Products/Services</label>
          <input type="text" name="name" placeholder="Key products/services" />
        </div>
        {/* <!-- Bussiness Model --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Mention your business model</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., Subscription-based, one-time sales, freemium, SaaS, consulting"
          />
        </div>
        {/* <!-- Bussiness Model --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Revenue Streams</label>
          <input
            type="text"
            name="name"
            placeholder="Primary sources of revenue"
          />
        </div>
        {/* <!-- Bussiness Model --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Number of active customers/users</label>
          <input type="text" name="name" placeholder="Active Customers" />
        </div>
        {/* <!-- Bussiness Model --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Geographic reach</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Local</option>
            <option>National</option>
            <option>International</option>
          </select>
        </div>
        {/* <!-- Team Details --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Team Size</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>1-10 employees</option>
            <option>11-50 employees</option>
            <option>51-200 employees</option>
            <option>More than 200 employees</option>
          </select>
        </div>
        {/* <!-- Team Details --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Currently Hiring</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* <!-- Team Details --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>If yes then specify roles</label>
          <input type="text" name="name" placeholder="Hiring roles" />
        </div>
        {/* <!-- Bussiness Goals --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Mention your short-term goals(next 6-12 months)</label>
          <input type="text" name="name" placeholder="Active Customers" />
        </div>
        {/* <!-- Bussiness Goals --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Mention your long-term goals(next 1-5 years)</label>
          <input type="text" name="name" placeholder="Active Customers" />
        </div>
        {/* <!-- Bussiness Goals --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Are you looking for partners or investors to achieve these goals?
          </label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Yes</option>
            <option>No</option>
            <option>Maybe</option>
          </select>
        </div>
        {/* <!-- Bussiness Goals --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Mention the key challenges your business is currently facing
          </label>
          <input type="text" name="name" placeholder="Shortage of staff" />
        </div>
        {/* <!-- Funding --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Have you raised any funding?</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* <!-- Funding --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>If yes then specify the funding amount</label>
          <input type="text" name="name" placeholder="Funding amount" />
        </div>
        {/* <!-- Funding --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What funding stage is your business currently in?</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Pre-seed</option>
            <option>Seed</option>
            <option>Series A </option>
            <option>Series B or later</option>
          </select>
        </div>
        {/* <!-- Funding --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Are you currently seeking funding or investment?</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* <!-- Funding --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>If yes, how much funding are you seeking?</label>
          <input type="text" name="name" placeholder="Funding amount" />
        </div>
        {/* <!-- Partnerships and Collaborations --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Are you open to partnerships or collaborations?</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* <!-- Partnerships and Collaborations --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            If yes, please describe the type of partnerships you’re looking for
          </label>
          <input type="text" name="name" placeholder="Funding amount" />
        </div>
        {/* <!-- Partnerships and Collaborations --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Are you open to partnerships or collaborations?</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* <!-- Partnerships and Collaborations --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>If yes, please describe current partnerships</label>
          <input type="text" name="name" placeholder="Funding amount" />
        </div>
        {/* <!-- Digital Presence and Tools --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you use any digital tools or platforms to manage your business?
          </label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* <!-- Digital Presence and Tools --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>If yes, please specify</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., CRM, project management, accounting software, etc."
          />
        </div>
        {/* <!-- Digital Presence and Tools --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>How do you currently promote your business online?</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Social Media</option>
            <option>Paid advertising</option>
            <option>Content marketing</option>
            <option>Email marketing</option>
          </select>
        </div>
        {/* <!-- Business Needs and Platform Expectations--> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            What types of services or solutions are you looking for on this
            platform?
          </label>
          <Select
            defaultValue={[servicesProvided[0]]}
            name="colors"
            isMulti
            options={servicesProvided}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        {/* <!-- Business Needs and Platform Expectations--> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What are your key expectations from the platform?</label>
          <select className="chosen-single form-select">
            <option></option>
            <option>Business growth opportunities</option>
            <option>Access to resources and tools</option>
            <option>Collaboration with like-minded businesses</option>
            <option>Access to funding</option>
            <option>Mentorship</option>
          </select>
        </div>
        {/* <!-- Success Stories and Achievements--> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Please share any notable achievements or milestones your business
            has reached
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g., awards, partnerships, revenue growth"
          />
        </div>
        {/* <!-- Success Stories and Achievements--> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have any customer testimonials or case studies to showcase?
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g., awards, partnerships, revenue growth"
          />
        </div>
        {/* <!--  Additional Information--> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Is there anything else you would like to add about your business?
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g., awards, partnerships, revenue growth"
          />
        </div>
        {/* <!-- Accept to terms --> */}
        <div className="form-group col-lg-12 col-md-12">
          <div className="field-outer">
            <div className="input-group new-checkboxes square">
              <input type="checkbox" name="accept-terms" id="accept-terms" />
              <label htmlFor="accept-terms" className="accept-terms">
                <span className="custom-checkbox"></span> I agree to the terms &
                conditions and authorize Founders Clinic to contact me on the
                number provided. This will override the registry with DNC/NDNC.
              </label>
            </div>
          </div>
        </div>
        {/* <!-- Button --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <Link href="/" className="theme-btn btn-style-one">
            Submit
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
