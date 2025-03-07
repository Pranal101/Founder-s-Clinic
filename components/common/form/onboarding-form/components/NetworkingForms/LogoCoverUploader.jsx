"use client";

import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth"; // For accessing the Firebase user token

const LogoCoverUploader = () => {
  const [logoImg, setLogoImg] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  // Get the Firebase user token
  const getUserToken = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userToken = await user.getIdToken(); // Fetch the user's token
        return userToken;
      } else {
        throw new Error("User is not authenticated");
      }
    } catch (error) {
      console.error("Error getting token:", error);
      throw error;
    }
  };

  // Logo image handler
  const logoHandler = async (e) => {
    const file = e.target.files[0];
    setLogoImg(file);

    if (file) {
      setUploadStatus("Uploading logo...");

      // Create FormData to send the file to the server
      const formData = new FormData();
      formData.append("file", file);

      try {
        const token = await getUserToken(); // Get the Firebase token

        const response = await axios.post(
          "https://founders-clinic-backend.onrender.com/api/user/upload-logo", // Your API endpoint for logo upload
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Include token in headers for authentication
            },
          }
        );
        setUploadStatus("Logo uploaded successfully!");
        console.log(response.data.logoUrl); // Handle the response with the URL if needed
      } catch (error) {
        setUploadStatus("Error uploading logo. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="uploading-outer">
        <div className="uploadButton">
          <input
            className="uploadButton-input"
            type="file"
            name="attachments[]"
            accept="image/*"
            id="upload"
            onChange={logoHandler}
          />
          <label className="uploadButton-button ripple-effect" htmlFor="upload">
            {logoImg !== "" ? logoImg?.name : " Upload Documents"}
          </label>
          <span className="uploadButton-file-name"></span>
        </div>
        <div className="text">
          Max file size is 1MB, Minimum dimension: 330x300, and suitable files
          are .jpg & .png
          <ul>
            <li>
              <strong>Suggested uploads:</strong>
            </li>
            <li>Brochure</li>
            <li>Presentation</li>
            <li>Poster/ Flyer</li>
            <li>Certificate/ Accreditation</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LogoCoverUploader;
{
  /* <div className="uploading-outer">
                <div className="uploadButton">
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*, application/pdf"
                        id="upload_cover"
                        onChange={(e) => coverHandler(e.target.files[0])}
                    />
                    <label
                        className="uploadButton-button ripple-effect"
                        htmlFor="upload_cover"
                    >
                        {converImg !== "" ? converImg?.name : "Browse Cover"}
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
                <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg & .png
                </div>
            </div> */
}
