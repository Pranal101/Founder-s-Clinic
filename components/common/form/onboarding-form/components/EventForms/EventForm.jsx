"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import countryData from "@/data/countries.json";
import Select from "react-select";
import { getAuth } from "firebase/auth";
const PostBoxForm = () => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    hostName: "",
    companyName: "",
    email: "",
    contactNumber: "",
    websiteUrl: "",
    country: "",
    city: "",
    completeAddress: "",
    acceptTerms: false,
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [baseAddress, setBaseAddress] = useState("");

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
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData((prev) => ({
      ...prev,
      country: selectedOption ? selectedOption.value : "",
      completeAddress: `${baseAddress}${baseAddress ? ", " : ""}${
        prev.city ? prev.city + ", " : ""
      }${selectedOption ? selectedOption.value : ""}`,
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
      completeAddress: `${baseAddress}${baseAddress ? ", " : ""}${
        selectedOption ? selectedOption.value + ", " : ""
      }${prev.country ? prev.country : ""}`,
    }));
  };
  const handleAddressChange = (e) => {
    const newBaseAddress = e.target.value;
    setBaseAddress(newBaseAddress);

    setFormData((prev) => ({
      ...prev,
      completeAddress: `${newBaseAddress}${newBaseAddress ? ", " : ""}${
        prev.city ? prev.city + ", " : ""
      }${prev.country ? prev.country : ""}`,
    }));
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
        "https://founders-clinic-backend.onrender.com/api/user/profile",
        { profileData: formData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);

      window.location.assign("/onboarding/eventHosts-onboarding/form-2");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Event Title</label>
          <input
            type="text"
            name="eventTitle"
            placeholder="Event Title"
            value={formData.eventTitle}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="hostName"
            placeholder="Event Organizer/Host Name"
            value={formData.hostName}
            onChange={handleChange}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Organization/Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number(WhatsApp)</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website Link</label>
          <input
            type="text"
            name="websiteUrl"
            placeholder="Website Link"
            value={formData.websiteUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Street Address</label>
          <input
            type="text"
            name="streetAddress"
            placeholder="Enter street address"
            value={baseAddress}
            onChange={handleAddressChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <Select
            name="country"
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder="Select a country"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <Select
            name="city"
            options={cityOptions}
            onChange={handleCityChange}
            placeholder="Select a city"
            isDisabled={!selectedCountry || cityOptions.length === 0}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            placeholder="Complete Address"
            name="completeAddress"
            value={formData.completeAddress}
            onChange={handleChange}
            readOnly
            required
          />
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
                <span className="custom-checkbox"></span> I accept Founders
                Clinic’s Terms & Conditions
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
          <button type="submit" className="theme-btn btn-style-one">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
