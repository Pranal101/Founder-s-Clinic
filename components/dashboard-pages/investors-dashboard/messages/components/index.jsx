"use client";
import { useState, useEffect } from "react";
import { fetchChats, fetchMessages } from "@/data/firebaseChat";
import ContactList from "./ContactList";
import ContentField from "./ContentField";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ChatBox = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [userId, setUserId] = useState(null);
  // const userId = "B6TZjGHefyNug7IumD0jmKWSUi43";

  useEffect(() => {
    const fetchUserId = async (user) => {
      if (user) {
        setUserId(user.uid); // Dynamically set the userId
      } else {
        console.error("User not authenticated");
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserId(user); // Fetch userId when the user is authenticated
      } else {
      }
    });

    return () => unsubscribe(); // Clean up the observer on unmount
  }, []); // This effect runs once when the component mounts

  useEffect(() => {
    if (!userId) return;
    const loadContacts = async () => {
      const chatData = await fetchChats(userId);
      setContacts(chatData);
      if (chatData.length > 0) {
        setActiveChatId(chatData[0].id); // Set the first chat as active by default.
      }
    };
    loadContacts();
  }, [userId]);

  useEffect(() => {
    if (!activeChatId) return;
    const loadMessages = async () => {
      if (activeChatId) {
        const chatMessages = await fetchMessages(activeChatId);
        setMessages(chatMessages);
      }
    };
    loadMessages();
  }, [activeChatId]);

  return (
    <div className="row">
      <div className="contacts_column col-xl-4 col-lg-5 col-md-12 col-sm-12 chat">
        <div className="card contacts_card">
          {/* <div className="card-header">
            <SearchBox />
          </div> */}
          <div className="card-body contacts_body">
            <ContactList contacts={contacts} onSelectChat={setActiveChatId} />
          </div>
        </div>
      </div>
      <div className=" col-xl-8 col-lg-7 col-md-12 col-sm-12 chat">
        <ContentField messages={messages} chatId={activeChatId} />
      </div>
    </div>
  );
};
export default ChatBox;
