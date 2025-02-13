"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAuth } from "firebase/auth";
import countryData from "@/data/countries.json";

const PostBoxForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    investmentFirmName: "",
    position: "",
    email2: "",
    // contactNumber2: "",
    websiteUrl: "",
    linkedinUrl: "",
    // country2: "",
    // city2: "",
    investorType: [],
    otherInvestorType: "",
    investmentYears: "",
    // investmentExperience: "",
    // otherInvestmentExperience: "",
    notableInvestments: "",
    preferredIndustries: [],
    otherPreferredIndustries: "",
    preferredBusinessStage: "",
    preferredGeography: "",
    investmentThesis: "",
    investmentTimeline: "",
    involvementType: "",
    exitStrategy: "",
    otherExitStrategy: "",
    successfulExits: "",
    currentInvestmentNetworks: "",
    specificInvestmentNetworks: "",
    interestedInMentoring: "",
    // requiredServices: "",
    // otherRequiredServices: "",
    // keyExpectations: "",
    // otherKeyExpectations: "",
    notableAchievements: "",
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
      country2: selectedOption ? selectedOption.value : "",
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
      city2: selectedOption ? selectedOption.value : "",
    }));
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOptions, fieldName) => {
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

      if (file) {
        const formDataObj = new FormData();
        formDataObj.append("userId", user.uid);
        formDataObj.append("profileType", "EnterpriseProfile");
        formDataObj.append("documentType", "Resume");
        formDataObj.append("documentName", file.name);
        formDataObj.append("file", file);

        await axios.post(
          "https://founders-clinic-backend.onrender.com/api/user/upload",
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
      }

      window.location.assign("/investors-dashboard/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };

  const investorTypeOptions = [
    { value: "Angel Investor", label: "Angel Investor" },
    { value: "Venture Capitalist", label: "Venture Capitalist" },
    { value: "Private Equity", label: "Private Equity" },
    { value: "Family Office", label: "Family Office" },
    { value: "Corporate Investor", label: "Corporate Investor" },
    { value: "Crowdfunding Investor", label: "Crowdfunding Investor" },
    { value: "Other", label: "Other" },
  ];

  const investmentExperienceOptions = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Expert", label: "Expert" },
    { value: "Other", label: "Other" },
  ];

  const preferredIndustryOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Fintech", label: "Fintech" },
    { value: "Consumer Goods", label: "Consumer Goods" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "Media and Entertainment", label: "Media and Entertainment" },
    { value: "Renewable Energy", label: "Renewable Energy" },
    { value: "Other", label: "Other" },
  ];
  const exitStratOptions = [
    { value: "IPO", label: "IPO" },
    { value: "Merger or acquisition", label: "Merger or acquisition" },
    { value: "Secondary sale", label: "Secondary sale" },
    { value: "Dividend distribution", label: "Dividend distribution" },
    { value: "Other", label: "Other" },
  ];
  const requiredServicesOptions = [
    {
      value: "Access to startups and investment opportunities",
      label: "Access to startups and investment opportunities",
    },
    {
      value: "Co-investment opportunities",
      label: "Co-investment opportunities",
    },
    {
      value: "Business intelligence and market research",
      label: "Business intelligence and market research",
    },
    {
      value: "Legal and due diligence support",
      label: "Legal and due diligence support",
    },
    {
      value: "Networking with other investors",
      label: "Networking with other investors",
    },
    {
      value: "Access to venture capital or private equity funds",
      label: "Access to venture capital or private equity funds",
    },
    { value: "Other", label: "Other" },
  ];

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Investment Firm Name (if applicable)</label>
          <input
            type="text"
            name="investmentFirmName"
            className="form-control"
            value={formData.investmentFirmName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Position/Title</label>
          <input
            type="text"
            name="position"
            className="form-control"
            value={formData.position}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Email</label>
          <input
            type="text"
            name="email2"
            className="form-control"
            value={formData.email2}
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber2"
            className="form-control"
            value={formData.contactNumber2}
            onChange={handleChange}
          />
        </div> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website Url</label>
          <input
            type="text"
            name="websiteUrl"
            className="form-control"
            value={formData.websiteUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>LinkedIn Url</label>
          <input
            type="text"
            name="linkedinUrl"
            className="form-control"
            value={formData.linkedinUrl}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <Select
            name="country"
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder="Select a country"
          />
        </div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <Select
            name="city"
            options={cityOptions}
            onChange={handleCityChange}
            placeholder="Select a city"
            isDisabled={!selectedCountry || cityOptions.length === 0}
          />
        </div> */}
        {/* Investor Type */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What type of investor are you?</label>
          <Select
            isMulti
            name="investorType"
            options={investorTypeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              handleSelectChange(selectedOptions, "investorType")
            }
            required
          />
        </div>
        {formData.investorType.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify:</label>
            <input
              type="text"
              name="otherInvestorType"
              className="form-control"
              value={formData.otherInvestorType}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Investment Years */}
        <div className="form-group col-lg-6 col-md-12">
          <label>How many years have you been investing?</label>
          <select
            className="form-select"
            name="investmentYears"
            value={formData.investmentYears}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>0-2 years</option>
            <option>3-5 years</option>
            <option>6-10 years</option>
            <option>10+ years</option>
          </select>
        </div>

        {/* Investment Experience */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Investment Experience</label>
          <Select
            name="investmentExperience"
            options={investmentExperienceOptions}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleSelectChange([selected], "investmentExperience")
            }
            required
          />
        </div>
        {formData.investmentExperience.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Specify your investment experience:</label>
            <input
              type="text"
              name="otherInvestmentExperience"
              className="form-control"
              value={formData.otherInvestmentExperience}
              onChange={handleChange}
            />
          </div>
        )} */}

        {/* Notable Investments */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Notable Investments (if applicable)</label>
          <input
            type="text"
            name="notableInvestments"
            className="form-control"
            value={formData.notableInvestments}
            onChange={handleChange}
          />
        </div>

        {/* Preferred Industries */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            What industries do you invest in?(Select all that apply)
          </label>
          <Select
            isMulti
            name="preferredIndustries"
            options={preferredIndustryOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              handleSelectChange(selectedOptions, "preferredIndustries")
            }
            required
          />
        </div>
        {formData.preferredIndustries.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify:</label>
            <input
              type="text"
              name="otherPreferredIndustries"
              className="form-control"
              value={formData.otherPreferredIndustries}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="form-group col-lg-6 col-md-12">
          <label>What business stages do you typically invest in?</label>
          <select
            className="chosen-single form-select"
            name="preferredBusinessStage"
            value={formData.preferredBusinessStage}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Pre Seed</option>
            <option>Seed</option>
            <option>Series A</option>
            <option>Series B</option>
            <option>Growth Stage</option>
            <option>Mature Businesses</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Geographic Investment Preferences</label>
          <select
            className="chosen-single form-select"
            name="preferredGeography"
            value={formData.preferredGeography}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Local(within your country)</option>
            <option>Regional</option>
            <option>International</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have any specific investment thesis or focus areas?
          </label>
          <input
            type="text"
            name="investmentThesis"
            value={formData.investmentThesis}
            onChange={handleChange}
            placeholder="Investment Thesis"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>What is your typical investment timeline?</label>
          <select
            className="chosen-single form-select"
            name="investmentTimeline"
            value={formData.investmentTimeline}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Short-term (less than 3 years)</option>
            <option>Medium-term (3-5 years)</option>
            <option>Long-term (5+ years)</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>
            What type of involvement do you prefer with your investments?
          </label>
          <select
            className="chosen-single form-select"
            name="involvementType"
            value={formData.involvementType}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Active involvement (e.g., board seat, mentorship)</option>
            <option>Passive involvement (financial backing only)</option>
            <option>Hybrid (as needed)</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>
            What is your preferred exit strategy?(Select all that apply)
          </label>
          <Select
            isMulti
            name="exitStrategy"
            options={exitStratOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              handleSelectChange(selectedOptions, "exitStrategy")
            }
          />
        </div>
        {formData.exitStrategy.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify:</label>
            <input
              type="text"
              name="otherExitStrategy"
              className="form-control"
              value={formData.otherExitStrategy}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have any past successful exits you’d like to share?
          </label>
          <input
            type="text"
            name="successfulExits"
            value={formData.successfulExits}
            onChange={handleChange}
            placeholder="Successful Exits"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you currently work with any investment networks or syndicates?
          </label>
          <select
            className="chosen-single form-select"
            name="currentInvestmentNetworks"
            value={formData.currentInvestmentNetworks}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {formData.currentInvestmentNetworks.includes("Yes") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify:</label>
            <input
              type="text"
              name="specificInvestmentNetworks"
              className="form-control"
              value={formData.specificInvestmentNetworks}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>
            Are you interested in mentoring or advising entrepreneurs?
          </label>
          <select
            className="chosen-single form-select"
            name="interestedInMentoring"
            value={formData.interestedInMentoring}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            What types of services or resources are you looking for on this
            platform? (Select all that apply):
          </label>
          <Select
            isMulti
            name="requiredServices"
            options={requiredServicesOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              handleSelectChange(selectedOptions, "requiredServices")
            }
            required
          />
        </div>
        {formData.requiredServices.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify:</label>
            <input
              type="text"
              name="otherRequiredServices"
              className="form-control"
              value={formData.otherRequiredServices}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>What are your key expectations from the platform?</label>
          <select
            className="chosen-single form-select"
            name="keyExpectations"
            value={formData.keyExpectations}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>High-quality investment opportunities</option>
            <option>Streamlined deal flow and due diligence</option>
            <option>Access to vetted startups</option>
            <option>Networking and co-investment options</option>
            <option>Mentorship opportunities</option>
            <option>Other</option>
          </select>
        </div>

        {formData.keyExpectations.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify:</label>
            <input
              type="text"
              name="otherKeyExpectations"
              className="form-control"
              value={formData.otherKeyExpectations}
              onChange={handleChange}
            />
          </div>
        )} */}

        <div className="form-group col-lg-6 col-md-12">
          <label>
            Please share any notable achievements, awards, or milestones related
            to your investments.
          </label>
          <input
            type="text"
            name="notableAchievements"
            className="form-control"
            value={formData.notableAchievements}
            onChange={handleChange}
          />
        </div>

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have any investment success stories or case studies you'd
            like to showcase?
          </label>
          <input
            type="text"
            name="successStories"
            className="form-control"
            value={formData.successStories}
            onChange={handleChange}
          />
        </div> */}
        {/* Accept Terms */}
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

        {/* Submit Button */}
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
