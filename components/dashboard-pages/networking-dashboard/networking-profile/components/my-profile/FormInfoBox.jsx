"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const FormInfoBox = () => {
  const [formData, setFormData] = useState({
    communityName: "",
    founderName: "",
    yearFounded: "",
    email: "",
    contactNumber: "",
    country: "",
    city: "",
    websiteUrl: "",
    completeAddress: "",
    primaryFocus: [],
    numberOfMembers: "",
    geographicReach: "",
    servicesOffered: [],
    notablePrograms: "",
    membershipType: "",
    eligibilityCriteria: "",
    membersEngagement: "",
    membersEngagementOnline: "",
    futureGoals: "",
    featureTestimonials: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(true);

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
          communityName: profile.communityName || "",
          founderName: profile.founderName || "",
          yearFounded: profile.yearFounded || "",
          email: profile.email || "",
          contactNumber: profile.contactNumber || "",
          country: profile.country || "",
          city: profile.city || "",
          websiteLink: profile.websiteLink || "",
          completeAddress: profile.completeAddress || "",
          primaryFocus: profile.primaryFocus || "",
          numberOfMembers: profile.numberOfMembers || "",
          geographicReach: profile.geographicReach || "",
          servicesOffered: profile.servicesOffered || "",
          notablePrograms: profile.notablePrograms || "",
          membershipType: profile.membershipType || "",
          eligibilityCriteria: profile.eligibilityCriteria || "",
          membersEngagement: profile.membersEngagement || "",
          membersEngagementOnline: profile.membersEngagementOnline || "",
          collaborationBool: profile.collaborationBool || "",
          collaboration: profile.collaboration || "",
          featuresRequirement: profile.featuresRequirement || "",
          uniquePoint: profile.uniquePoint || "",
          painPoints: profile.painPoints || "",
          futureGoals: profile.futureGoals || "",
          upcomingPrograms: profile.upcomingPrograms || "",
          featureTestimonials: profile.featureTestimonials || "",
          successStories: profile.successStories || "",
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

  if (loading) {
    return <div>Loading...</div>; // Display a loader while fetching the profile
  }
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
  const handleSelectChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: selectedOptions.map((option) => option.value),
    }));
  };
  if (loading) {
    return <div>Loading...</div>; // Display a loader while fetching the profile
  }
  return (
    <form className="default-form" onSubmit={handleSave}>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Community Name</label>
          <input
            type="text"
            name="communityName"
            value={formData.communityName}
            onChange={handleChange}
            placeholder="Invisionn"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Founder Name</label>
          <input
            type="text"
            name="founderName"
            value={formData.founderName}
            onChange={handleChange}
            placeholder="Invisionn"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Est. Since</label>
          <input
            type="text"
            name="yearFounded"
            value={formData.yearFounded}
            onChange={handleChange}
            placeholder="06.04.2020"
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
          <label>Primary Focus</label>
          <input
            type="text"
            name="primaryFocus"
            value={formData.primaryFocus}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Collaboration</label>
          <input
            type="text"
            name="collaboration"
            value={formData.collaboration}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Features Requirement </label>
          <input
            type="text"
            name="featuresRequirement"
            value={formData.featuresRequirement}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Unique Point</label>
          <input
            type="text"
            name="uniquePoint"
            value={formData.uniquePoint}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Pain Points</label>
          <input
            type="text"
            name="painPoints"
            value={formData.painPoints}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Future Goals</label>
          <input
            type="text"
            name="primaryFocus"
            value={formData.futureGoals}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Upcoming Programs</label>
          <input
            type="text"
            name="upcomingPrograms"
            value={formData.upcomingPrograms}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Feature Testimonials</label>
          <input
            type="text"
            name="featureTestimonials"
            value={formData.featureTestimonials}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Success Stories</label>
          <input
            type="text"
            name="successStories"
            value={formData.successStories}
            onChange={handleChange}
            placeholder="06.04.2020"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Additional Info</label>
          <input
            type="text"
            name="additionalInfo"
            value={formData.additionalInfo}
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
