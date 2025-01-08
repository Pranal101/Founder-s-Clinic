"use client";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Education from "@/components/dashboard-pages/candidates-dashboard/my-resume/components/Education";

const PostBoxForm = ({ pricingContent }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organizarionRole: "",
    emailAddress: "",
    contactNumber: "",
    country: "",
    city: "",
    completeAddress: "",
    acceptTerms: false,
  });

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
      const role = localStorage.getItem("userRole"); // Assume role is already selected
      if (!role) {
        throw new Error("User role is not set. Please select a role first.");
      }

      console.log("Role already set in backend:", role);

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
          />
        </div>
        <Education />
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
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option>Australia</option>
            <option>Pakistan</option>
            <option>China</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option>Melbourne</option>
            <option>Karachi</option>
            <option>Beijing</option>
            <option>Tokyo</option>
            <option>Mumbai</option>
          </select>
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
