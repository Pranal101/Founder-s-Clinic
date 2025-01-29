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
        { value: "bookkeeping_domestic", label: "Bookkeeping - Domestic" },
        { value: "bookkeeping_overseas", label: "Bookkeeping - Overseas" },
        {
          value: "financial_planning_reporting",
          label: "Financial Planning & Reporting",
        },
      ],
    },
    {
      label: "Taxation",
      options: [
        {
          value: "income_tax",
          label: "Income Tax - Compliance, ITR Filing and Assessment",
        },
        {
          value: "gst_compliance",
          label: "GST Compliance, Return Filing and Assessment",
        },
        { value: "nri_taxation", label: "NRI Taxation" },
      ],
    },
    {
      label: "Registration / Compliance/ Certification",
      options: [
        { value: "msme", label: "MSME (Udyam)" },
        { value: "gst", label: "GST" },
        { value: "fssai", label: "FSSAI" },
        { value: "iso_gmp", label: "ISO/ GMP Quality assurance Certification" },
        { value: "startup_india", label: "Startup India / DPIIT registration" },
        {
          value: "business_registration",
          label: "Partnership / LLP / OPC / Pvt. Ltd. registration",
        },
        {
          value: "intellectual_property",
          label: "Intellectual properties (Trademark/ Copyright)",
        },
        { value: "contracts", label: "Contracts" },
      ],
    },
    {
      label: "Reports",
      options: [
        { value: "business_plan", label: "Business Plan" },
        { value: "project_report", label: "Project Report" },
        { value: "financial_projections", label: "Financial projections" },
        { value: "pitch_deck", label: "Pitch Deck" },
      ],
    },
    {
      label: "Finance & Government Assistance",
      options: [
        {
          value: "govt_schemes",
          label:
            "Guidance of Relevant Govt. Schemes (Grant, Subsidies and Debt)",
        },
        { value: "msme_assistance", label: "MSME Assistance" },
        { value: "bank_nbf_loan", label: "Bank and NBFC business loans" },
        { value: "private_equity", label: "Private Equity / Venture capital" },
      ],
    },
    {
      label: "Marketing & Social Media",
      options: [
        { value: "content_creation", label: "Content creation" },
        {
          value: "graphic_designing",
          label: "Graphic designing (Logo, Brochure, Poster, PPT, etc.)",
        },
        {
          value: "social_media_strategy",
          label: "Social Media Strategy / Management",
        },
        {
          value: "branding_strategy",
          label: "Branding (Strategy / Consultancy)",
        },
        {
          value: "ecommerce_management",
          label: "E-commerce account management",
        },
        { value: "influencer_marketing", label: "Influencer Marketing" },
        { value: "lead_generation", label: "Lead Generation" },
        { value: "video_presentation", label: "Video presentation" },
        { value: "product_photography", label: "Product photography" },
      ],
    },
    {
      label: "IT/ Technology Support",
      options: [
        {
          value: "website_app_development",
          label: "Website / Application development",
        },
        { value: "business_softwares", label: "Business Softwares" },
        { value: "software_development", label: "Software development" },
        { value: "cyber_security", label: "Cyber security" },
      ],
    },
    {
      label: "Training / Coaching",
      options: [
        { value: "soft_skill_training", label: "Soft skill training" },
        { value: "business_coaching", label: "Business coaching" },
      ],
    },
    {
      label: "Consultancy & strategic advice",
      options: [
        { value: "mentoring_handholding", label: "Mentoring & handholding" },
        { value: "business_growth", label: "Business growth" },
        { value: "market_analysis", label: "Market analysis" },
        { value: "strategic_planning", label: "Strategic planning" },
        { value: "business_automation", label: "Business automation" },
      ],
    },
    {
      label: "Human Resource",
      options: [
        { value: "hiring", label: "Hiring" },
        { value: "employee_management", label: "Employee management" },
        { value: "performance_review", label: "Performance review" },
      ],
    },
    {
      label: "Interns",
      options: [{ value: "interns", label: "Interns" }],
    },
    {
      label: "Business Wellness",
      options: [
        {
          value: "goal_setting",
          label: "Goal Setting / Success motivation sessions",
        },
        {
          value: "corporate_astrology",
          label:
            "Corporate Astrology / Numerology / Industrial Vastu consultancy",
        },
        {
          value: "business_wellness_retreats",
          label: "Business wellness retreats",
        },
      ],
    },
    {
      label: "Services to Medium & Large Enterprises",
      options: [
        { value: "transaction_structuring", label: "Transaction Structuring" },
        { value: "merger_acquisition", label: "Merger & Acquisition" },
        {
          value: "cross_border_consultancy",
          label: "Consultancy for Cross Border Transactions",
        },
        { value: "virtual_cfo", label: "Virtual CFO" },
        {
          value: "high_ticket_debt_syndication",
          label: "Debt syndication in high ticket size",
        },
        { value: "investor_connect", label: "Investor connect" },
        { value: "external_directorship", label: "External directorship" },
        {
          value: "system_development_audit",
          label: "System Development & Audit",
        },
      ],
    },
  ];
  const skills = [
    { value: "accounting", label: "Accounting" },
    { value: "auditing", label: "Auditing" },
    { value: "compliance", label: "Compliance" },
    { value: "taxation", label: "Taxation" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "HR" },
    { value: "marketing", label: "Marketing" },
    { value: "it", label: "IT" },
    { value: "mentoring", label: "Mentoring" },
    { value: "graphic_designing", label: "Graphic Designing" },
    { value: "training", label: "Training" },
    {
      value: "astrology",
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
