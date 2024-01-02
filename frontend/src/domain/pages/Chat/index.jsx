import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import Footer from "../../components/common/Footer";
import { useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCemY9__9lewboLj42gOTJwbxw08S2BTxU",
  authDomain: "paws-14942.firebaseapp.com",
  projectId: "paws-14942",
  storageBucket: "paws-14942.appspot.com",
  messagingSenderId: "271712521257",
  appId: "1:271712521257:web:6a43b2e2a06b40b32b6038",
  measurementId: "G-L86Q9FRGK0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const Chat = () => {
  const user = useSelector((state) => {
    return state.User;
  });
  const userId = user.user_id;
  console.log(userId);
  const adminId = "65925d9872539764b4d1af31";
  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState([]);
  const dummy = useRef();

  useEffect(() => {
    // Define the chat session reference
    const chatSessionRef = doc(firestore, `chats/${userId}_${adminId}`);
    const messagesRef = collection(chatSessionRef, "messages");
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messages);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    });

    return unsubscribe; // Cleanup on unmount
  }, [userId, adminId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (formValue.trim()) {
      const chatSessionRef = doc(firestore, `chats/${userId}_${adminId}`);
      const messagesRef = collection(chatSessionRef, "messages");

      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        userId, // User ID from JWT authentication
      });

      setFormValue("");
    }
  };
  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesPadded = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutesPadded} ${ampm}  ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };
  return (
    <div className="chat-section">
      <Nav />
      <div className="chat">
        <div className="admin-info">
          <img
            src="http://localhost:8000/images/users/default_profile_image.png"
            alt="admin_def_image"
          />
          <p>Customer Support</p>
        </div>
        <main>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${
                msg.userId === userId ? "sent" : "received"
              }`}
            >
              <p>{msg.text}</p>
              <p className="time-message">{formatTimestamp(msg.createdAt)}</p>
            </div>
          ))}
          <span ref={dummy} className="dummy"></span>
        </main>

        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type your message"
          />
          <button type="submit" disabled={!formValue.trim()}>
            Send
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
