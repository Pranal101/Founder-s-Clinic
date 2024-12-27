"use client";
import Link from "next/link";
import Select from "react-select";

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
  const preferences = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Retail", label: "Retail" },
    { value: "Remote", label: "Remote" },
    { value: "Onsite", label: "Onsite" },
    { value: "Hybrid", label: "Hybrid" },
  ];
  const skills = [
    { value: "Communication Skills", label: "Communication Skills" },
    { value: "Research and Analysis", label: "Research and Analysis" },
    { value: "Data Entry", label: "Data Entry" },
    {
      value: "Marketing and Social Media",
      label: "Marketing and Social Media",
    },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Web Development", label: "Web Development" },
    { value: "Content Writing", label: "Content Writing" },
    { value: "Financial Analysis", label: "Financial Analysis" },
    { value: "Administrative Support", label: "Administrative Support" },
    { value: "Project Management", label: "Project Management" },
  ];

  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input type="text" name="name" placeholder="firstName" />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input type="text" name="name" placeholder="lastName" />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input type="text" name="name" placeholder="" />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number(WhatsApp)</label>
          <input type="text" name="name" placeholder="Contact Number" />
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
            href="/onboarding/intern-onboarding/form-2"
            className="theme-btn btn-style-one"
          >
            Next
          </Link>
        </div>
        <div className="row">
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Full Name" />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Email Address</label>
            <input type="text" name="name" placeholder="" />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Contact Number</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>LinkedIn Profile Link</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* Education */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Current Educational Status</label>
            <select className="chosen-single form-select">
              <option>Select</option>
              <option>Undergraduate Student</option>
              <option>Graduate Student</option>
              <option>Recent Graduate</option>
            </select>
          </div>
          {/* <!-- Education --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Institution Name</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Education --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Field of Study/Major</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Education --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Expected Graduation Date (or Graduation Year)</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Education --> */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>GPA </label>
          <input type="text" name="name" placeholder="" />
        </div> */}
          {/* <!-- Education --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Relevant Coursework or Certifications</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Internship Interests and Preferences --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>What type of internship are you seeking? </label>
            <Select
              // defaultValue={[preferences[2]]}
              isMulti
              name="colors"
              options={preferences}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          {/* <!-- Internship Interests and Preferences --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Preferred Internship Duration </label>
            <select className="chosen-single form-select">
              <option>Select</option>
              <option>1-3 Months</option>
              <option>3-6 Months</option>
              <option>6-12 Months</option>
            </select>
          </div>
          {/* <!-- Internship Interests and Preferences --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Preferred Start Date</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Internship Interests and Preferences --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Preferred Industries</label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Technology, Finance, Marketing, Healthcare, etc."
            />
          </div>
          {/* <!-- Internship Interests and Preferences --> */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>Preferred Roles</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., Marketing Intern, Software Development Intern, HR Intern"
          />
        </div> */}

          {/* <!-- Internship Interests and Preferences --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Preferred Location</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Skills and Qualifications --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>What skills do you bring to the internship? </label>
            <Select
              // defaultValue={[preferences[2]]}
              isMulti
              name="colors"
              options={skills}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          {/* <!-- Skills and Qualifications --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              Please list any software, tools, or platforms you are proficient
              in
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Microsoft Office, Google Suite, Adobe Creative Cloud, programming languages, etc."
            />
          </div>
          {/*  Work Experience --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              Do you have any previous work or internship experience?
            </label>
            <select className="chosen-single form-select">
              <option>Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          {/*  Work Experience --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              If yes, please describe your most relevant work or internship
              experiences
            </label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/*  Work Experience --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Company/Organization Name</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/*  Work Experience --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Role</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/*  Work Experience --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Duration</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/*  Work Experience --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Responsibilities and Key Achievements</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* Availability and Work Preferences */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>What is your weekly availability?</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., 10-20 hours/week, 20-30 hours/week, full-time"
          />
        </div> */}
          {/* Availability and Work Preferences */}
          {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have any scheduling restrictions or specific times you are
            available to work?
          </label>
          <input type="text" name="name" placeholder="" />
        </div> */}
          {/* Availability and Work Preferences */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              Do you have any scheduling restrictions or specific times you are
              available to work?
            </label>
            <select className="chosen-single form-select">
              <option>Select</option>
              <option>Teamwork</option>
              <option>Independent</option>
              <option>Both</option>
            </select>
          </div>
          {/* Projects and Portfolio */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              Do you have a portfolio or examples of work that you would like to
              showcase?
            </label>
            <select className="chosen-single form-select">
              <option>Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          {/* Projects and Portfolio */}
          <div className="form-group col-lg-6 col-md-12">
            <label>If yes, please provide link for the portfolio</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* Projects and Portfolio */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              Please list any relevant projects you have worked on that
              demonstrate your skills
            </label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* References */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Provide any references if availabile</label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* Additional Info */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              Is there anything else you would like to add about yourself or
              your interests?
            </label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* Additional Info */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              Do you have any specific questions or expectations from the
              internship provider?
            </label>
            <input type="text" name="name" placeholder="" />
          </div>
          {/* <!-- Conditions checkbox --> */}
          <div className="form-group col-lg-12 col-md-12">
            <div className="field-outer">
              <div className="input-group new-checkboxes square">
                <input type="checkbox" name="accept-terms" id="accept-terms" />
                <label htmlFor="accept-terms" className="accept-terms">
                  <span className="custom-checkbox"></span> I agree to the terms
                  & conditions and authorize Founders Clinic to contact me on
                  the number provided. This will override the registry with
                  DNC/NDNC.
                </label>
              </div>
            </div>
          </div>
          {/* <!-- Input --> */}
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
