// import Image from "next/image";
// import ChatHamburger from "./ChatHamburger";

// const ChatBoxContentField = () => {
//   return (
//     <div className="card message-card">
//       <div className="card-header msg_head">
//         <div className="d-flex bd-highlight">
//           <div className="img_cont">
//             <Image
//               width={48}
//               height={48}
//               src="/images/resource/candidate-8.png"
//               alt="candidates"
//               className="rounded-circle user_img"
//             />
//           </div>
//           <div className="user_info">
//             <span>Arlene McCoy</span>
//             <p>Active</p>
//           </div>
//         </div>

//         <div className="btn-box">
//           <button className="dlt-chat">Delete Conversation</button>
//           <ChatHamburger />
//         </div>
//       </div>
//       {/* End .cart-header */}

//       <div className="card-body msg_card_body">
//         <div className="d-flex justify-content-start mb-2">
//           <div className="img_cont_msg">
//             <Image
//               width={48}
//               height={48}
//               src="/images/resource/candidate-3.png"
//               alt="candidates"
//               className="rounded-circle user_img_msg"
//             />
//             <div className="name">
//               Albert Flores <span className="msg_time">35 mins</span>
//             </div>
//           </div>
//           <div className="msg_cotainer">
//             How likely are you to recommend our company to your friends and
//             family?
//           </div>
//         </div>

//         <div className="d-flex justify-content-end mb-2 reply">
//           <div className="img_cont_msg">
//             <Image
//               width={48}
//               height={48}
//               src="/images/resource/candidate-6.png"
//               alt="candidate"
//               className="rounded-circle user_img_msg"
//             />
//             <div className="name">
//               You <span className="msg_time">35 mins</span>
//             </div>
//           </div>
//           <div className="msg_cotainer">
//             Hey there, we’re just writing to let you know that you’ve been
//             subscribed to a repository on GitHub.
//           </div>
//         </div>

//         <div className="d-flex justify-content-start">
//           <div className="img_cont_msg">
//             <Image
//               width={48}
//               height={48}
//               src="/images/resource/candidate-3.png"
//               alt="candidate"
//               className="rounded-circle user_img_msg"
//             />
//             <div className="name">
//               Cameron Williamson <span className="msg_time">35 mins</span>
//             </div>
//           </div>
//           <div className="msg_cotainer">Ok, Understood!</div>
//         </div>
//       </div>
//       {/* End .card-body */}

//       <div className="card-footer">
//         <div className="form-group mb-0">
//           <form>
//             <textarea
//               className="form-control type_msg"
//               placeholder="Type a message..."
//               required
//             ></textarea>
//             <button
//               type="submit"
//               className="theme-btn btn-style-one submit-btn"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//       {/* End .card-footer */}
//     </div>
//   );
// };

// export default ChatBoxContentField;
// import { useState } from "react";
// import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
// import { db } from "@/firebase";
// import { auth } from "@/firebase"; // Ensure auth is properly imported and initialized

// const ContentField = ({ messages, chatId }) => {
//   const [message, setMessage] = useState("");

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     const senderId = auth.currentUser?.uid; // Get the current user's UID
//     const senderName = auth.currentUser?.displayName || "Anonymous";

//     if (!message.trim() || !chatId || !senderId) {
//       console.error("Message text, chatId, or senderId is missing.");
//       return;
//     }

//     try {
//       const chatRef = doc(db, "chats", chatId);

//       // Add the message to the chat
//       await updateDoc(chatRef, {
//         messages: arrayUnion({
//           senderId,
//           senderName,
//           text: message.trim(),
//           timestamp: Timestamp.now(),
//         }),
//       });

//       console.log("Message sent successfully!");
//       setMessage(""); // Clear the message input
//     } catch (error) {
//       console.error("Error sending message: ", error);
//     }
//   };

//   return (
//     <div className="card message-card">
//       <div className="card-body msg_card_body">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`d-flex ${
//               msg.senderId === auth.currentUser?.uid
//                 ? "justify-content-end reply"
//                 : "justify-content-start"
//             } mb-2`}
//           >
//             <div className="msg_cotainer">{msg.text}</div>
//           </div>
//         ))}
//       </div>
//       <div className="card-footer">
//         <form onSubmit={handleSendMessage}>
//           <textarea
//             className="form-control type_msg"
//             name="message"
//             placeholder="Type a message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           ></textarea>
//           <button type="submit" className="theme-btn btn-style-one submit-btn">
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContentField;
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
