"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FormInfoBox = () => {
  const [formData, setFormData] = useState({
    entityName: "",
    emailAddress: "",
    contactNumber: "",
    websiteLink: "",
    foundedYear: "",
    teamSize: "",
    categories: [],
    allowSearchListing: "",
    businessDescription: "",
    socialMediaLinks: "",
    country: "",
    city: "",
    completeAddress: "",
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
          entityName: profile.entityName || "",
          emailAddress: profile.emailAddress || "",
          contactNumber: profile.contactNumber || "",
          websiteLink: profile.websiteLink || "",
          foundedYear: profile.foundedYear || "",
          teamSize: profile.teamSize || "",
          categories: profile.categories || [],
          allowSearchListing: profile.allowSearchListing ? "Yes" : "No",
          businessDescription: profile.businessDescription || "",
          socialMediaLinks: profile.socialMediaLinks || "",
          country: profile.country || "",
          city: profile.city || "",
          completeAddress: profile.completeAddress || "",
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

  if (loading) {
    return <div>Loading...</div>; // Display a loader while fetching the profile
  }

  return (
    <form className="default-form">
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Company Name (optional)</label>
          <input
            type="text"
            name="entityName"
            value={formData.entityName}
            placeholder="Invisionn"
            readOnly
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="text"
            name="emailAddress"
            value={formData.emailAddress}
            placeholder="Email Address"
            readOnly
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            placeholder="0 123 456 7890"
            readOnly
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="websiteLink"
            value={formData.websiteLink}
            placeholder="www.invision.com"
            readOnly
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Est. Since</label>
          <input
            type="text"
            name="foundedYear"
            value={formData.foundedYear}
            placeholder="06.04.2020"
            readOnly
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Team Size</label>
          <select
            className="chosen-single form-select"
            name="teamSize"
            value={formData.teamSize}
            readOnly
          >
            <option value="50 - 100">50 - 100</option>
            <option value="100 - 150">100 - 150</option>
            <option value="200 - 250">200 - 250</option>
            <option value="300 - 350">300 - 350</option>
            <option value="500 - 1000">500 - 1000</option>
          </select>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>About Company</label>
          <textarea
            name="businessDescription"
            value={formData.businessDescription}
            placeholder="About the company..."
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Social Media Links</label>
          <input
            type="text"
            name="socialMediaLinks"
            value={formData.socialMediaLinks}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            value={formData.completeAddress}
            placeholder="06.04.2020"
            readOnly
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
