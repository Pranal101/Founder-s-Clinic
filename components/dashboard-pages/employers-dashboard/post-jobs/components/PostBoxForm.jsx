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
      label: "Accounting /  Book Keeping",
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      bussinessSupport: selectedOption ? [selectedOption.value] : [],
    }));
  };
  // const handleSkillsChange = (selectedOptions) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     skillsRequired: selectedOptions.map((option) => option.value),
  //   }));
  // };
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
          <label>What support/ services are you looking for?</label>
          <Select
            name="bussinessSupport"
            options={bussinessSupport}
            className="basic-single-select"
            classNamePrefix="select"
            isMulti={false}
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
            value={
              bussinessSupport
                .flatMap((group) => group.options)
                .find((option) =>
                  formData.bussinessSupport.includes(option.value)
                ) || null
            }
            onChange={handleSelectChange}
          />
        </div>
        {/* Conditionally render input field for "Other" */}
        {/* {formData.bussinessSupport.includes("Other") && (
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
        )} */}

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
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Skills Required</label>
          <Creatable
            isMulti
            name="skillsRequired"
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="List all requried skills"
            onChange={handleSkillsChange}
          />
        </div> */}
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
            minDate={new Date()}
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
            minDate={formData.expectedStartDate || new Date()}
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
