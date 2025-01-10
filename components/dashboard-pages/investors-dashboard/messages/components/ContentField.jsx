import { useState, useEffect } from "react";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "@/firebase"; // Ensure auth and db are correctly imported

const ContentField = ({ messages: propMessages, chatId }) => {
  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState(propMessages || []); // Rename to avoid conflict

  // Real-time listener to fetch messages
  useEffect(() => {
    if (!chatId) return; // Ensure chatId is available

    const chatRef = doc(db, "chats", chatId);

    // Subscribe to real-time changes
    const unsubscribe = onSnapshot(chatRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const chatData = docSnapshot.data();
        setLocalMessages(chatData.messages || []);
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const senderId = auth.currentUser?.uid; // Get the current user's UID
    const senderName = auth.currentUser?.displayName || "Anonymous";

    if (!message.trim() || !chatId || !senderId) {
      console.error("Message text, chatId, or senderId is missing.");
      return;
    }

    try {
      const chatRef = doc(db, "chats", chatId);

      // Add the message to the chat
      await updateDoc(chatRef, {
        messages: arrayUnion({
          senderId,
          senderName,
          text: message.trim(),
          timestamp: Timestamp.now(),
        }),
      });

      console.log("Message sent successfully!");
      setMessage(""); // Clear the message input
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="card message-card">
      <div className="card-body msg_card_body">
        {localMessages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex ${
              msg.senderId === auth.currentUser?.uid
                ? "justify-content-end reply"
                : "justify-content-start"
            } mb-2`}
          >
            <div className="msg_cotainer">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="card-footer">
        <form onSubmit={handleSendMessage}>
          <textarea
            className="form-control type_msg"
            name="message"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="theme-btn btn-style-one submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContentField;
