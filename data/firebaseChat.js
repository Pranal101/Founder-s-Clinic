import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

export const fetchChats = async (userId) => {
  try {
    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", userId)
    );
    const chatDocs = await getDocs(q);
    const chats = chatDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};

export const fetchMessages = async (chatId) => {
  try {
    const chatRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatRef);
    return chatDoc.exists() ? chatDoc.data().messages : [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
