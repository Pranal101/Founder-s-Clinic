"use client";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import countryData from "@/data/countries.json";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const PostBoxForm = () => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    hostName: "",
    companyName: "",
    email: "",
    contactNumber: "",
    websiteUrl: "",
    country: "",
    city: "",
    completeAddress: "",
    eventLocation: "",
    venueName: "",
    venueAddress: "",
    eventLink: "",
    eventType: [],
    eventTypeOther: "",
    eventTheme: "",
    description: "",
    keyObjectives: "",
    presenters: "",
    topicsPlanned: "",
    targetAudience: [],
    targetAudienceOther: "",
    expectedNumberOfAttendees: "",
    prerequisites: "",
    eventStartDate: "",
    eventEndDate: "",
    startTime: "",
    endTime: "",
    recurringEvent: "",
    recurringEventOther: "",
    eventRecording: "",
    registrationRequired: "",
    registrationLink: "",
    registrationProcess: "",
    eventFeeBool: "",
    eventFee: "",
    discountsBool: "",
    discounts: "",
    sponsorsBool: "",
    sponsorsList: [],
    seekingSponsors: "",
    eventPromotion: "",
    eventPromotionOther: "",
    promotionalVideoBool: "",
    promotionalVideo: "",
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [baseAddress, setBaseAddress] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const promotionOptions = [
    { value: "Social Media", label: "Social Media" },
    { value: "Email Marketing", label: "Email Marketing" },
    { value: "Partner/Network Promotion", label: "Partner/Network Promotion" },
    { value: "Paid Ads", label: "Paid Ads" },
    { value: "PR and Media Outreach", label: "PR and Media Outreach" },
    { value: "Other", label: "Other" },
  ];
  const eventType = [
    { value: "Conference", label: "Conference" },
    { value: "Workshop", label: "Workshop" },
    { value: "Seminar", label: "Seminar" },
    { value: "Webinar", label: "Webinar" },
    { value: "Networking Event", label: "Networking Event" },
    { value: "Product Launch", label: "Product Launch" },
    { value: "Webinar", label: "Webinar" },
    { value: "Panel Discussion", label: "Panel Discussion" },
    { value: "Trade Show", label: "Trade Show" },
    { value: "Roundtable", label: "Roundtable" },
    { value: "Other", label: "Other" },
  ];
  const targetAudienceOptions = [
    { value: "Entrepreneurs", label: "Entrepreneurs" },
    { value: "Startups", label: "Startups" },
    { value: "Small Business Owners", label: "Small Business Owners" },
    { value: "Corporations", label: "Corporations" },
    { value: "Investors", label: "Investors" },
    { value: "Industry Experts", label: "Industry Experts" },
    { value: "Students", label: "Students" },
    { value: "General Public", label: "General Public" },
    { value: "Other", label: "Other" },
  ];
  useEffect(() => {
    if (Array.isArray(countryData)) {
      const countries = countryData.map((country) => ({
        value: country.name,
        label: country.name,
        phoneCode: `+${country.phone_code}`,
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
    if (!selectedOption) return;

    const newPhoneCode = selectedOption.phoneCode; // Get new phone code
    setSelectedCountry(selectedOption);
    setPhoneCode(newPhoneCode);

    // Update fields only if they don't already start with the new phone code
    setFormData((prev) => ({
      ...prev,
      country: selectedOption.value,
      completeAddress: `${prev.city ? prev.city + ", " : ""}${
        selectedOption.value
      }`,
    }));

    if (selectedOption.cities.length > 0) {
      const cities = selectedOption.cities.map((city) => ({
        value: city,
        label: city,
      }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  };

  const isValidPhoneNumber = (number) => {
    const numericPart = number.replace(/\D/g, "").slice(phoneCode.length - 1); // Remove non-numeric characters & exclude country code
    return numericPart.length >= 8 && numericPart.length <= 15;
  };

  const handlePhoneChange = (e) => {
    if (!selectedCountry) {
      toast.error("Please select a country first.");
      setFormData((prev) => ({
        ...prev,
        contactNumber: "", // Clear input if no country is selected
      }));
      return;
    }

    let { value } = e.target;
    let numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    const countryCode = phoneCode.replace("+", ""); // Extract only numbers from country code

    // Ensure the number starts with the country code
    if (!numericValue.startsWith(countryCode)) {
      numericValue = countryCode;
    }

    // Extract numeric part excluding country code
    const numericPart = numericValue.slice(countryCode.length);

    // Ensure backspace doesn't introduce unwanted characters
    if (value.length < formData.contactNumber.length) {
      setFormData((prev) => ({
        ...prev,
        contactNumber: `+${numericValue}`,
      }));
      return;
    }

    // Prevent exceeding max phone number length
    if (numericPart.length > 15) {
      toast.error("Phone number cannot exceed 15 digits.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      contactNumber: `+${numericValue}`,
    }));
  };
  const handleCityChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      city: selectedOption ? selectedOption.value : "",
      completeAddress: `${baseAddress}${baseAddress ? ", " : ""}${
        selectedOption ? selectedOption.value + ", " : ""
      }${prev.country ? prev.country : ""}`,
    }));
  };
  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };
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
      skillsRequired: selectedOptions.map((option) => option.value),
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
        "https://founders-clinic-backend.onrender.com/api/user/new-events", // Backend job posting endpoint
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Event Posted!");
      console.log("Event posted successfully:", response.data);
      resetForm();
    } catch (error) {
      console.error("Error posting job:", error.response?.data || error);
    }
  };
  // Reset form function
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      entityName: "",
      emailAddress: "",
      contactNumber: "",
      bussinessSupport: [],
      otherbussinessSupport: "",
      supportDescription: "",
      supportDuration: "",
      skillsRequired: [],
      jobLocation: "",
      experience: "",
      genderPreference: "",
      budget: "",
      budgetFlexibility: "",
      expectedStartDate: null,
      completionTimeline: null,
    });
  };
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Event Title</label>
          <input
            type="text"
            name="eventTitle"
            placeholder="Event Title"
            value={formData.eventTitle}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Host Name</label>
          <input
            type="text"
            name="hostName"
            placeholder="Event Organizer/Host Name"
            value={formData.hostName}
            onChange={handleChange}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Organization/Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website Link</label>
          <input
            type="text"
            name="websiteUrl"
            placeholder="Website Link"
            value={formData.websiteUrl}
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
            placeholder="Select a country"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <Select
            name="city"
            options={cityOptions}
            onChange={handleCityChange}
            placeholder="Select a city"
            isDisabled={!selectedCountry || cityOptions.length === 0}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
            name="completeAddress"
            value={formData.completeAddress}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Event Location</label>
          <select
            className="chosen-single form-select"
            name="eventLocation"
            value={formData.eventLocation}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>In Person</option>
            <option>Virtual</option>
            <option>Hybrid</option>
          </select>
        </div>
        {/* Conditional Fields for Event Location */}
        {formData.eventLocation === "In Person" && (
          <>
            <div className="form-group col-lg-6 col-md-12">
              <label>Venue Name</label>
              <input
                type="text"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                placeholder="Enter Venue Name"
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Venue Address</label>
              <input
                type="text"
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleChange}
                placeholder="Enter Venue Address"
              />
            </div>
          </>
        )}

        {formData.eventLocation === "Virtual" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Event Link</label>
            <input
              type="text"
              name="eventLink"
              value={formData.eventLink}
              onChange={handleChange}
              placeholder="Enter Event Link"
            />
          </div>
        )}

        {formData.eventLocation === "Hybrid" && (
          <>
            <div className="form-group col-lg-6 col-md-12">
              <label>Event Link</label>
              <input
                type="text"
                name="eventLink"
                value={formData.eventLink}
                onChange={handleChange}
                placeholder="Enter Event Link"
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Venue Name</label>
              <input
                type="text"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                placeholder="Enter Venue Name"
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Venue Address</label>
              <input
                type="text"
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleChange}
                placeholder="Enter Venue Address"
              />
            </div>
          </>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>What type of event are you hosting? </label>
          <Select
            // defaultValue={[preferences[2]]}
            isMulti
            name="eventType"
            options={eventType}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleMultiSelectChange(selected, "eventType")
            }
            required
          />
        </div>
        {/* "Other" Event Type Specification */}
        {formData.eventType && formData.eventType.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please Specify</label>
            <input
              type="text"
              name="eventTypeOther"
              value={formData.eventTypeOther}
              onChange={handleChange}
              placeholder="Please specify the event type"
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>Event Theme or Focus Area</label>
          <input
            type="text"
            name="eventTheme"
            value={formData.eventTheme}
            onChange={handleChange}
            placeholder="e.g., Technology, Marketing, Finance, Leadership, Sustainability"
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Please provide a brief description of the event</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description"
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>What are the key objectives or goals of this event?</label>
          <input
            type="text"
            name="keyObjectives"
            value={formData.keyObjectives}
            onChange={handleChange}
            placeholder="Key objectives"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Who are the key speakers or presenters?</label>
          <input
            type="text"
            name="presenters"
            value={formData.presenters}
            onChange={handleChange}
            placeholder="Include short bios if available"
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>What topics or sessions will be covered?</label>
          <input
            type="text"
            name="topicsPlanned"
            value={formData.topicsPlanned}
            onChange={handleChange}
            placeholder="Provide a brief outline of the agenda"
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Who is the primary target audience for this event? </label>
          <Select
            isMulti
            name="targetAudience"
            options={targetAudienceOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleMultiSelectChange(selected, "targetAudience")
            }
            required
          />
        </div>
        {/* "Other" Target Audience Specification */}
        {formData.targetAudience &&
          formData.targetAudience.includes("Other") && (
            <div className="form-group col-lg-6 col-md-12">
              <label>Please Specify</label>
              <input
                type="text"
                name="targetAudienceOther"
                value={formData.targetAudienceOther}
                onChange={handleChange}
                placeholder="Please specify the target audience"
              />
            </div>
          )}

        <div className="form-group col-lg-6 col-md-12">
          <label>Expected number of attendees</label>
          <input
            type="text"
            name="expectedNumberOfAttendees"
            value={formData.expectedNumberOfAttendees}
            onChange={handleChange}
            placeholder="Expected number of attendees"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>
            Are there any prerequisites or qualifications for attending the
            event?
          </label>
          <input
            type="text"
            name="prerequisites"
            value={formData.prerequisites}
            onChange={handleChange}
            placeholder="e.g., experience level, industry"
            required
          />
        </div>

        {/* Event Dates */}
        {/* <div className="custom-form-group form-group col-lg-6 col-md-12">
          <label className="custom-form-label">Event Start Date</label>
          <DatePicker
            selected={formData.eventStartDate}
            onChange={(date) => handleDateChange(date, "eventStartDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a start date"
            className="custom-margin"
            required
          />
        </div> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Event Start Date</label>
          <input
            type="text"
            name="eventStartDate"
            value={formData.eventStartDate}
            onChange={(e) => {
              const { name, value } = e.target;

              // Allow input as long as it's a valid partial date or empty
              const partialDateRegex = /^(\d{0,2}(\/\d{0,2}(\/\d{0,2})?)?)?$/;

              if (partialDateRegex.test(value) || value === "") {
                setFormData((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }
            }}
            onBlur={(e) => {
              const { name, value } = e.target;

              // Validate full date format on blur
              const fullDateRegex =
                /^([0-2]?[0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{2})$/;

              if (!fullDateRegex.test(value) && value !== "") {
                toast.error("Please enter a valid date in DD/MM/YY format.");
              }
            }}
            placeholder="DD/MM/YY"
          />
        </div>
        {/* <div className="custom-form-group form-group col-lg-6 col-md-12">
          <label className="custom-form-label">Event End Date</label>
          <DatePicker
            selected={formData.eventEndDate}
            onChange={(date) => handleDateChange(date, "eventEndDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select an end date"
            className="custom-margin"
            required
          />
        </div> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Event End Date</label>
          <input
            type="text"
            name="eventEndDate"
            value={formData.eventEndDate}
            onChange={(e) => {
              const { name, value } = e.target;

              // Allow input as long as it's a valid partial date or empty
              const partialDateRegex = /^(\d{0,2}(\/\d{0,2}(\/\d{0,2})?)?)?$/;

              if (partialDateRegex.test(value) || value === "") {
                setFormData((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }
            }}
            onBlur={(e) => {
              const { name, value } = e.target;

              // Validate full date format on blur
              const fullDateRegex =
                /^([0-2]?[0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{2})$/;

              if (!fullDateRegex.test(value) && value !== "") {
                toast.error("Please enter a valid date in DD/MM/YY format.");
              }
            }}
            placeholder="DD/MM/YY"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Start Time</label>
          <input
            type="text"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            placeholder="Event starting time"
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>End Time</label>
          <input
            type="text"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            placeholder="Event end time"
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Is this a recurring event?</label>
          <select
            className="chosen-single form-select"
            name="recurringEvent"
            value={formData.recurringEvent}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* "Other" Specification */}
        {formData.recurringEvent && formData.recurringEvent.includes("Yes") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify the frequency</label>
            <input
              type="text"
              name="recurringEventOther"
              value={formData.recurringEventOther}
              onChange={handleChange}
              placeholder="Please specify the frequency"
              required
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>Will the event be recorded for later access?</label>
          <select
            className="chosen-single form-select"
            name="eventRecording"
            value={formData.eventRecording}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Is registration required to attend the event?</label>
          <select
            className="chosen-single form-select"
            name="registrationRequired"
            value={formData.registrationRequired}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* "Other" Specification */}
        {formData.registrationRequired === "Yes" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Registration Link</label>
            <input
              type="text"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleChange}
              placeholder="Registration Link"
              required
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>What is the registration process?</label>
          <input
            type="text"
            name="registrationProcess"
            value={formData.registrationProcess}
            onChange={handleChange}
            placeholder="e.g., free sign-up, application process, paid registration"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Is there a fee to attend the event?</label>
          <select
            className="chosen-single form-select"
            name="eventFeeBool"
            value={formData.eventFeeBool}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* "Other" Specification */}
        {formData.eventFeeBool === "Yes" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Provide fee details or ticket options</label>
            <input
              type="text"
              name="eventFee"
              value={formData.eventFee}
              onChange={handleChange}
              placeholder="Event Fee"
              required
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>Do you offer any discounts or early bird offers?</label>
          <select
            className="chosen-single form-select"
            name="discountsBool"
            value={formData.discountsBool}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* "Other" Specification */}
        {formData.discountsBool === "Yes" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify</label>
            <input
              type="text"
              name="discounts"
              value={formData.discounts}
              onChange={handleChange}
              placeholder="Discounts"
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>Are you working with any event sponsors or partners?</label>
          <select
            className="chosen-single form-select"
            name="sponsorsBool"
            value={formData.sponsorsBool}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* "Other" Specification */}
        {formData.sponsorsBool === "Yes" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please list the sponsors</label>
            <input
              type="text"
              name="sponsorsList"
              value={formData.sponsorsList}
              onChange={handleChange}
              placeholder="Sponsors list"
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>Are you seeking sponsors or partners for the event?</label>
          <select
            className="chosen-single form-select"
            name="seekingSponsors"
            value={formData.seekingSponsors}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>How are you promoting this event?</label>
          <Select
            isMulti
            name="eventPromotion"
            options={promotionOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleMultiSelectChange(selected, "eventPromotion")
            }
            required
          />
        </div>
        {/* "Other" Target Audience Specification */}
        {formData.eventPromotion &&
          formData.eventPromotion.includes("Other") && (
            <div className="form-group col-lg-6 col-md-12">
              <label>Please Specify</label>
              <input
                type="text"
                name="eventPromotionOther"
                value={formData.eventPromotionOther}
                onChange={handleChange}
                placeholder="Please specify"
              />
            </div>
          )}

        <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have a promotional video or media kit for the event?
          </label>
          <select
            className="chosen-single form-select"
            name="promotionalVideoBool"
            value={formData.promotionalVideoBool}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* "Other" Specification */}
        {formData.promotionalVideoBool === "Yes" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please provide links</label>
            <input
              type="text"
              name="promotionalVideo"
              value={formData.promotionalVideo}
              onChange={handleChange}
              placeholder="Promotional video links"
            />
          </div>
        )}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one">Post Event</button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
