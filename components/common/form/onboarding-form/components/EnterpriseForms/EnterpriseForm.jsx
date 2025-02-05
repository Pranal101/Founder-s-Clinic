"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import countryData from "@/data/countries.json";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const EnterprisePostBoxForm = () => {
  const [formData, setFormData] = useState({
    entityName: "",
    emailAddress: "",
    contactNumber: "",
    country: "",
    city: "",
    completeAddress: "",
    firstName: "",
    lastName: "",
    companyRole: "",
    whatsAppNumber: "",
    acceptTerms: false,
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [baseAddress, setBaseAddress] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

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
      whatsAppNumber: prev.whatsAppNumber.startsWith(newPhoneCode)
        ? prev.whatsAppNumber
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
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      toast.error("Please select a country first.");
      return;
    }
    if (!isValidPhoneNumber(formData.contactNumber)) {
      toast.error("Invalid phone number. It must be 8-15 digits long.");
      return;
    }
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

      window.location.assign("/onboarding/enterprise-onboarding/form-2");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="sec-title text-center">
          <h3>About your entity</h3>
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Entity's Name</label>
          <input
            type="text"
            name="entityName"
            placeholder="Name of the entity"
            value={formData.entityName}
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Size </label>
          <Select
            name="entitySize"
            options={entitySizeOptions}
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                entitySize: selected ? selected.value : "",
              }))
            }
            placeholder="Select size"
          />
        </div> */}
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
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="Enter number"
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
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            placeholder="Complete Address"
            value={formData.completeAddress}
            onChange={handleAddressChange}
            readOnly
          />
        </div>
        {/* <div className="form-group col-lg-3 col-md-12">
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            readOnly
          />
        </div>
        <div className="form-group col-lg-2 col-md-12">
          <label>Country</label>
          <input
            type="text"
            name="completeAddress"
            placeholder="Country"
            value={formData.country}
            readOnly
          />
        </div> */}
        <div className="sec-title text-center">
          <h3>About Yourself</h3>
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Role</label>
          <input
            type="text"
            name="companyRole"
            placeholder="Role"
            value={formData.companyRole}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number(WhatsApp)</label>
          <input
            type="text"
            name="whatsAppNumber"
            placeholder="WhatsApp Number"
            value={formData.whatsAppNumber}
            onChange={handlePhoneChange}
          />
        </div>
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

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default EnterprisePostBoxForm;
