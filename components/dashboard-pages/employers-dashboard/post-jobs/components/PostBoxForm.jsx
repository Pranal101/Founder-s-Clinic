"use client";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Map from "../../../Map";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

const PostBoxForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    entityName: "",
    industry: "",
    foundedYear: "",
    emailAddress: "",
    contactNumber: "",
    bussinessSupport: [],
    otherbussinessSupport: "",
    supportDescription: "",
    supportDuration: "",
    skills: [],
    skillsRequired: [],
    experience: "",
    genderPreference: "",
    currency: "",
    budget: "",
    budgetFlexibility: "",
    expectedStartDate: null,
    completionTimeline: null,
  });
  const bussinessSupport = [
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSelectChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      bussinessSupport: selectedOptions.map((option) => option.value),
    }));
  };
  const handleSkillsChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      skillsRequired: selectedOptions.map((option) => option.value),
    }));
  };
  const handleDateChange = (date, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: date ? date.toISOString() : null,
    }));
  };
  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data being sent:", formData);
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

      const response = await axios.post(
        "https://founders-clinic-backend.onrender.com/api/jobs/create-job", // Backend job posting endpoint
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Inquiry posted successfully:", response.data);
      toast.success("Inquiry Posted Successfully!");
      resetForm();
    } catch (error) {
      console.error("Error posting inquiry:", error.response?.data || error);
      toast.error("Error posting inquiry,please try again.");
    }
  };
  // Reset form function
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      entityName: "",
      industry: "",
      foundedYear: "",
      emailAddress: "",
      contactNumber: "",
      bussinessSupport: [],
      otherbussinessSupport: "",
      supportDescription: "",
      supportDuration: "",
      skills: "",
      skillsRequired: [],
      experience: "",
      genderPreference: "",
      currency: "",
      budget: "",
      budgetFlexibility: "",
      expectedStartDate: null,
      completionTimeline: null,
    });
  };
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Inquiry Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Inquiry Description</label>
          <textarea
            name="description"
            placeholder="Inquiry Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Entity Name</label>
          <input
            type="text"
            name="entityName"
            value={formData.entityName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Industry Type</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Specify Industry"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Founded In</label>
          <input
            type="text"
            name="foundedYear"
            value={formData.foundedYear}
            onChange={handleChange}
            placeholder="Organization Founding Year"
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Search Select --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Type of Business Support Needed </label>
          <Select
            isMulti
            name="bussinessSupport"
            options={bussinessSupport}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
          />
        </div> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What types of business support services do you offer?</label>
          <Select
            name="bussinessSupport"
            isMulti
            options={bussinessSupport} // Grouped options
            className="basic-multi-select"
            classNamePrefix="select"
            value={bussinessSupport
              .flatMap((group) => group.options)
              .filter((option) =>
                formData.bussinessSupport.includes(option.value)
              )}
            onChange={handleSelectChange}
          />
        </div>
        {/* Conditionally render input field for "Other" */}
        {formData.bussinessSupport.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify other business support needed</label>
            <input
              type="text"
              name="otherbussinessSupport"
              value={formData.otherbussinessSupport}
              onChange={handleChange}
              placeholder="Specify other bussiness Support"
              required
            />
          </div>
        )}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Brief description of the support needed</label>
          <input
            type="text"
            name="supportDescription"
            value={formData.supportDescription}
            onChange={handleChange}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Duration</label>
          <select
            className="chosen-single form-select"
            name="supportDuration"
            value={formData.supportDuration}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>One-time task</option>
            <option>Long-term support</option>
          </select>
        </div>
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
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Skills Required</label>
          <Creatable
            isMulti
            name="skillsRequired"
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="List all requried skills"
            onChange={handleSkillsChange}
          />
        </div>
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Inquiry Location</label>
          <input
            type="text"
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
          />
        </div> */}
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <select
            className="chosen-single form-select"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Entery-level</option>
            <option>Mid-level</option>
            <option>Senior</option>
          </select>
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Gender Preference(if any)</label>
          <input
            type="text"
            name="genderPreference"
            value={formData.genderPreference}
            onChange={handleChange}
            placeholder="Specify Gender Preference"
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Currency</label>
          <select
            className="chosen-single form-select"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>USD</option>
            <option>INR</option>
          </select>
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Budget</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Specify Budget"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Budget Flexibility</label>
          <select
            className="chosen-single form-select"
            name="budgetFlexibility"
            value={formData.budgetFlexibility}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Absolutely Flexible</option>
            <option>Somewhat Flexible</option>
            <option>Not Flexible</option>
          </select>
        </div>
        {/* Input for Start Date */}
        <div className="custom-form-group form-group col-lg-6 col-md-12">
          <label className="custom-form-label">Assignment Start Date</label>
          <DatePicker
            selected={formData.expectedStartDate}
            onChange={(date) => handleDateChange(date, "expectedStartDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a start date"
            className="custom-margin"
          />
        </div>
        {/* Input for Completion Timeline */}
        <div className="custom-form-group form-group col-lg-6 col-md-12">
          <label className="custom-form-label">Assignment Deadline</label>
          <DatePicker
            selected={formData.completionTimeline}
            onChange={(date) => handleDateChange(date, "completionTimeline")}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select timeline"
            className="custom-margin"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one">Post Inquiry</button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
