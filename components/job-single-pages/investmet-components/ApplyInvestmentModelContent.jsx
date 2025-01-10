"use client";
import { useState } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase.js";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { toast } from "react-toastify";

const ApplyInvestmentModalContent = ({ investmentId }) => {
  const [formData, setFormData] = useState({
    message: "",
    termsAccepted: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const enterpriseId = "GpLAlGqBfTg7Vz54KM418uqAD432";

  const handleFileChange = (e) => {
    setFormData({ ...formData });
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

    if (!formData.message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    setError(null);

    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const senderName = auth.currentUser.displayName || "Anonymous";

      // Send the message
      await sendMessage(userId, senderName, enterpriseId, formData.message);
      setSuccess(true);
      toast.success("Proposal submitted successfully!");
    } catch (err) {
      console.error("Error sending message: ", err);
      setError("Failed to submit your proposal. Please try again.");
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
      if (!senderId) throw new Error("Sender ID is missing.");
      if (!senderName) throw new Error("Sender name is missing.");
      if (!recipientId) throw new Error("Recipient ID is missing.");
      if (!messageText.trim()) throw new Error("Message text is missing.");

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
    <form
      className="default-form investment-apply-form"
      onSubmit={handleSubmit}
    >
      {success && (
        <p className="success-message">Proposal submitted successfully!</p>
      )}
      {error && <p className="error-message">{error}</p>}

      <div className="row">
        {/* <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="uploading-outer apply-proposal-outer">
            <div className="uploadButton">
              <input
                className="uploadButton-input"
                type="file"
                name="proposal"
                accept=".doc,.docx,.pdf"
                id="uploadProposal"
                required
                onChange={handleFileChange}
              />
              <label
                className="uploadButton-button ripple-effect"
                htmlFor="uploadProposal"
              >
                Upload Proposal (doc, docx, pdf)
              </label>
            </div>
          </div>
        </div> */}
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
              id="acceptTerms"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
            />
            <label htmlFor="acceptTerms" className="remember">
              <span className="custom-checkbox"></span> You accept our{" "}
              <Link href="/terms">Terms and Conditions and Privacy Policy</Link>
            </label>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button className="theme-btn btn-style-one w-100" type="submit">
            Submit Proposal
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApplyInvestmentModalContent;
