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
    coFounderName: "",
    emailAddress: "",
    contactNumber: "",
    websiteLink: "",
    companyRole: "",
    entityName: "",
    businessName: "",
    businessType: "",
    foundedYear: "",
    industryType: "",
    businessDescription: "",
    socialMediaLinks: "",
    country: "",
    city: "",
    completeAddress: "",
    currentBusninessStage: "",
    otherBusinessStage: "",
    servicesOffered: "",
    platformServices: [],
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(true);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const businessRegistration = [
    { value: "Sole Proprietorship", label: "Sole Proprietorship" },
    {
      value: "Partnership",
      label: "Partnership",
    },
    { value: "LLP", label: "LLP" },
    { value: "OPC", label: "OPC" },
    { value: "Pvt. Ltd.", label: "Pvt. Ltd." },
  ];
  const servicesProvided = [
    {
      value: "Talent acquisition or recruitment",
      label: "Talent acquisition or recruitment",
    },
    {
      value: "Networking with other entrepreneurs",
      label: "Networking with other entrepreneurs",
    },
    { value: "Finding business partners", label: "Finding business partners" },
    { value: "Access to investors", label: "Access to investors" },
    { value: "Mentorship and advisory", label: "Mentorship and advisory" },
    { value: "Legal support", label: "Legal support" },
    { value: "Marketing support", label: "Marketing support" },
    {
      value: "Financial or accounting services",
      label: "Financial or accounting services",
    },
    { value: "IT and tech support", label: "IT and tech support" },
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
        console.log(profile);

        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          coFounderName: profile.coFounderName || "",
          emailAddress: profile.emailAddress || "",
          contactNumber: profile.contactNumber || "",
          websiteLink: profile.websiteLink || "",
          companyRole: profile.companyRole || "",
          entityName: profile.entityName || "",
          businessName: profile.businessName || "",
          businessType: profile.businessType || "",
          foundedYear: profile.foundedYear || "",
          industryType: profile.industryType || "",
          businessDescription: profile.businessDescription || "",
          socialMediaLinks: profile.socialMediaLinks || "",
          country: profile.country || "",
          city: profile.city || "",
          completeAddress: profile.completeAddress || "",
          currentBusninessStage: profile.currentBusninessStage || "",
          otherBusinessStage: profile.otherBusinessStage || "",
          servicesOffered: profile.servicesOffered || "",
          platformServices: profile.platformServices
            ? profile.platformServices.map((service) => ({
                value: service,
                label: service,
              }))
            : [],
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
  const handleSelectChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption
        ? selectedOption.map((option) => option.value) // Extract only the `value` property
        : [],
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("User not authenticated");

      const userToken = await user.getIdToken();

      const payload = {
        ...formData,
        platformServices: formData.platformServices, // Ensure platformServices is sent as an array of strings
      };

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
        {/* First Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        {/* Co-Founder Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Co-Founder Name</label>
          <input
            type="text"
            name="coFounderName"
            value={formData.coFounderName}
            onChange={handleChange}
            placeholder="Co-Founder Name"
          />
        </div>

        {/* Email Address */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="Email Address"
          />
        </div>

        {/* Contact Number */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="0 123 456 7890"
          />
        </div>

        {/* Website Link */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website Link</label>
          <input
            type="text"
            name="websiteLink"
            value={formData.websiteLink}
            onChange={handleChange}
            placeholder="www.example.com"
          />
        </div>

        {/* Company Role */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Company Role</label>
          <input
            type="text"
            name="companyRole"
            value={formData.companyRole}
            onChange={handleChange}
            placeholder="Your Role in the Company"
          />
        </div>

        {/* Entity Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Entity Name</label>
          <input
            type="text"
            name="entityName"
            value={formData.entityName}
            onChange={handleChange}
            placeholder="Entity Name"
          />
        </div>

        {/* Business Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Business Name"
          />
        </div>

        {/* Business Type */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Business Type</label>
          <input
            type="text"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            placeholder="Type of Business"
          />
        </div>

        {/* Founded Year */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Founded Year</label>
          <input
            type="text"
            name="foundedYear"
            value={formData.foundedYear}
            onChange={handleChange}
            placeholder="YYYY"
          />
        </div>

        {/* Business Country */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Business Country</label>
          <input
            type="text"
            name="businessCountry"
            value={formData.businessCountry}
            onChange={handleChange}
            placeholder="Business Country"
          />
        </div> */}

        {/* Business City */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Business City</label>
          <input
            type="text"
            name="businessCity"
            value={formData.businessCity}
            onChange={handleChange}
            placeholder="Business City"
          />
        </div> */}

        {/* Industry Type */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Industry Type</label>
          <input
            type="text"
            name="industryType"
            value={formData.industryType}
            onChange={handleChange}
            placeholder="Industry Type"
          />
        </div>

        {/* Business Description */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Business Description</label>
          <textarea
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleChange}
            placeholder="Describe your business..."
          />
        </div>

        {/* Social Media Links */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Social Media Links</label>
          <input
            type="text"
            name="socialMediaLinks"
            value={formData.socialMediaLinks}
            onChange={handleChange}
            placeholder="Social Media Links"
          />
        </div>

        {/* Country */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <Select
            name="country"
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder={formData.country}
          />
        </div>

        {/* City */}
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

        {/* Complete Address */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            value={formData.completeAddress}
            onChange={handleChange}
            placeholder="Complete Address"
          />
        </div>

        {/* Current Business Stage */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Current Business Stage</label>
          <input
            type="text"
            name="currentBusninessStage"
            value={formData.currentBusninessStage}
            onChange={handleChange}
            placeholder="Current Business Stage"
          />
        </div>

        {/* Other Business Stage */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Other Business Stage</label>
          <input
            type="text"
            name="otherBusinessStage"
            value={formData.otherBusinessStage}
            onChange={handleChange}
            placeholder="Other Business Stage (if applicable)"
          />
        </div>

        {/* Services Offered */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Services Offered</label>
          <input
            type="text"
            name="servicesOffered"
            value={formData.servicesOffered}
            onChange={handleChange}
            placeholder="Services Offered"
          />
        </div>

        {/* Platform Services */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            What types of services or solutions are you looking for on this
            platform?
          </label>
          <Select
            defaultValue={formData.platformServices}
            name="platformServices"
            isMulti
            options={servicesProvided}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleSelectChange("platformServices", selected)
            }
          />
        </div>

        {/* Additional Info */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Additional Info</label>
          <input
            type="text"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Additional Information"
          />
        </div>
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
