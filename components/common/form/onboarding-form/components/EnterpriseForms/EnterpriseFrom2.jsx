"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";
import axios from "axios";
import countryData from "@/data/countries.json";
import { getAuth } from "firebase/auth";
import LogoCoverUploader from "./LogoCoverUploader";
import { toast } from "react-toastify";

const PostBoxForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    foundedYear: "",
    businessCity: "",
    businessCountry: "",
    websiteLink: "",
    socialMediaLinks: "",
    coFounderName: "",
    industryType: "",
    businessDescription: "",
    currentBusninessStage: "",
    otherBusinessStage: "",
    servicesOffered: "",
    hasRaisedFunding: "",
    fundingAmount: "",
    fundingStage: "",
    seekingFunding: "",
    seekingFundingAmount: "",
    platformServices: [],
    additionalInfo: "",
    acceptTerms: false,
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    if (Array.isArray(countryData)) {
      const countries = countryData.map((country) => ({
        value: country.name,
        label: country.name,
        cities: country.states
          ? country.states.flatMap((state) =>
              state.cities.map((city) => city.name)
            )
          : [],
      }));
      setCountryOptions(countries);
    } else {
      console.error("Invalid JSON structure:", countryData);
    }
  }, []);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData((prev) => ({
      ...prev,
      businessCountry: selectedOption ? selectedOption.value : "",
      businessCity: "", // Reset city
    }));

    if (selectedOption && selectedOption.cities.length > 0) {
      const cities = selectedOption.cities.map((city) => ({
        value: city,
        label: city,
      }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  };
  const handleCityChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      businessCity: selectedOption ? selectedOption.value : "",
    }));
  };
  const businessRegistration = [
    { value: "Sole Proprietorship", label: "Sole Proprietorship" },
    {
      value: "Partnership",
      label: "Partnership",
    },
    { value: "LLP", label: "LLP" },
    { value: "OPC", label: "OPC" },
    { value: "Pvt. Ltd.", label: "Pvt. Ltd." },
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
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption
        ? selectedOption.value || selectedOption.map((option) => option.value)
        : "",
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

      const response = await axios.patch(
        "https://founders-clinic-backend.onrender.com/api/user/profile",
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
      window.location.assign("/employers-dashboard/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Bussiness info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Business Name (or Entrepreneur/Founder Name)</label>
          <input
            type="text"
            placeholder="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Form of organisation</label>
          <Select
            options={businessRegistration}
            onChange={(selected) =>
              handleSelectChange("businessType", selected)
            }
            placeholder="Select Organization Form"
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Year Founded</label>
          <input
            type="text"
            placeholder="Year Founded"
            name="foundedYear"
            value={formData.foundedYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Business Location(Country)</label>
          <Select
            name="businessCountry"
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder="Select a country"
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Business Location(City)</label>
          <Select
            name="city"
            options={cityOptions}
            onChange={handleCityChange}
            placeholder="Select a city"
            isDisabled={!selectedCountry || cityOptions.length === 0}
            required
          />
        </div>
        {/* <!-- Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website Link</label>
          <input
            type="text"
            placeholder="Website url"
            name="websiteLink"
            value={formData.websiteLink}
            onChange={handleChange}
          />
        </div>
        {/* <!--Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Social Media Links</label>
          <input
            type="text"
            placeholder="LinkedIn, Twitter, etc"
            name="socialMediaLinks"
            value={formData.socialMediaLinks}
            onChange={handleChange}
          />
        </div>
        {/* <!--Basic info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Founder/Co-Founder Name</label>
          <input
            type="text"
            placeholder="Founder/Co-Founder Name"
            name="coFounderName"
            value={formData.coFounderName}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Bussiness info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Industry/Sector</label>
          <input
            type="text"
            name="industryType"
            value={formData.industryType}
            onChange={handleChange}
            placeholder="e.g., Technology, Finance, Retail, Manufacturing, etc."
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Business Description</label>
          <input
            type="text"
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleChange}
            placeholder="Business Description"
          />
        </div>
        {/* <!-- Bussiness info --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Current Business Stage</label>
          <select
            className="chosen-single form-select"
            name="currentBusninessStage"
            value={formData.currentBusninessStage}
            onChange={handleChange}
            required
          >
            <option value="">Select a stage</option>
            <option value="Early-stage startup">Early-stage startup</option>
            <option value="Growth-stage">Growth-stage</option>
            <option value="Established business">Established business</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Conditionally render input field for "Other" option */}
        {formData.currentBusninessStage === "Other" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify your business stage</label>
            <input
              type="text"
              name="otherBusinessStage" // Matches the name used in handleChange
              value={formData.otherBusinessStage || ""}
              onChange={handleChange} // Using the existing generic handleChange
              placeholder="Specify your business stage"
              required
            />
          </div>
        )}
        {/* <!-- Bussiness offerings --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Mention products or services your business offers</label>
          <input
            type="text"
            name="servicesOffered"
            value={formData.servicesOffered}
            onChange={handleChange}
            placeholder="e.g. Service"
          />
        </div>
        {/* <!-- Bussiness offerings --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Target Market</label>
          <input
            type="text"
            name="targetMarket"
            value={formData.targetMarket}
            onChange={handleChange}
            placeholder="e.g., B2B, B2C, specific demographics, industries"
          />
        </div> */}
        {/* <!-- Team Details --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Team Size</label>
          <select
            className="chosen-single form-select"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
          >
            <option></option>
            <option>1-10 employees</option>
            <option>11-50 employees</option>
            <option>51-200 employees</option>
            <option>More than 200 employees</option>
          </select>
        </div> */}
        {/* <!-- Funding --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Have you raised any funding?</label>
          <select
            className="chosen-single form-select"
            name="hasRaisedFunding"
            value={formData.hasRaisedFunding}
            onChange={handleChange}
          >
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* <!-- Funding --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>If yes then specify the funding amount</label>
          <input
            type="text"
            placeholder="Funding amount"
            name="fundingAmount"
            value={formData.fundingAmount}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Funding --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What funding stage is your business currently in?</label>
          <select
            className="chosen-single form-select"
            name="fundingStage"
            value={formData.fundingStage}
            onChange={handleChange}
          >
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
          <select
            className="chosen-single form-select"
            name="seekingFunding"
            value={formData.seekingFunding}
            onChange={handleChange}
          >
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* <!-- Funding --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>If yes, how much funding are you seeking?</label>
          <input
            type="text"
            name="seekingFundingAmount"
            value={formData.seekingFundingAmount}
            onChange={handleChange}
            placeholder="Funding amount"
          />
        </div>
        {/* <!-- Business Needs and Platform Expectations--> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            What types of services or solutions are you looking for on this
            platform?
          </label>
          <Select
            name="platformServices"
            isMulti
            options={servicesProvided}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleSelectChange("platformServices", selected)
            }
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Is there anything else you would like to add about your business?
          </label>
          <input
            type="text"
            placeholder="Additional Information"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Business Needs and Platform Expectations--> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>What are your key expectations from the platform?</label>
          <select
            className="chosen-single form-select"
            name="platformExpectations"
            value={formData.platformExpectations}
            onChange={handleChange}
          >
            <option></option>
            <option>Business growth opportunities</option>
            <option>Access to resources and tools</option>
            <option>Collaboration with like-minded businesses</option>
            <option>Access to funding</option>
            <option>Mentorship</option>
          </select>
        </div> */}
        <LogoCoverUploader />
        {/* <div className="form-group col-lg-12 col-md-12">
          <label>Upload Document</label>
          <input type="file" onChange={handleFileChange} />
        </div> */}

        {/* <!-- Accept to terms --> */}
        <div className="form-group col-lg-12 col-md-12 ">
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
