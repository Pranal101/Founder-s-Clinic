"use client";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import Datepicker CSS

const CreateCoupon = () => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    userType: "",
    discount: "",
    type: "fixed", // Default type
    expirationDate: null, // Initialize as null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      expirationDate: date,
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

      const response = await axios.post(
        "https://founders-clinic-backend.onrender.com/api/admin/create-coupon",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating coupon");
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discount: "",
      type: "fixed",
      expirationDate: null,
    });
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-12 col-md-12">
          <label>Coupon Code:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>User Type</label>
          <select
            className="chosen-single form-select"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Enterprise</option>
            <option>Professional</option>
            <option>Intern</option>
            <option>Investor</option>
            <option>Networking Community</option>
          </select>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Discount Value:</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Discount Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Expiration Date:</label>
          <DatePicker
            selected={formData.expirationDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            required
            className="form-control"
          />
        </div>

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one">Create Coupon</button>
        </div>
      </div>
    </form>
  );
};

export default CreateCoupon;
