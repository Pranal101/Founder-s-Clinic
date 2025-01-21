"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const FormInfoBox = () => {
  const [formData, setFormData] = useState({
    name: "",
    entityName: "",
    investmentFirmName: "",
    position: "",
    email: "",
    contactNumber: "",
    websiteUrl: "",
    linkedinUrl: "",
    country: "",
    city: "",
    completeAddress: "",
    investorType: "",
    otherInvestorType: "",
    investmentYears: "",
    investmentExperience: "",
    otherInvestmentExperience: "",
    notableInvestments: "",
    preferredIndustries: "",
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
    requiredServices: "",
    otherRequiredServices: "",
    keyExpectations: "",
    otherKeyExpectations: "",
    notableAchievements: "",
    successStories: "",
  });

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchProfile = async (user) => {
      try {
        const userToken = await user.getIdToken();
        const response = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/user/company-profile",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const profile = response.data.profile;

        setFormData({
          name: profile.name || "",
          entityName: profile.entityName || "",
          investmentFirmName: profile.investmentFirmName || "",
          position: profile.position || "",
          email: profile.email || "",
          contactNumber: profile.contactNumber || "",
          websiteUrl: profile.websiteUrl || "",
          linkedinUrl: profile.linkedinUrl || "",
          country: profile.country || "",
          city: profile.city || "",
          completeAddress: profile.completeAddress || "",
          investorType: profile.investorType || "",
          otherInvestorType: profile.otherInvestorType || "",
          investmentYears: profile.investmentYears || [],
          investmentExperience: profile.investmentExperience || "",
          otherInvestmentExperience: profile.otherInvestmentExperience || "",
          notableInvestments: profile.notableInvestments || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProfile(user);
      } else {
        console.error("User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up the observer on unmount
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = async (e) => {
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
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error.response?.data || error);
    }
  };
  const handleSelectChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: selectedOptions.map((option) => option.value),
    }));
  };
  if (loading) {
    return <div>Loading...</div>; // Display a loader while fetching the profile
  }

  return (
    <form className="default-form" onSubmit={handleSave}>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Entity Name</label>
          <input
            type="text"
            name="entityName"
            value={formData.entityName}
            onChange={handleChange}
            placeholder="Invisionn"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Investment Firm Name</label>
          <input
            type="text"
            name="investmentFirmName"
            value={formData.investmentFirmName}
            onChange={handleChange}
            placeholder="Invisionn"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Invisionn"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="0 123 456 7890"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder="www.invision.com"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Linkedin Url</label>
          <input
            type="text"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            placeholder="www.Linkedin.com"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            value={formData.completeAddress}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Investor Type</label>
          <input
            type="text"
            name="investorType"
            value={formData.investorType}
            onChange={handleChange}
            placeholder="Investor Type"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Other Investor Type</label>
          <input
            type="text"
            name="otherInvestorType"
            value={formData.otherInvestorType}
            onChange={handleChange}
            placeholder="Other Investor Type"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Investement Years</label>
          <input
            type="text"
            name="investmentYears"
            value={formData.investmentYears}
            onChange={handleChange}
            placeholder="Investement Years"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Investement Experience</label>
          <input
            type="text"
            name="investmentExperience"
            value={formData.investmentExperience}
            onChange={handleChange}
            placeholder="Investement Exp"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Investement Experience</label>
          <input
            type="text"
            name="otherInvestmentExperience"
            value={formData.otherInvestmentExperience}
            onChange={handleChange}
            placeholder="Investement Exp"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Notable Investments</label>
          <input
            type="text"
            name="notableInvestments"
            value={formData.notableInvestments}
            onChange={handleChange}
            placeholder="Notable Investments"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
