"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Select from "react-select";
import countryData from "@/data/countries.json";
import { toast } from "react-toastify";

const PostBoxForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    country: "",
    city: "",
    completeAddress: "",
    acceptTerms: false,
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [baseAddress, setBaseAddress] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        "http://13.126.254.235:4000/api/user/profile",
        { profileData: formData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);

      window.location.assign("/onboarding/intern-onboarding/form-2");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };
  useEffect(() => {
    if (Array.isArray(countryData)) {
      const countries = countryData.map((country) => ({
        value: country.name,
        label: country.name,
        phoneCode: `+${country.phone_code}`,
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
    if (!selectedOption) return;

    const newPhoneCode = selectedOption.phoneCode; // Get new phone code
    setSelectedCountry(selectedOption);
    setPhoneCode(newPhoneCode);

    // Update fields only if they don't already start with the new phone code
    setFormData((prev) => ({
      ...prev,
      country: selectedOption.value,
      completeAddress: `${prev.city ? prev.city + ", " : ""}${
        selectedOption.value
      }`,
      contactNumber: prev.contactNumber.startsWith(newPhoneCode)
        ? prev.contactNumber
        : newPhoneCode,
    }));

    if (selectedOption.cities.length > 0) {
      const cities = selectedOption.cities.map((city) => ({
        value: city,
        label: city,
      }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  };
  const isValidPhoneNumber = (number) => {
    const numericPart = number.replace(/\D/g, "").slice(phoneCode.length - 1); // Remove non-numeric characters & exclude country code
    return numericPart.length >= 8 && numericPart.length <= 15;
  };

  const handlePhoneChange = (e) => {
    if (!selectedCountry) {
      toast.error("Please select a country first.");
      setFormData((prev) => ({
        ...prev,
        contactNumber: "", // Clear input if no country is selected
      }));
      return;
    }

    let { value } = e.target;
    let numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    const countryCode = phoneCode.replace("+", ""); // Extract only numbers from country code

    // Ensure the number starts with the country code
    if (!numericValue.startsWith(countryCode)) {
      numericValue = countryCode;
    }

    // Extract numeric part excluding country code
    const numericPart = numericValue.slice(countryCode.length);

    // Ensure backspace doesn't introduce unwanted characters
    if (value.length < formData.contactNumber.length) {
      setFormData((prev) => ({
        ...prev,
        contactNumber: `+${numericValue}`,
      }));
      return;
    }

    // Prevent exceeding max phone number length
    if (numericPart.length > 15) {
      toast.error("Phone number cannot exceed 15 digits.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      contactNumber: `+${numericValue}`,
    }));
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
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
          <label>Contact Number(WhatsApp)</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handlePhoneChange}
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
        <div className="form-group col-lg-6 col-md-12">
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
