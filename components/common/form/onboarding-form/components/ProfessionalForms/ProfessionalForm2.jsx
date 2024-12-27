"use client";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Select from "react-select";

const PostBoxForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    entityName: "",
    organizationRole: "",
    portfolio: "",
    position: "",
    websiteLink: "",
    socialMediaLinks: "",
    experienceYears: "",
    certifications: "",
    associations: "",
    servicesOffered: [],
    primaryClients: "",
    serviceDelivery: [],
    processDescription: "",
    customizedSolutions: "",
    pricingModel: [],
    differentiators: "",
    painPoints: "",
    industryExpertise: "",
    contribution: "",
    availability: "",
    freeConsultation: "",
    contactPreference: "",
    acceptTerms: false,
  });
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
  const MultiPricingModel = [
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
      [action.name]: selectedOptions.map((option) => option.value),
    });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        "http://localhost:4000/api/user/profile", // Replace with your actual endpoint
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
          "http://localhost:4000/api/user/upload",
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
          <label>Current Business/Company Name</label>
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
          <label>Organizarion Role</label>
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
          <label>Portfolio (if any)</label>
          <input
            name="portfolio"
            type="text"
            placeholder="Portfolio Url"
            value={formData.portfolio}
            onChange={handleChange}
          />
        </div>
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
          <label>Years of Experience</label>
          <input
            type="text"
            name="experienceYears"
            placeholder="Experience"
            value={formData.experienceYears}
            onChange={handleChange}
          />
        </div>
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
            // defaultValue={[servicesProvided[0]]}
            name="servicesOffered"
            isMulti
            options={servicesProvided}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
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
            name="primaryClients"
            value={formData.primaryClients}
            onChange={handleChange}
            placeholder="e.g., startups, small businesses, corporations, specific industries"
          />
        </div>
        {/* <!-- Service Delivery and Approach --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>How do you deliver your services?</label>
          <Select
            // defaultValue={[servicesProvided[0]]}
            name="serviceDelivery"
            isMulti
            options={serviceDelivery}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
          />
        </div>
        {/* <!-- Service Delivery and Approach --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What is your typical process when working with clients?</label>
          <input
            type="text"
            name="processDescription"
            value={formData.processDescription}
            onChange={handleChange}
            placeholder="Briefly describe how you engage with clients, from consultation to execution."
          />
        </div>

        {/* <!-- Service Delivery and Approach --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Do you offer customized solutions for businesses?</label>
          <select
            name="customizedSolutions"
            className="chosen-single form-select"
            value={formData.customizedSolutions}
            onChange={handleChange}
          >
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
            name="pricingModel"
            isMulti
            options={MultiPricingModel}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
          />
        </div>
        {/* <!-- Value Proposition --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            What differentiates you from other professionals offering similar
            services?
          </label>
          <input
            type="text"
            name="differentiators"
            placeholder=""
            value={formData.differentiators}
            onChange={handleChange}
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
        <div className="form-group col-lg-6 col-md-12">
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
        </div>
        {/* <!-- Availability --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What is your typical availability for new clients?</label>
          <input
            type="text"
            name="availability"
            placeholder=""
            value={formData.availability}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Availability --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Do you offer free consultations?</label>
          <select
            name="freeConsultation"
            className="chosen-single form-select"
            value={formData.freeConsultation}
            onChange={handleChange}
          >
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* <!-- Availability --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            What is the best way for potential clients to reach you?
          </label>
          <input
            type="text"
            name="contactPreference"
            placeholder=""
            value={formData.contactPreference}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>Upload Document</label>
          <input type="file" onChange={handleFileChange} />
        </div>
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
