// import Link from "next/link";

// const ApplyJobModalContent = () => {
//   return (
//     <form className="default-form job-apply-form">
//       <div className="row">
//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <div className="uploading-outer apply-cv-outer">
//             <div className="uploadButton">
//               <input
//                 className="uploadButton-input"
//                 type="file"
//                 name="attachments[]"
//                 accept="image/*, application/pdf"
//                 id="upload"
//                 multiple=""
//                 required
//               />
//               <label
//                 className="uploadButton-button ripple-effect"
//                 htmlFor="upload"
//               >
//                 Upload CV (doc, docx, pdf)
//               </label>
//             </div>
//           </div>
//         </div>
//         {/* End .col */}

//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <textarea
//             className="darma"
//             name="message"
//             placeholder="Message"
//             required
//           ></textarea>
//         </div>
//         {/* End .col */}

//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <div className="input-group checkboxes square">
//             <input type="checkbox" name="remember-me" id="rememberMe" />
//             <label htmlFor="rememberMe" className="remember">
//               <span className="custom-checkbox"></span> You accept our{" "}
//               <span data-bs-dismiss="modal">
//                 <Link href="/terms">
//                   Terms and Conditions and Privacy Policy
//                 </Link>
//               </span>
//             </label>
//           </div>
//         </div>
//         {/* End .col */}

//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <button
//             className="theme-btn btn-style-one w-100"
//             type="submit"
//             name="submit-form"
//           >
//             Apply Job
//           </button>
//         </div>
//         {/* End .col */}
//       </div>
//     </form>
//   );
// };

// export default ApplyJobModalContent;

//LAST WORKING CODE
// "use client";
// import { useState } from "react";
// import { getAuth } from "firebase/auth";
// import axios from "axios";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import {
//   doc,
//   setDoc,
//   updateDoc,
//   arrayUnion,
//   Timestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase.js"; // Ensure this points to your Firebase config

// const ApplyJobModalContent = ({ jobId }) => {
//   const [formData, setFormData] = useState({
//     message: "",
//     resume: null,
//     termsAccepted: false,
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, resume: e.target.files[0] });
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.termsAccepted) {
//       setError("You must accept the terms and conditions.");
//       return;
//     }

//     if (!formData.resume) {
//       setError("Please upload your CV.");
//       return;
//     }

//     setError(null);

//     try {
//       const auth = getAuth();
//       const userToken = await auth.currentUser.getIdToken();
//       const userId = auth.currentUser.uid;
//       // Extract enterpriseId from job model using jobId
//       const enterpriseId = "GpLAlGqBfTg7Vz54KM418uqAD432";

//       const dataToSend = new FormData();
//       dataToSend.append("resume", formData.resume);
//       dataToSend.append("message", formData.message);
//       dataToSend.append("jobId", jobId);

//       const response = await axios.post(
//         "https://founders-clinic-backend.onrender.com/api/user/apply",
//         dataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         setSuccess(true);
//         setError(null);
//         toast.success("Applied to this job");

//         // Send the message
//         await sendMessage(userId, enterpriseId, formData.message);
//       }
//     } catch (err) {
//       console.log(err);
//       setError("Failed to submit your application. Please try again.");
//       setSuccess(false);
//     }
//   };
//   const sendMessage = async (senderId, recipientId, messageText) => {
//     try {
//       // Generate a consistent chatId based on participants
//       const chatId = [senderId, recipientId].sort().join("_");

//       const chatRef = doc(db, "chats", chatId);

//       // Check if chat exists or create it
//       await setDoc(
//         chatRef,
//         {
//           participants: [senderId, recipientId],
//         },
//         { merge: true }
//       );

//       // Add the message to the chat
//       await updateDoc(chatRef, {
//         messages: arrayUnion({
//           senderId,
//           text: messageText,
//           timestamp: Timestamp.now(),
//         }),
//       });

//       console.log("Message sent successfully!");
//     } catch (error) {
//       console.error("Error sending message: ", error);
//     }
//   };

//   return (
//     <form className="default-form job-apply-form" onSubmit={handleSubmit}>
//       {success && (
//         <p className="success-message">Application submitted successfully!</p>
//       )}
//       {error && <p className="error-message">{error}</p>}

//       <div className="row">
//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <div className="uploading-outer apply-cv-outer">
//             <div className="uploadButton">
//               <input
//                 className="uploadButton-input"
//                 type="file"
//                 name="resume"
//                 accept=".doc,.docx,.pdf"
//                 id="upload"
//                 required
//                 onChange={handleFileChange}
//               />
//               <label
//                 className="uploadButton-button ripple-effect"
//                 htmlFor="upload"
//               >
//                 Upload CV (doc, docx, pdf)
//               </label>
//             </div>
//           </div>
//         </div>
//         {/* End .col */}

//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <textarea
//             className="darma"
//             name="message"
//             placeholder="Message"
//             value={formData.message}
//             onChange={handleInputChange}
//             required
//           ></textarea>
//         </div>
//         {/* End .col */}

//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <div className="input-group checkboxes square">
//             <input
//               type="checkbox"
//               name="termsAccepted"
//               id="rememberMe"
//               checked={formData.termsAccepted}
//               onChange={handleInputChange}
//             />
//             <label htmlFor="rememberMe" className="remember">
//               <span className="custom-checkbox"></span> You accept our{" "}
//               <span data-bs-dismiss="modal">
//                 <Link href="/terms">
//                   Terms and Conditions and Privacy Policy
//                 </Link>
//               </span>
//             </label>
//           </div>
//         </div>
//         {/* End .col */}

//         <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//           <button className="theme-btn btn-style-one w-100" type="submit">
//             Apply Job
//           </button>
//         </div>
//         {/* End .col */}
//       </div>
//     </form>
//   );
// };

// export default ApplyJobModalContent;
"use client";
import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase.js";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

const ApplyJobModalContent = ({ jobId }) => {
  const [enterpriseId, setEnterpriseId] = useState(null);
  const [formData, setFormData] = useState({
    message: "",
    resume: null,
    termsAccepted: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEnterpriseId = async () => {
      try {
        const response = await axios.get(
          `https://founders-clinic-backend.onrender.com/api/jobs/${jobId}/enterpriseId`
        );
        setEnterpriseId(response.data.enterpriseId);
      } catch (error) {
        console.error("Error fetching enterpriseId:", error);
        setError("Failed to load job details. Please try again later.");
      }
    };

    fetchEnterpriseId();
  }, [jobId]);
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    if (!formData.resume) {
      setError("Please upload your CV.");
      return;
    }
    if (!enterpriseId) {
      setError("Failed to retrieve enterprise ID. Please try again later.");
      return;
    }

    setError(null);

    try {
      const auth = getAuth();
      const userToken = await auth.currentUser.getIdToken();
      const userId = auth.currentUser.uid;
      const senderName = auth.currentUser.displayName || "Anonymous"; // Fetch sender's name
      // const enterpriseId = "GpLAlGqBfTg7Vz54KM418uqAD432";

      const dataToSend = new FormData();
      dataToSend.append("resume", formData.resume);
      dataToSend.append("message", formData.message);
      dataToSend.append("jobId", jobId);

      const response = await axios.post(
        "https://founders-clinic-backend.onrender.com/api/user/apply",
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        toast.success("Applied to this job");

        // Send the message
        await sendMessage(userId, senderName, enterpriseId, formData.message);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to submit your application. Please try again.");
      setSuccess(false);
    }
  };

  const sendMessage = async (
    senderId,
    senderName,
    recipientId,
    messageText
  ) => {
    try {
      const chatId = [senderId, recipientId].sort().join("_");
      const chatRef = doc(db, "chats", chatId);

      await setDoc(
        chatRef,
        {
          participants: [senderId, recipientId],
        },
        { merge: true }
      );

      await updateDoc(chatRef, {
        messages: arrayUnion({
          senderId,
          senderName,
          text: messageText,
          timestamp: Timestamp.now(),
        }),
      });

      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <form className="default-form job-apply-form" onSubmit={handleSubmit}>
      {success && (
        <p className="success-message">Application submitted successfully!</p>
      )}
      {error && <p className="error-message">{error}</p>}

      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="uploading-outer apply-cv-outer">
            <div className="uploadButton">
              <input
                className="uploadButton-input"
                type="file"
                name="resume"
                accept=".doc,.docx,.pdf"
                id="upload"
                required
                onChange={handleFileChange}
              />
              <label
                className="uploadButton-button ripple-effect"
                htmlFor="upload"
              >
                Upload CV (doc, docx, pdf)
              </label>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <textarea
            className="darma"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="input-group checkboxes square">
            <input
              type="checkbox"
              name="termsAccepted"
              id="rememberMe"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
            />
            <label htmlFor="rememberMe" className="remember">
              <span className="custom-checkbox"></span> You accept our{" "}
              <span data-bs-dismiss="modal">
                <Link href="/terms">
                  Terms and Conditions and Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button className="theme-btn btn-style-one w-100" type="submit">
            Apply Inquiry
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApplyJobModalContent;
