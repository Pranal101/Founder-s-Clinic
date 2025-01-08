"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    collaborationBool: "",
    collaboration: "",
    featuresRequirement: "",
    uniquePoint: "",
    painPoints: "",
    futureGoals: "",
    upcomingPrograms: "",
    successStories: "",
    featureTestimonials: "",
    additionalInfo: "",
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
          primaryFocusOther: profile.primaryFocusOther || "",
          numberOfMembers: profile.numberOfMembers || "",
          geographicReach: profile.geographicReach || "",
          servicesOffered: profile.servicesOffered || "",
          servicesOfferedOther: profile.servicesOfferedOther || "",
          notablePrograms: profile.notablePrograms || "",
          membershipType: profile.membershipType || "",
          eligibilityCriteria: profile.eligibilityCriteria || "",
          membersEngagement: profile.membersEngagement || "",
          membersEngagementOnline: profile.membersEngagementOnline || "",
          membersEngagementOther: profile.membersEngagementOther || "",
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

  return (
    <form className="default-form">
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Community Name</label>
          <input
            type="text"
            name="communityName"
            value={formData.communityName}
            placeholder="Invisionn"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Founder Name</label>
          <input
            type="text"
            name="founderName"
            value={formData.founderName}
            placeholder="Invisionn"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Est. Since</label>
          <input
            type="text"
            name="yearFounded"
            value={formData.yearFounded}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="text"
            name="emailAddress"
            value={formData.emailAddress}
            placeholder="Email Address"
            readOnly
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            placeholder="0 123 456 7890"
            readOnly
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="websiteLink"
            value={formData.websiteLink}
            placeholder="www.invision.com"
            readOnly
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            value={formData.completeAddress}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Primary Focus</label>
          <input
            type="text"
            name="primaryFocus"
            value={formData.primaryFocus}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Collaboration</label>
          <input
            type="text"
            name="collaboration"
            value={formData.collaboration}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Features Requirement </label>
          <input
            type="text"
            name="featuresRequirement"
            value={formData.featuresRequirement}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Unique Point</label>
          <input
            type="text"
            name="uniquePoint"
            value={formData.uniquePoint}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Pain Points</label>
          <input
            type="text"
            name="painPoints"
            value={formData.painPoints}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Future Goals</label>
          <input
            type="text"
            name="primaryFocus"
            value={formData.futureGoals}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Upcoming Programs</label>
          <input
            type="text"
            name="upcomingPrograms"
            value={formData.upcomingPrograms}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Feature Testimonials</label>
          <input
            type="text"
            name="featureTestimonials"
            value={formData.featureTestimonials}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Success Stories</label>
          <input
            type="text"
            name="successStories"
            value={formData.successStories}
            placeholder="06.04.2020"
            readOnly
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Additional Info</label>
          <input
            type="text"
            name="additionalInfo"
            value={formData.additionalInfo}
            placeholder="06.04.2020"
            readOnly
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
