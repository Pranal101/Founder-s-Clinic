"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

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
  // const handleSelectChange = (selectedOptions) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     categories: selectedOptions.map((option) => option.value),
  //   }));
  // };

  if (loading) {
    return <div>Loading...</div>; // Display a loader while fetching the profile
  }

  return (
    <form className="default-form" onSubmit={handleSave}>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Company Name (optional)</label>
          <input
            type="text"
            name="entityName"
            value={formData.entityName}
            onChange={handleChange}
            placeholder="Invisionn"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="text"
            name="emailAddress"
            value={formData.emailAddress}
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
            name="websiteLink"
            value={formData.websiteLink}
            onChange={handleChange}
            placeholder="www.invision.com"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Est. Since</label>
          <input
            type="text"
            name="foundedYear"
            value={formData.foundedYear}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Team Size</label>
          <select
            className="chosen-single form-select"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
          >
            <option value="">Select team size</option>
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
            onChange={handleChange}
            placeholder="About the company..."
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Social Media Links</label>
          <input
            type="text"
            name="socialMediaLinks"
            value={formData.socialMediaLinks}
            onChange={handleChange}
            placeholder="06.04.2020"
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
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
