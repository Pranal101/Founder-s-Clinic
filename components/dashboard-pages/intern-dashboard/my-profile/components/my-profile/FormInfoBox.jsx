"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const FormInfoBox = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    entityName: "",
    organizationRole: "",
    contactNumber: "",
    emailAddress: "",
    websiteLink: "",
    experienceYears: "",
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
    { value: "Managemnet", label: "Managemnet" },
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
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          entityName: profile.entityName || "",
          emailAddress: profile.emailAddress || "",
          contactNumber: profile.contactNumber || "",
          organizationRole: profile.organizationRole || "",
          websiteLink: profile.websiteLink || "",
          experienceYears: profile.experienceYears || "",
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
    <form action="#" className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder=""
            value={formData.firstName}
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder=""
            readOnly
            value={formData.lastName}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Entity Name</label>
          <input
            type="text"
            name="entityName"
            value={formData.entityName}
            placeholder=""
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Organization Role</label>
          <input
            type="text"
            name="organizationRole"
            value={formData.organizationRole}
            placeholder=""
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="0 123 456 7890"
            value={formData.contactNumber}
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input
            type="text"
            name="name"
            value={formData.emailAddress}
            placeholder="creativelayers"
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="name"
            value={formData.websiteLink}
            placeholder="www.jerome.com"
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Current Salary($)</label>
          <select className="chosen-single form-select" readOnly>
            <option>40-70 K</option>
            <option>50-80 K</option>
            <option>60-90 K</option>
            <option>70-100 K</option>
            <option>100-150 K</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Expected Salary($)</label>
          <select className="chosen-single form-select" readOnly>
            <option>120-350 K</option>
            <option>40-70 K</option>
            <option>50-80 K</option>
            <option>60-90 K</option>
            <option>70-100 K</option>
            <option>100-150 K</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input
            type="text"
            name="experienceYears"
            value={formData.experienceYears}
            placeholder="Experience(in years)"
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Education Levels</label>
          <input type="text" name="name" placeholder="Certificate" readOnly />
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Categories </label>
          <Select
            defaultValue={[catOptions[1]]}
            isMulti
            name="colors"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            readOnly
          />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            readOnly
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            readOnly
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            placeholder="Complete Address"
            value={formData.completeAddress}
            readOnly
          />
        </div>

        {/* <!-- Input --> */}
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
