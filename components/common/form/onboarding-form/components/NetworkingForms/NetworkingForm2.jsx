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
    gst: "",
    primaryFocus: [],
    primaryFocusOther: "",
    numberOfMembers: "",
    geographicReach: "",
    servicesOffered: [],
    servicesOfferedOther: "",
    notablePrograms: "",
    membershipType: "",
    eligibilityCriteria: "",
    membersEngagement: "",
    membersEngagementOnline: "",
    membersEngagementOther: "",
    futureGoals: "",
    featureTestimonials: "",
    additionalInfo: "",
    acceptTerms: false,
  });
  const primaryFocusOptions = [
    {
      value: "Industry-specific networking",
      label: "Industry-specific networking",
    },
    { value: "Professional development", label: "Professional development" },
    {
      value: "Entrepreneurship and startups",
      label: "Entrepreneurship and startups",
    },
    { value: "Business matchmaking", label: "Business matchmaking" },
    { value: "Other", label: "Other" },
  ];
  const services = [
    {
      value: "Business networking events",
      label: "Business networking events",
    },
    { value: "Webinars and workshops", label: "Webinars and workshops" },
    { value: "Mentorship programs", label: "Mentorship programs" },
    { value: "Co-working spaces", label: "Co-working spaces" },
    { value: "Investment opportunities", label: "Investment opportunities" },
    { value: "Industry partnerships", label: "Industry partnerships" },
    {
      value: "Job boards or career services",
      label: "Job boards or career services",
    },
    { value: "Other", label: "Other" },
  ];
  const membersEngagementOptions = [
    { value: "Online platforms", label: "Online platforms" },
    { value: "In-person events", label: "In-person events" },
    { value: "Regular newsletters", label: "Regular newsletters" },
    { value: "Social media engagement", label: "Social media engagement" },
    { value: "Forums/discussion groups", label: "Forums/discussion groups" },
    { value: "Other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      window.location.assign("/networking-dashboard/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>GST no. (if registered under GST)</label>
          <input
            type="text"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            placeholder="Gst Number"
          />
        </div>
        {/* Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What is your primary focus?</label>
          <Select
            isMulti
            name="primaryFocus"
            options={primaryFocusOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleMultiSelectChange(selected, "primaryFocus")
            }
            required
          />
        </div>
        {formData.primaryFocus.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify your focus</label>
            <input
              type="text"
              name="primaryFocusOther"
              className="form-control"
              value={formData.primaryFocusOther}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Number of members</label>
          <input
            type="text"
            name="numberOfMembers"
            value={formData.numberOfMembers}
            onChange={handleChange}
            placeholder="Number of members"
            required
          />
        </div>

        {/* Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Geographic reach</label>
          <select
            className="chosen-single form-select"
            name="geographicReach"
            value={formData.geographicReach}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Local</option>
            <option>National</option>
            <option>International</option>
          </select>
        </div>

        {/* Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What services does your community offer?</label>
          <Select
            isMulti
            name="servicesOffered"
            options={services}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleMultiSelectChange(selected, "servicesOffered")
            }
            required
          />
        </div>
        {formData.servicesOffered.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify</label>
            <input
              type="text"
              name="servicesOfferedOther"
              className="form-control"
              value={formData.servicesOfferedOther}
              onChange={handleChange}
            />
          </div>
        )}
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Describe any notable programs, events, or initiatives run by the
            community.
          </label>
          <input
            type="text"
            name="notablePrograms"
            value={formData.notablePrograms}
            onChange={handleChange}
            placeholder="Notable Programs"
          />
        </div>
        {/* Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Is membership free or paid?</label>
          <select
            className="chosen-single form-select"
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Free</option>
            <option>Paid</option>
          </select>
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Eligibility criteria for joining</label>
          <input
            type="text"
            name="eligibilityCriteria"
            value={formData.eligibilityCriteria}
            onChange={handleChange}
            placeholder="Eligibility Criteria"
          />
        </div>
        {/* <!-- Internship Interests and Preferences --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>How does your community engage members?</label>
          <Select
            isMulti
            name="membersEngagement"
            options={membersEngagementOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleMultiSelectChange(selected, "membersEngagement")
            }
          />
        </div>
        {formData.membersEngagement.includes("Online platforms") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify the online platforms</label>
            <input
              type="text"
              name="membersEngagementOnline"
              className="form-control"
              value={formData.membersEngagementOnline}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.membersEngagement.includes("Other") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please specify other methods</label>
            <input
              type="text"
              name="membersEngagementOther"
              className="form-control"
              value={formData.membersEngagementOther}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Input */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you collaborate with other communities or businesses?
          </label>
          <select
            className="chosen-single form-select"
            name="collaborationBool"
            value={formData.collaborationBool}
            onChange={handleChange}
            required
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {formData.collaborationBool.includes("Yes") && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Please describe these partnerships</label>
            <input
              type="text"
              name="collaboration"
              className="form-control"
              value={formData.collaboration}
              onChange={handleChange}
            />
          </div>
        )} */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            What features do you look for in Founders’ Clinic to enhance
            networking?
          </label>
          <input
            type="text"
            name="featuresRequirement"
            className="form-control"
            value={formData.featuresRequirement}
            onChange={handleChange}
            placeholder="e.g., matchmaking, event management, payment processing"
          />
        </div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            What makes your community unique in comparison to others?
          </label>
          <input
            type="text"
            name="uniquePoint"
            className="form-control"
            value={formData.uniquePoint}
            onChange={handleChange}
            placeholder="Differentiators from others"
          />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            What are the key pain points your community helps businesses
            address?
          </label>
          <input
            type="text"
            name="painPoints"
            className="form-control"
            value={formData.painPoints}
            onChange={handleChange}
          />
        </div> */}
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What are your future goals for the community?</label>
          <input
            type="text"
            name="futureGoals"
            className="form-control"
            value={formData.futureGoals}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have any upcoming programs, partnerships, or initiatives?
          </label>
          <input
            type="text"
            name="upcomingPrograms"
            className="form-control"
            value={formData.upcomingPrograms}
            onChange={handleChange}
          />
        </div> */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>
            Please share a few success stories or case studies from members of
            your community.
          </label>
          <input
            type="text"
            name="successStories"
            className="form-control"
            value={formData.successStories}
            onChange={handleChange}
          />
        </div> */}
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Would you like to feature testimonials from your members?
          </label>
          <input
            type="text"
            name="featureTestimonials"
            className="form-control"
            value={formData.featureTestimonials}
            onChange={handleChange}
          />
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Is there anything else you would like to add about your community?
          </label>
          <input
            type="text"
            name="additionalInfo"
            className="form-control"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>
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
