"use client";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

const PostBoxForm = () => {
  const [formData, setFormData] = useState({
    userType: "enterprise",
    type: "",
    image: "",
    priceINR: "",
    priceUSD: "",
    duration: "",
    features: [],
  });

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
      features: selectedOptions.map((option) => option.value), // Send as an array of strings
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
        "https://founders-clinic-backend.onrender.com/api/admin/create-package",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Package created successfully:", response.data);
      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      console.error("Error creating package:", error.response?.data || error);
      toast.error("Error creating package");
    }
  };
  // Reset form function
  const resetForm = () => {
    setFormData({
      type: "",
      image: "",
      priceINR: "",
      priceUSD: "",
      duration: "",
      features: [],
    });
  };
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Subscription Type/Name:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Image url:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Price in INR:</label>
          <input
            type="text"
            name="priceINR"
            value={formData.priceINR}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Price in USD:</label>
          <input
            type="text"
            name="priceUSD"
            value={formData.priceUSD}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Features</label>
          <Creatable
            isMulti
            name="features"
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="List all features"
            onChange={handleSkillsChange}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one">Add Package</button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
