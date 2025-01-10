"use client";
import { useState, useEffect } from "react";
import countryData from "@/data/countries.json";
import Select from "react-select";
// import DocumentsUploader from "./DocumentsUploader";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const FormInfoBox = () => {
  const [isLookingForInvestment, setIsLookingForInvestment] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    foundedYear: "",
    coFounderName: "",
    country: "",
    city: "",
    emailAddress: "",
    contactNumber: "",
    websiteLink: "",
    socialMediaLinks: "",
    industryType: "",
    businessDescription: "",
    currentBusninessStage: "",
    servicesOffered: "",
    targetMarket: "",
    teamSize: "",
    hasRaisedFunding: "",
    fundingAmount: "",
    fundingStage: "",
    seekingFunding: "",
    seekingFundingAmount: "",
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [userToken, setUserToken] = useState("");
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUserToken(token);
        // Fetch user data after the country options are ready
        if (countryOptions.length > 0) {
          fetchUserInvestmentData(token);
        }
      }
    });
  }, [countryOptions]); // Add dependency on countryOptions

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

  const fetchUserInvestmentData = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/all-investments", // Replace with your endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        const data = response.data[0]; // Access the first object in the array

        setIsLookingForInvestment(true);

        // Pre-select country and cities after verifying countryOptions is ready
        const selectedCountryOption = countryOptions.find(
          (option) => option.value === data.country
        );
        if (selectedCountryOption) {
          setSelectedCountry(selectedCountryOption);

          if (selectedCountryOption.cities.length > 0) {
            const cities = selectedCountryOption.cities.map((city) => ({
              value: city,
              label: city,
            }));
            setCityOptions(cities);
          }
        }

        // Update formData with API response
        setFormData((prev) => ({
          ...prev,
          businessName: data.businessName || "",
          businessType: data.businessType || "",
          foundedYear: data.foundedYear || "",
          coFounderName: data.coFounderName || "",
          country: data.country || "",
          city: data.city || "",
          contactNumber: data.contactNumber || "",
          emailAddress: data.emailAddress || "",
          businessDescription: data.businessDescription || "",
          currentBusninessStage: data.currentBusninessStage || "",
          hasRaisedFunding: data.hasRaisedFunding || "",
          fundingAmount: data.fundingAmount || "",
          fundingStage: data.fundingStage || "",
          seekingFunding: data.seekingFunding || "",
          seekingFundingAmount: data.seekingFundingAmount || "",
          industryType: data.industryType || "",
          servicesOffered: data.servicesOffered || "",
          socialMediaLinks: data.socialMediaLinks || "",
          targetMarket: data.targetMarket || "",
          teamSize: data.teamSize || "",
          websiteLink: data.websiteLink || "",
        }));
      } else {
        console.warn("No data found in API response.");
      }
    } catch (error) {
      console.error("Error fetching user investment data:", error);
      toast.error("Failed to fetch existing data. Please try again.");
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleInvestmentChange = (e) => {
    setIsLookingForInvestment(e.target.value === "yes");
  };

  const catOptions = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Management", label: "Management" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];
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
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData((prev) => ({
      ...prev,
      country: selectedOption ? selectedOption.value : "",
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
      city: selectedOption ? selectedOption.value : "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/investments",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success("Investment created successfully!");
      // Reset form data to initial values
      setFormData({
        businessName: "",
        businessType: "",
        foundedYear: "",
        coFounderName: "",
        country: "",
        city: "",
        emailAddress: "",
        contactNumber: "",
        websiteLink: "",
        socialMediaLinks: "",
        industryType: "",
        businessDescription: "",
        currentBusninessStage: "",
        servicesOffered: "",
        targetMarket: "",
        teamSize: "",
        hasRaisedFunding: "",
        fundingAmount: "",
        fundingStage: "",
        seekingFunding: "",
        seekingFundingAmount: "",
      });
    } catch (error) {
      console.error("Error creating investment:", error);
      toast.error(
        "There was an error creating the investment. Please try again."
      );
    }
  };
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Are you looking for an investment?</label>
          <select
            className="chosen-single form-select"
            onChange={handleInvestmentChange}
            value={isLookingForInvestment ? "yes" : "no"}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {isLookingForInvestment && (
          <>
            <div className="form-group col-lg-6 col-md-12">
              <label>Business Name</label>
              <input
                type="text"
                name="businessName"
                placeholder="Name of your business"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>
            {/* <div className="form-group col-lg-6 col-md-12">
              <label>Form of organisation</label>
              <Select
                options={businessRegistration}
                onChange={(selected) =>
                  handleSelectChange("businessType", selected)
                }
                placeholder="Select Organization Form"
              />
            </div> */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Form of organisation</label>
              <Select
                options={businessRegistration}
                onChange={(selected) =>
                  handleSelectChange("businessType", selected)
                }
                value={{
                  value: formData.businessType,
                  label: formData.businessType,
                }}
                placeholder="Select Organization Form"
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
              />
            </div>
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
            <div className="form-group col-lg-6 col-md-12">
              <label>Country</label>
              <Select
                name="country"
                options={countryOptions}
                value={
                  selectedCountry ||
                  (formData.country && {
                    value: formData.country,
                    label: formData.country,
                  })
                }
                onChange={handleCountryChange}
                placeholder="Select a country"
              />
            </div>
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
            <div className="form-group col-lg-6 col-md-12">
              <label>City</label>
              <Select
                name="city"
                options={cityOptions}
                onChange={handleCityChange}
                value={
                  formData.city
                    ? { value: formData.city, label: formData.city }
                    : null
                }
                placeholder="Select a city"
                isDisabled={!selectedCountry || cityOptions.length === 0}
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Email Address</label>
              <input
                type="text"
                name="emailAddress"
                placeholder="Email"
                value={formData.emailAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact number"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
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
            <div className="form-group col-lg-12 col-md-12">
              <label>Business Description</label>
              <textarea
                placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            {/* <!-- Bussiness info --> */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Current Business Stage</label>
              <select
                className="chosen-single form-select"
                name="currentBusninessStage"
                value={formData.currentBusninessStage}
                onChange={handleChange}
              >
                <option></option>
                <option>Early-stage startup</option>
                <option>Growth-stage</option>
                <option>Established business</option>
              </select>
            </div>
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
            <div className="form-group col-lg-6 col-md-12">
              <label>Target Market</label>
              <input
                type="text"
                name="targetMarket"
                value={formData.targetMarket}
                onChange={handleChange}
                placeholder="e.g., B2B, B2C, specific demographics, industries"
              />
            </div>
            {/* <!-- Team Details --> */}
            <div className="form-group col-lg-6 col-md-12">
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
            </div>
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
            {/* <DocumentsUploader /> */}
          </>
        )}

        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
