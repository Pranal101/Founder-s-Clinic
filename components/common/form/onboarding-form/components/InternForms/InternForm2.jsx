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
    linkedInProfile: "",
    educationStatus: "",
    institutionName: "",
    major: "",
    graduationDate: "",
    certifications: "",
    internshipPreferences: [],
    preferredDuration: "",
    preferredStartDate: "",
    preferredIndustries: "",
    preferredLocation: "",
    skills: [],
    softwareProficiency: "",
    workExperienceBoolean: "",
    workExperience: [
      {
        companyName: String,
        role: String,
        duration: String,
        responsibilities: String,
      },
    ],
    workingEnvironment: "",
    portfolioBoolean: "",
    portfolioLink: "",
    previousProjects: "",
    references: "",
    additionalInfo: "",
    specificExpectations: "",
    acceptTerms: false,
  });
  const preferences = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Retail", label: "Retail" },
    { value: "Remote", label: "Remote" },
    { value: "Onsite", label: "Onsite" },
    { value: "Hybrid", label: "Hybrid" },
  ];
  const skills = [
    { value: "Communication Skills", label: "Communication Skills" },
    { value: "Research and Analysis", label: "Research and Analysis" },
    { value: "Data Entry", label: "Data Entry" },
    {
      value: "Marketing and Social Media",
      label: "Marketing and Social Media",
    },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Web Development", label: "Web Development" },
    { value: "Content Writing", label: "Content Writing" },
    { value: "Financial Analysis", label: "Financial Analysis" },
    { value: "Administrative Support", label: "Administrative Support" },
    { value: "Project Management", label: "Project Management" },
  ];
  const handleDateChange = (date, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: date ? date.toISOString() : null,
    }));
  };
  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...formData.workExperience];
    updatedWorkExperience[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      workExperience: updatedWorkExperience,
    }));
  };

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        { companyName: "", role: "", duration: "", responsibilities: "" },
      ],
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
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
        "https://founders-clinic-backend.onrender.com/api/user/profile",
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
          "https://founders-clinic-backend.onrender.com/api/user/upload",
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
          <label>LinkedIn Profile Link</label>
          <input
            type="text"
            name="linkedInProfile"
            value={formData.linkedInProfile}
            onChange={handleChange}
            placeholder="Linkedin Profile Url"
          />
        </div>
        {/* Education */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Current Educational Status</label>
          <select
            className="chosen-single form-select"
            name="educationStatus"
            value={formData.educationStatus}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Undergraduate Student</option>
            <option>Graduate Student</option>
            <option>Recent Graduate</option>
          </select>
        </div>
        {/* <!-- Education --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Institution Name</label>
          <input
            type="text"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            placeholder="Institution Name"
          />
        </div>
        {/* <!-- Education --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Field of Study/Major</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            placeholder="Major"
          />
        </div>
        {/* <!-- Education --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Expected Graduation Date (or Graduation Year)</label>
          <input
            type="text"
            name="graduationDate"
            value={formData.graduationDate}
            onChange={handleChange}
            placeholder="Graduation Date"
          />
        </div>
        {/* <!-- Education --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Relevant Coursework or Certifications</label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder="Certifications"
          />
        </div>
        {/* <!-- Internship Interests and Preferences --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What type of internship are you seeking? </label>
          <Select
            // defaultValue={[preferences[2]]}
            isMulti
            name="internshipPreferences"
            options={preferences}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) =>
              handleMultiSelectChange(selected, "internshipPreferences")
            }
          />
        </div>
        {/* <!-- Internship Interests and Preferences --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Preferred Internship Duration </label>
          <select
            className="chosen-single form-select"
            name="preferredDuration"
            value={formData.preferredDuration}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>1-3 Months</option>
            <option>3-6 Months</option>
            <option>6-12 Months</option>
          </select>
        </div>
        {/* <!-- Internship Interests and Preferences --> */}
        <div className="custom-form-group form-group col-lg-6 col-md-12">
          <label className="custom-form-label">Prefered Start Date</label>
          <DatePicker
            selected={formData.preferredStartDate}
            onChange={(date) => handleDateChange(date, "preferredStartDate")}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a start date"
            className="custom-margin"
          />
        </div>
        {/* <!-- Internship Interests and Preferences --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Preferred Industries</label>
          <input
            type="text"
            name="preferredIndustries"
            value={formData.preferredIndustries}
            onChange={handleChange}
            placeholder="e.g., Technology, Finance, Marketing, Healthcare, etc."
          />
        </div>

        {/* <!-- Internship Interests and Preferences --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Preferred Location</label>
          <input
            type="text"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
            placeholder="Prefered Location"
          />
        </div>
        {/* <!-- Skills and Qualifications --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>What skills do you bring to the internship? </label>
          <Select
            // defaultValue={[preferences[2]]}
            isMulti
            name="skills"
            options={skills}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) => handleMultiSelectChange(selected, "skills")}
          />
        </div>
        {/* <!-- Skills and Qualifications --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Please list any software, tools, or platforms you are proficient in
          </label>
          <input
            type="text"
            name="softwareProficiency"
            value={formData.softwareProficiency}
            onChange={handleChange}
            placeholder="e.g., Microsoft Office, Google Suite, Adobe Creative Cloud, programming languages, etc."
          />
        </div>
        {/*  Work Experience --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Do you have any previous work or internship experience?</label>
          <select
            className="chosen-single form-select"
            name="workExperienceBoolean"
            value={formData.workExperienceBoolean}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* Work Experience Section
        <div className="form-group col-lg-12 col-md-12">
          <label>Work Experience</label>
          {formData.workExperience.map((experience, index) => (
            <div key={index} className="work-experience-entry">
              <input
                type="text"
                name={`companyName-${index}`}
                value={experience.companyName}
                onChange={(e) =>
                  handleWorkExperienceChange(
                    index,
                    "companyName",
                    e.target.value
                  )
                }
                placeholder="Company/Organization Name"
              />
              <input
                type="text"
                name={`role-${index}`}
                value={experience.role}
                onChange={(e) =>
                  handleWorkExperienceChange(index, "role", e.target.value)
                }
                placeholder="Role"
              />
              <input
                type="text"
                name={`duration-${index}`}
                value={experience.duration}
                onChange={(e) =>
                  handleWorkExperienceChange(index, "duration", e.target.value)
                }
                placeholder="Duration"
              />
              <input
                type="text"
                name={`responsibilities-${index}`}
                value={experience.responsibilities}
                onChange={(e) =>
                  handleWorkExperienceChange(
                    index,
                    "responsibilities",
                    e.target.value
                  )
                }
                placeholder="Responsibilities"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeWorkExperience(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addWorkExperience}>
            Add Work Experience
          </button>
        </div> */}

        {/*  Work Experience --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Company/Organization Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.workExperience.companyName}
            onChange={handleChange}
            placeholder="Previous Company Name"
          />
        </div>
        {/*  Work Experience --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={formData.workExperience.role}
            onChange={handleChange}
            placeholder="Role"
          />
        </div>
        {/*  Work Experience --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.workExperience.duration}
            onChange={handleChange}
            placeholder="Durations"
          />
        </div>
        {/*  Work Experience --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Responsibilities and Key Achievements</label>
          <input
            type="text"
            name="responsibilities"
            value={formData.workExperience.responsibilities}
            onChange={handleChange}
            placeholder="Responsibilities"
          />
        </div>
        {/* Availability and Work Preferences */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Are you open to working in a team environment or independently?
          </label>
          <select
            className="chosen-single form-select"
            name="workingEnvironment"
            value={formData.workingEnvironment}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Teamwork</option>
            <option>Independent</option>
            <option>Both</option>
          </select>
        </div>
        {/* Projects and Portfolio */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have a portfolio or examples of work that you would like to
            showcase?
          </label>
          <select
            className="chosen-single form-select"
            name="portfolioBoolean"
            value={formData.portfolioBoolean}
            onChange={handleChange}
          >
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        {/* Projects and Portfolio */}
        <div className="form-group col-lg-6 col-md-12">
          <label>If yes, please provide link for the portfolio</label>
          <input
            type="text"
            name="portfolioLink"
            value={formData.portfolioLink}
            onChange={handleChange}
            placeholder="Portolio Link"
          />
        </div>
        {/* Projects and Portfolio */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Please list any relevant projects you have worked on that
            demonstrate your skills
          </label>
          <input
            type="text"
            name="previousProjects"
            value={formData.previousProjects}
            onChange={handleChange}
            placeholder="Previous Projects"
          />
        </div>
        {/* References */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Provide any references if availabile</label>
          <input
            type="text"
            name="references"
            value={formData.references}
            onChange={handleChange}
            placeholder="References"
          />
        </div>
        {/* Additional Info */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Is there anything else you would like to add about yourself or your
            interests?
          </label>
          <input
            type="text"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Additional Info"
          />
        </div>
        {/* Additional Info */}
        <div className="form-group col-lg-6 col-md-12">
          <label>
            Do you have any specific questions or expectations from the
            internship provider?
          </label>
          <input
            type="text"
            name="specificExpectations"
            value={formData.specificExpectations}
            onChange={handleChange}
            placeholder="Specific Expectations"
          />
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>Upload Document</label>
          <input type="file" onChange={handleFileChange} />
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
