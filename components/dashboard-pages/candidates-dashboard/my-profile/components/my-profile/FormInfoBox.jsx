"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import countryData from "@/data/countries.json";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
const FormInfoBox = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    entityName: "",
    organizationRole: "",
    contactNumber: "",
    emailAddress: "",
    websiteLink: "",
    socialMediaLinks: "",
    experienceYears: "",
    qualification: "",
    certifications: "",
    associations: "",
    servicesOffered: [],
    otherServiceOffered: "",
    painPoints: "",
    industryExpertise: "",
    clientTestimonials: "",
    country: "",
    city: "",
    completeAddress: "",
  });

  const [loading, setLoading] = useState(true);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const servicesProvided = [
    {
      value: "Registration/ Compliance/ Certification",
      label: "Registration/ Compliance/ Certification",
    },
    {
      value: "Finance & Government Assistance",
      label: "Finance & Government Assistance",
    },
    { value: "Marketing and Branding", label: "Marketing and Branding" },
    {
      value: "Human Resources and Recruitment",
      label: "Human Resources and Recruitment",
    },
    { value: "IT and tech support", label: "IT and tech support" },
    {
      value: "Operations and Process Optimization",
      label: "Operations and Process Optimization",
    },
    { value: "Business Wellness", label: "Business Wellness" },
    { value: "Coaching and Mentoring", label: "Coaching and Mentoring" },
    { value: "Administrative Support", label: "Administrative Support" },
    { value: "Other", label: "Other" },
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
          organizationRole: profile.organizationRole || "",
          contactNumber: profile.contactNumber || "",
          emailAddress: profile.emailAddress || "",
          websiteLink: profile.websiteLink || "",
          socialMediaLinks: profile.socialMediaLinks || "",
          experienceYears: profile.experienceYears || "",
          qualification: profile.qualification || "",
          certifications: profile.certifications || "",
          associations: profile.associations || "",
          servicesOffered: profile.servicesOffered
            ? profile.servicesOffered.map((service) => ({
                value: service,
                label: service,
              }))
            : [],
          otherServiceOffered: profile.otherServiceOffered || "",
          painPoints: profile.painPoints || "",
          industryExpertise: profile.industryExpertise || "",
          clientTestimonials: profile.clientTestimonials || "",
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

  const handleSelectChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption || [], // Set as an array of objects (value and label)
    }));
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loader while fetching the profile
  }
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("User not authenticated");

      const userToken = await user.getIdToken();

      // Transform servicesOffered into an array of strings
      const payload = {
        ...formData,
        servicesOffered: formData.servicesOffered.map(
          (service) => service.value
        ), // Extract only values
      };

      console.log("Payload being sent:", payload); // Debugging

      const response = await axios.patch(
        "https://founders-clinic-backend.onrender.com/api/user/profile",
        { profileData: payload },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      console.log("Profile updated successfully:", response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error.response?.data || error);
      toast.error("Failed to save profile. Please try again.");
    }
  };
  return (
    <form className="default-form" onSubmit={handleSave}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder=""
            onChange={handleChange}
            value={formData.firstName}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder=""
            value={formData.lastName}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input
            type="text"
            name="name"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="creativelayers"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="name"
            value={formData.websiteLink}
            onChange={handleChange}
            placeholder="www.jerome.com"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input
            type="text"
            name="experienceYears"
            value={formData.experienceYears}
            placeholder="Experience(in years)"
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            placeholder="Qualification"
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Certifications</label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            placeholder="Certifications"
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Associations</label>
          <input
            type="text"
            name="associations"
            value={formData.associations}
            placeholder="Associations"
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Business Support Services</label>
          <Select
            defaultValue={formData.servicesOffered}
            name="servicesOffered"
            isMulti
            options={servicesProvided}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleSelectChange("servicesOffered", selected)
            }
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Other Services</label>
          <input
            type="text"
            name="otherServiceOffered"
            value={formData.otherServiceOffered}
            placeholder="Other Services Offered"
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Pain Points</label>
          <input
            type="text"
            name="painPoints"
            value={formData.painPoints}
            placeholder="Pain Points"
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Industry Expertise</label>
          <input
            type="text"
            name="industryExpertise"
            value={formData.industryExpertise}
            placeholder="Industry Expertise"
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Client Testimonials</label>
          <input
            type="text"
            name="clientTestimonials"
            value={formData.clientTestimonials}
            placeholder="Client Testimonials"
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <Select
            name="country"
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder={formData.country}
          />
        </div>

        {/* <!-- Input --> */}
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
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            placeholder="Complete Address"
            value={formData.completeAddress}
            onChange={handleChange}
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
