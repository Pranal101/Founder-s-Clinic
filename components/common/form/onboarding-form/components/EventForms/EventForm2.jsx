"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";
import { getAuth } from "firebase/auth";

const PostBoxForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
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
  const handleDateChange = (date, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: date ? date.toISOString() : null,
    }));
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
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

      const response = await axios.patch(
        "http://13.126.254.235:4000/api/user/profile",
        { profileData: formData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      if (file) {
        const formDataObj = new FormData();
        formDataObj.append("userId", user.uid); // Replace with the actual user ID
        formDataObj.append("profileType", "EnterpriseProfile"); // Example value
        formDataObj.append("documentType", "Resume"); // Example value
        formDataObj.append("documentName", file.name); // File name
        formDataObj.append("file", file); // The uploaded file

        const fileUploadResponse = await axios.post(
          "http://13.126.254.235:4000/api/user/upload",
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        console.log("File uploaded successfully:", fileUploadResponse.data);
      }
      window.location.assign("/candidates-dashboard/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
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
              type="url"
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
                type="url"
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
        {formData.eventType.includes("Other") && (
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
        {formData.targetAudience.includes("Other") && (
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
        <div className="custom-form-group form-group col-lg-6 col-md-12">
          <label className="custom-form-label">Event Start Date</label>
          <DatePicker
            selected={formData.eventStartDate}
            onChange={(date) => handleDateChange(date, "eventStartDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a start date"
            className="custom-margin"
            required
          />
        </div>
        <div className="custom-form-group form-group col-lg-6 col-md-12">
          <label className="custom-form-label">Event End Date</label>
          <DatePicker
            selected={formData.eventEndDate}
            onChange={(date) => handleDateChange(date, "eventEndDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select an end date"
            className="custom-margin"
            required
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
        {formData.recurringEvent.includes("Yes") && (
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
        {formData.registrationRequired.includes("Yes") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Registration Link</label>
            <input
              type="text"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleChange}
              placeholder="Registration Link"
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
        {formData.eventFeeBool.includes("Yes") && (
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
        {formData.discountsBool.includes("Yes") && (
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
        {formData.sponsorsBool.includes("Yes") && (
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
        {formData.eventPromotion.includes("Other") && (
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
        {formData.promotionalVideoBool.includes("Yes") && (
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
        {/* <!-- Conditions checkbox --> */}
        <div className="form-group col-lg-12 col-md-12">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="accept-terms" id="accept-terms" />
              <label
                htmlFor="accept-terms"
                className="accept-terms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              >
                <span className="custom-checkbox"></span> I agree to the terms &
                conditions and authorize Founders Clinic to contact me on the
                number provided. This will override the registry with DNC/NDNC.
              </label>
            </div>
          </div>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
