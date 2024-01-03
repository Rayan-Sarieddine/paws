import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { initializeApp } from "firebase/app";
import Nav from "../../components/common/Nav";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc
} from "firebase/firestore";
import { userDataSource } from "../../core/dataSource/remoteDataSource/users";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCemY9__9lewboLj42gOTJwbxw08S2BTxU",
  authDomain: "paws-14942.firebaseapp.com",
  projectId: "paws-14942",
  storageBucket: "paws-14942.appspot.com",
  messagingSenderId: "271712521257",
  appId: "1:271712521257:web:6a43b2e2a06b40b32b6038",
  measurementId: "G-L86Q9FRGK0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const firestore = getFirestore();

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState([]);
  const dummy = useRef();
  const adminId = "65925d9872539764b4d1af31";

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userDataSource.getAllUsers();
        const filteredUsers = response.users.filter((user) => user.userType === "USER");
        setUsers(filteredUsers);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    //Get chat session and messages of a user
    if (currentUserId) {
      const chatSessionRef = doc(firestore, `chats/${currentUserId}_${adminId}`);
      const messagesRef = collection(chatSessionRef, "messages");
      const q = query(messagesRef, orderBy("createdAt"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setMessages(messages);
        dummy.current.scrollIntoView({ behavior: "smooth" });
      });
      return unsubscribe;
    }
  }, [currentUserId, adminId]);

  //Function to handle sending the message to firebase
  const sendMessage = async (e) => {
    e.preventDefault();

    const chatSessionRef = doc(firestore, `chats/${currentUserId}_${adminId}`);
    const messagesRef = collection(chatSessionRef, "messages");
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      userId: adminId
    });
    setFormValue("");
  };

  //Function to handle selecting a user from the available list of users
  const selectUser = (userId, user) => {
    setCurrentUserId(userId);
    setSelectedUser(user);
  };

  //Function to handle creating the required timestamp for each message
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
    <div className="admin-chat">
      <Nav />
      <div className="user-selector">
        <p className="chats-intro">chats</p>

        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => selectUser(user._id, user)}
            className="user-selector-item"
          >
            <img src={`http://localhost:8000/images/users/${user.image}`} alt="user_img" />
            <p>{user.name}</p>
          </div>
        ))}
      </div>

      <div className="chat">
        {selectedUser && (
          <div className="selected-user">
            <img src={`http://localhost:8000/images/users/${selectedUser.image}`} alt="user_img" />
            <p>{selectedUser.name}</p>
          </div>
        )}

        <main>
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.userId === adminId ? "sent" : "received"}`}>
              <p>{msg.text}</p>
              <p className="time-message">{formatTimestamp(msg.createdAt)}</p>
            </div>
          ))}
          <span ref={dummy}></span>
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
    </div>
  );
};

export default AdminChat;
