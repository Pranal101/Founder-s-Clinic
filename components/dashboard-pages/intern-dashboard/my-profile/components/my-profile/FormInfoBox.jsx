"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import countryData from "@/data/countries.json";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const FormInfoBox = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    linkedinUrl: "",
    socialMediaLinks: "",
    nationality: "",
    country: "",
    city: "",
    completeAddress: "",
    educationStatus: "",
    institutionName: "",
    major: "",
    certifications: "",
    internshipPreferences: [],
    preferredDuration: "",
    preferredStartDate: "",
    preferredIndustries: [],
    preferredLocation: "",
    softwareProficiency: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(true);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const preferences = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Remote", label: "Remote" },
    { value: "In-person", label: "In-person" },
    { value: "Hybrid", label: "Hybrid" },
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
          contactNumber: profile.contactNumber || "",
          email: profile.email || "",
          linkedinUrl: profile.linkedinUrl || "",
          socialMediaLinks: profile.socialMediaLinks || "",
          nationality: profile.nationality || "",
          country: profile.country || "",
          city: profile.city || "",
          completeAddress: profile.completeAddress || "",
          educationStatus: profile.educationStatus || "",
          institutionName: profile.institutionName || "",
          major: profile.major || "",
          certifications: profile.certifications || "",
          internshipPreferences: profile.internshipPreferences
            ? profile.internshipPreferences.map((service) => ({
                value: service,
                label: service,
              }))
            : [],
          preferredDuration: profile.preferredDuration || "",
          preferredStartDate: profile.preferredStartDate
            ? new Date(profile.preferredStartDate).toLocaleDateString("en-GB") // Formats to dd/mm/yyyy
            : "",
          preferredIndustries: profile.preferredIndustries || [],
          preferredLocation: profile.preferredLocation || "",
          softwareProficiency: profile.softwareProficiency || "",
          additionalInfo: profile.additionalInfo || "",
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

      // Transform internshipPreferences into an array of strings
      const sanitizedData = {
        ...formData,
        internshipPreferences: formData.internshipPreferences.map(
          (preference) => preference.value
        ),
      };

      console.log("Payload being sent:", sanitizedData);

      const response = await axios.patch(
        "https://founders-clinic-backend.onrender.com/api/user/profile",
        { profileData: sanitizedData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error.response?.data || error);
      toast.error("Failed to save profile. Please try again.");
    }
  };
  const handleSelectChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption || [], // Store selected options directly
    }));
  };
  if (loading) {
    return <div>Loading...</div>; // Display a loader while fetching the profile
  }
  return (
    <form className="default-form" onSubmit={handleSave}>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>LinkedIn URL</label>
          <input
            type="text"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Social Media Links</label>
          <input
            type="text"
            name="socialMediaLinks"
            value={formData.socialMediaLinks}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <Select
            name="country"
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder={formData.country}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <Select
            name="city"
            options={cityOptions}
            onChange={handleCityChange}
            placeholder={formData.city}
            isDisabled={!selectedCountry || cityOptions.length === 0}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            value={formData.completeAddress}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Education Status</label>
          <input
            type="text"
            name="educationStatus"
            value={formData.educationStatus}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Institution Name</label>
          <input
            type="text"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Major</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Certifications</label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>What type of internship are you seeking? </label>
          <Select
            defaultValue={formData.internshipPreferences}
            isMulti
            name="internshipPreferences"
            options={preferences}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleSelectChange("internshipPreferences", selected)
            }
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Preferred Duration</label>
          <input
            type="text"
            name="preferredDuration"
            value={formData.preferredDuration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Preferred Start Date</label>
          <input
            type="text"
            name="preferredStartDate"
            placeholder="dd/mm/yyyy"
            value={formData.preferredStartDate}
            onChange={(e) => {
              const { value } = e.target;
              // Allow typing but only keep valid characters (numbers and slashes)
              const sanitizedValue = value.replace(/[^0-9/]/g, "");
              setFormData((prevData) => ({
                ...prevData,
                preferredStartDate: sanitizedValue,
              }));
            }}
            onBlur={(e) => {
              const { value } = e.target;
              // Validate on blur (when the field loses focus)
              const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
              if (value && !dateRegex.test(value)) {
                toast.error("Date must be in dd/mm/yyyy format");
              }
            }}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Preferred Industries</label>
          <input
            type="text"
            name="preferredIndustries"
            placeholder={formData.preferredIndustries}
            value={formData.preferredIndustries}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Preferred Location</label>
          <input
            type="text"
            name="preferredLocation"
            placeholder={formData.preferredLocation}
            value={formData.preferredLocation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Software Proficiency</label>
          <input
            type="text"
            name="softwareProficiency"
            placeholder={formData.softwareProficiency}
            value={formData.softwareProficiency}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Additional Information</label>
          <input
            type="text"
            name="additionalInfo"
            placeholder={formData.additionalInfo}
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
