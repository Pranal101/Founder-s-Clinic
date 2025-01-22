"use client";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Select from "react-select";
import axios from "axios";
import countryData from "@/data/countries.json";
import Education from "@/components/dashboard-pages/candidates-dashboard/my-resume/components/Education";

const PostBoxForm = ({ pricingContent }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    entityName: "",
    role: "",
    organizarionRole: "",
    emailAddress: "",
    contactNumber: "",
    country: "",
    city: "",
    completeAddress: "",
    acceptTerms: false,
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

      // Call the addRole API to ensure the role is already set
      // const role = localStorage.getItem("userRole");
      // if (!role) {
      //   throw new Error("User role is not set. Please select a role first.");
      // }

      // console.log("Role already set in backend:", role);

      // Send form data to the backend to update the profile
      const response = await axios.patch(
        "https://founders-clinic-backend.onrender.com/api/user/profile", // Backend endpoint
        { profileData: formData }, // Send the form data
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Include the user token
          },
        }
      );

      console.log("Profile updated successfully:", response.data);

      // Redirect to the next page if needed
      window.location.assign("/onboarding/professional-onboarding/form-2");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };
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
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Input Fields */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        {/* Input Fields */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Entity Name</label>
          <input
            type="text"
            name="entityName"
            placeholder="Entity name"
            value={formData.entityName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Role</label>
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        {/* <Education /> */}
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
            placeholder="Contact Number"
            value={formData.contactNumber}
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
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
            value={formData.completeAddress}
            onChange={handleChange}
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
                Clinic’s Terms & Condition
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

export default PostBoxForm;
