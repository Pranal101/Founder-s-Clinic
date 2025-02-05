"use client";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Select from "react-select";
import LogoCoverUploader from "./LogoCoverUploader";
import { toast } from "react-toastify";

const PostBoxForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    entityName: "",
    gst: "",
    organizationRole: "",
    email2: "",
    contactNumber2: "",
    position: "",
    websiteLink: "",
    socialMediaLinks: "",
    experienceYears: "",
    qualification: "",
    otherQualification: "",
    certifications: "",
    associations: "",
    servicesOffered: [],
    skills: [],
    // otherServiceOffered: "",
    painPoints: "",
    industryExpertise: "",
    clientTestimonials: "",
    acceptTerms: false,
  });
  const servicesProvided = [
    {
      label: "Accounting / Book Keeping",
      options: [
        { value: "Bookkeeping - Domestic", label: "Bookkeeping - Domestic" },
        { value: "Bookkeeping - Overseas", label: "Bookkeeping - Overseas" },
        {
          value: "Financial Planning & Reporting",
          label: "Financial Planning & Reporting",
        },
      ],
    },
    {
      label: "Taxation",
      options: [
        {
          value: "Income Tax - Compliance, ITR Filing and Assessment",
          label: "Income Tax - Compliance, ITR Filing and Assessment",
        },
        {
          value: "GST Compliance, Return Filing and Assessment",
          label: "GST Compliance, Return Filing and Assessment",
        },
        { value: "NRI Taxation", label: "NRI Taxation" },
      ],
    },
    {
      label: "Registration / Compliance/ Certification",
      options: [
        { value: "MSME (Udyam)", label: "MSME (Udyam)" },
        { value: "GST", label: "GST" },
        { value: "FSSAI", label: "FSSAI" },
        {
          value: "ISO/ GMP Quality assurance Certification",
          label: "ISO/ GMP Quality assurance Certification",
        },
        {
          value: "Startup India / DPIIT registration",
          label: "Startup India / DPIIT registration",
        },
        {
          value: "Partnership / LLP / OPC / Pvt. Ltd. registration",
          label: "Partnership / LLP / OPC / Pvt. Ltd. registration",
        },
        {
          value: "Intellectual properties (Trademark/ Copyright)",
          label: "Intellectual properties (Trademark/ Copyright)",
        },
        { value: "Contracts", label: "Contracts" },
      ],
    },
    {
      label: "Reports",
      options: [
        { value: "Business Plan", label: "Business Plan" },
        { value: "Project Report", label: "Project Report" },
        { value: "Financial projections", label: "Financial projections" },
        { value: "Pitch Deck", label: "Pitch Deck" },
      ],
    },
    {
      label: "Finance & Government Assistance",
      options: [
        {
          value:
            "Guidance of Relevant Govt. Schemes (Grant, Subsidies and Debt)",
          label:
            "Guidance of Relevant Govt. Schemes (Grant, Subsidies and Debt)",
        },
        { value: "MSME Assistance", label: "MSME Assistance" },
        {
          value: "Bank and NBFC business loans",
          label: "Bank and NBFC business loans",
        },
        {
          value: "Private Equity / Venture capital",
          label: "Private Equity / Venture capital",
        },
      ],
    },
    {
      label: "Marketing & Social Media",
      options: [
        { value: "Content creation", label: "Content creation" },
        {
          value: "Graphic designing (Logo, Brochure, Poster, PPT, etc.)",
          label: "Graphic designing (Logo, Brochure, Poster, PPT, etc.)",
        },
        {
          value: "Social Media Strategy / Management",
          label: "Social Media Strategy / Management",
        },
        {
          value: "Branding (Strategy / Consultancy)",
          label: "Branding (Strategy / Consultancy)",
        },
        {
          value: "E-commerce account management",
          label: "E-commerce account management",
        },
        { value: "Influencer Marketing", label: "Influencer Marketing" },
        { value: "Lead Generation", label: "Lead Generation" },
        { value: "Video presentation", label: "Video presentation" },
        { value: "Product photography", label: "Product photography" },
      ],
    },
    {
      label: "IT/ Technology Support",
      options: [
        {
          value: "Website / Application development",
          label: "Website / Application development",
        },
        { value: "Business Softwares", label: "Business Softwares" },
        { value: "Software development", label: "Software development" },
        { value: "Cyber security", label: "Cyber security" },
      ],
    },
    {
      label: "Training / Coaching",
      options: [
        { value: "Soft skill training", label: "Soft skill training" },
        { value: "Business coaching", label: "Business coaching" },
      ],
    },
    {
      label: "Consultancy & strategic advice",
      options: [
        { value: "Mentoring & handholding", label: "Mentoring & handholding" },
        { value: "Business growth", label: "Business growth" },
        { value: "Market analysis", label: "Market analysis" },
        { value: "Strategic planning", label: "Strategic planning" },
        { value: "Business automation", label: "Business automation" },
      ],
    },
    {
      label: "Human Resource",
      options: [
        { value: "Hiring", label: "Hiring" },
        { value: "Employee management", label: "Employee management" },
        { value: "Performance review", label: "Performance review" },
      ],
    },
    {
      label: "Interns",
      options: [{ value: "Interns", label: "Interns" }],
    },
    {
      label: "Business Wellness",
      options: [
        {
          value: "Goal Setting / Success motivation sessions",
          label: "Goal Setting / Success motivation sessions",
        },
        {
          value:
            "Corporate Astrology / Numerology / Industrial Vastu consultancy",
          label:
            "Corporate Astrology / Numerology / Industrial Vastu consultancy",
        },
        {
          value: "Business wellness retreats",
          label: "Business wellness retreats",
        },
      ],
    },
    {
      label: "Services to Medium & Large Enterprises",
      options: [
        { value: "Transaction Structuring", label: "Transaction Structuring" },
        { value: "Merger & Acquisition", label: "Merger & Acquisition" },
        {
          value: "Consultancy for Cross Border Transactions",
          label: "Consultancy for Cross Border Transactions",
        },
        { value: "Virtual CFO", label: "Virtual CFO" },
        {
          value: "Debt syndication in high ticket size",
          label: "Debt syndication in high ticket size",
        },
        { value: "Investor connect", label: "Investor connect" },
        { value: "External directorship", label: "External directorship" },
        {
          value: "System Development & Audit",
          label: "System Development & Audit",
        },
      ],
    },
  ];
  const skills = [
    { value: "Accounting", label: "Accounting" },
    { value: "Auditing", label: "Auditing" },
    { value: "Compliance", label: "Compliance" },
    { value: "Taxation", label: "Taxation" },
    { value: "Finance", label: "Finance" },
    { value: "Hr", label: "HR" },
    { value: "Marketing", label: "Marketing" },
    { value: "It", label: "IT" },
    { value: "Mentoring", label: "Mentoring" },
    { value: "Graphic Designing", label: "Graphic Designing" },
    { value: "Training", label: "Training" },
    {
      value: "Astrology / Numerology / Vastu",
      label: "Astrology / Numerology / Vastu",
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
  const qualificationOptions = [
    { value: "MBA", label: "MBA" },
    { value: "BE", label: "BE" },
    { value: "BTech", label: "BTech" },
    { value: "MTech", label: "MTech" },
    { value: "BCom", label: "BCom" },
    { value: "MCom", label: "MCom" },
    { value: "BA", label: "BA" },
    { value: "MA", label: "MA" },
    { value: "PhD", label: "PhD" },
    { value: "Other", label: "Other" },
  ];
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (selectedOptions, action) => {
    setFormData({
      ...formData,
      [action.name]: Array.isArray(selectedOptions)
        ? selectedOptions.map((option) => option.value)
        : selectedOptions.value,
    });
  };
  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast.error("You must accept the terms and conditions!");
      return;
    }
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const userToken = await user.getIdToken();

      if (!userToken) {
        throw new Error("User not authenticated");
      }

      const response = await axios.patch(
        "https://founders-clinic-backend.onrender.com/api/user/profile", // Replace with your actual endpoint
        { profileData: formData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      if (file) {
        const formDataObj = new FormData();
        formDataObj.append("userId", user.uid); // Replace with the actual user ID
        formDataObj.append("profileType", "EnterpriseProfile"); // Example value
        formDataObj.append("documentType", "Resume"); // Example value
        formDataObj.append("documentName", file.name); // File name
        formDataObj.append("file", file); // The uploaded file

        const fileUploadResponse = await axios.post(
          "https://founders-clinic-backend.onrender.com/api/user/upload",
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        console.log("File uploaded successfully:", fileUploadResponse.data);
      }
      // Redirect or show success message
      window.location.assign("/candidates-dashboard/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Current Business/Company Name(if applicable)</label>
          <input
            type="text"
            name="entityName"
            placeholder="Current company name"
            value={formData.entityName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>GST no. (if registered under GST)</label>
          <input
            type="text"
            placeholder="Gst Number"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Position/Title</label>
          <input
            name="organizationRole"
            type="text"
            placeholder="Organization Role"
            value={formData.organizationRole}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email</label>
          <input
            name="email2"
            type="text"
            placeholder="Email"
            value={formData.email2}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input
            name="contactNumber2"
            type="text"
            placeholder="Contact Number"
            value={formData.contactNumber2}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Portfolio (if any)</label>
          <input
            name="portfolio"
            type="text"
            placeholder="Portfolio Url"
            value={formData.portfolio}
            onChange={handleChange}
          />
        </div> */}
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website Link</label>
          <input
            name="websiteLink"
            type="text"
            placeholder="Website Link"
            value={formData.websiteLink}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Social Media Link</label>
          <input
            name="socialMediaLinks"
            type="text"
            placeholder="LinkedIn, Twitter, etc."
            value={formData.socialMediaLinks}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Professional Background --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Years of Experience in Business Support Services</label>
          <input
            type="text"
            name="experienceYears"
            placeholder="Experience"
            value={formData.experienceYears}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Professional Background --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
          />
        </div> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <Select
            name="qualification"
            options={qualificationOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={qualificationOptions.filter((option) =>
              formData.qualification.includes(option.value)
            )}
            onChange={handleSelectChange}
          />
        </div>
        {/* Conditionally render input field for "Other" */}
        {formData.qualification.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please Specify</label>
            <input
              type="text"
              name="otherQualification"
              value={formData.otherQualification || ""}
              onChange={handleChange} // Using the existing handleChange
              placeholder="Please specify your qualification"
              required
            />
          </div>
        )}
        {/* <!-- Professional Background --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Certifications, Licenses, or Accreditations</label>
          <input
            type="text"
            name="certifications"
            placeholder="Certificates"
            value={formData.certifications}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Professional Background --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Professional Associations or Memberships</label>
          <input
            type="text"
            name="associations"
            placeholder="Associations"
            value={formData.associations}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Services Offerred --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What types of business support services do you offer?</label>
          <Select
            name="servicesOffered"
            isMulti
            options={servicesProvided} // Grouped options
            className="basic-multi-select"
            classNamePrefix="select"
            formatGroupLabel={(data) => (
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#007bff",
                  borderRadius: "5px",
                }}
              >
                {data.label}
              </div>
            )}
            value={servicesProvided
              .flatMap((group) => group.options)
              .filter((option) =>
                formData.servicesOffered.includes(option.value)
              )}
            onChange={handleSelectChange}
          />
        </div>
        {/* Conditionally render input field for "Other" */}
        {/* {formData.servicesOffered.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please Specify</label>
            <input
              type="text"
              name="otherServiceOffered"
              value={formData.otherServiceOffered || ""}
              onChange={handleChange} // Using the existing handleChange
              placeholder="Please specify your services"
              required
            />
          </div>
        )} */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Skills</label>
          <Select
            // defaultValue={[preferences[2]]}
            isMulti
            name="skills"
            options={skills}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) => handleMultiSelectChange(selected, "skills")}
          />
        </div>
        {/* <!-- Value Proposition --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What are the key pain points you help businesses solve?</label>
          <input
            type="text"
            name="painPoints"
            placeholder=""
            value={formData.painPoints}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Value Proposition --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Do you have any specific industry expertise?</label>
          <input
            type="text"
            name="industryExpertise"
            placeholder=""
            value={formData.industryExpertise}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Value Proposition --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            How do your services contribute to business growth or operational
            efficiency?
          </label>
          <input
            type="text"
            name="contribution"
            placeholder=""
            value={formData.contribution}
            onChange={handleChange}
          />
        </div> */}
        {/* <!-- Availability --> */}
        {/* <!-- Availability --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have client testimonials you would like to feature?
          </label>
          <input
            type="text"
            name="clientTestimonials"
            placeholder="Please provide quotes or links if available."
            value={formData.clientTestimonials}
            onChange={handleChange}
          />
        </div>
        <LogoCoverUploader />

        {/* <!-- Conditions checkbox --> */}
        <div className="form-group col-lg-12 col-md-12">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input
                type="checkbox"
                name="acceptTerms"
                id="accept-terms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
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
          <button type="submit" className="theme-btn btn-style-one">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
