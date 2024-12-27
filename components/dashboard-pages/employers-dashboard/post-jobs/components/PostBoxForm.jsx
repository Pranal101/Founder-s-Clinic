"use client";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Map from "../../../Map";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Creatable from "react-select/creatable";

const PostBoxForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    entityName: "",
    emailAddress: "",
    contactNumber: "",
    bussinessSupport: [],
    otherbussinessSupport: "",
    supportDescription: "",
    supportDuration: "",
    skillsRequired: [],
    jobLocation: "",
    experience: "",
    genderPreference: "",
    budget: "",
    budgetFlexibility: "",
    expectedStartDate: null,
    completionTimeline: null,
  });
  const bussinessSupport = [
    {
      value: "Financial Support",
      label:
        "Financial Support (bookkeeping, accounting, auditing, certification, funding, grant/subsidies, Tax advisory)",
    },
    { value: "Investment assistance", label: "Investment assistance" },
    {
      value: "Compliance support",
      label:
        "Compliance support (Registrations, corporate compliance, trademark/copyright/patent, contracts)",
    },
    {
      value: "Marketing & Social Media",
      label:
        "Marketing & Social Media (content creation, graphic designing, branding, social media strategy and management, influencer marketing)",
    },
    {
      value: "Reports",
      label:
        "Reports (Business plan, pitch deck, project report, financial projections and analysis)",
    },
    {
      value: "IT/Technology Support",
      label:
        "IT/Technology Support (software development, network management, cybersecurity, web development, App development)",
    },
    {
      value: "HR & Recruitment",
      label:
        "HR & Recruitment (hiring, employee management, performance reviews)",
    },
    {
      value: "Consulting or Strategic Advice",
      label:
        "Consulting or Strategic Advice (business growth, market analysis, strategic planning, mentoring and handholding, business automation)",
    },
    { value: "Training/coaching", label: "Training/coaching" },
    { value: "Business Wellness", label: "Business Wellness" },
    {
      value: "Goal Setting/Success motivation sessions",
      label: "Goal Setting/Success motivation sessions",
    },
    {
      value: "Corporate astrology/numerology/Industrial Vastu consultancy",
      label: "Corporate astrology/numerology/Industrial Vastu consultancy",
    },
    {
      value: "Business wellness retreats/curated programs",
      label: "Business wellness retreats/curated programs",
    },
    { value: "Other", label: "Other (Please specify)" },
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
        "http://localhost:4000/api/jobs/create-job", // Backend job posting endpoint
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Job posted successfully:", response.data);
      resetForm();
    } catch (error) {
      console.error("Error posting job:", error.response?.data || error);
    }
  };
  // Reset form function
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      entityName: "",
      emailAddress: "",
      contactNumber: "",
      bussinessSupport: [],
      otherbussinessSupport: "",
      supportDescription: "",
      supportDuration: "",
      skillsRequired: [],
      jobLocation: "",
      experience: "",
      genderPreference: "",
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
          <label>Project Title</label>
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
          <label>Project Description</label>
          <textarea
            name="description"
            placeholder="Project Description"
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
        <div className="form-group col-lg-6 col-md-12">
          <label>Type of Business Support Needed </label>
          <Select
            isMulti
            name="bussinessSupport"
            options={bussinessSupport}
            className="basic-multi-select"
            classNamePrefix="select"
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
        <div className="form-group col-lg-6 col-md-12">
          <label>Project Location</label>
          <input
            type="text"
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
          />
        </div>
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
          <label>Budget</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Specify Gender Preference"
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
          <label className="custom-form-label">Project Start Date</label>
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
          <label className="custom-form-label">Project Deadline</label>
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
          <button className="theme-btn btn-style-one">Post Job</button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
