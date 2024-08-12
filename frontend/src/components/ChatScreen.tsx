import React, { useState, useEffect } from "react";
import "../css/ChatScreen.css";
import { Avatar } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    orderBy,
    onSnapshot,
    addDoc,
    Timestamp
} from "firebase/firestore";

interface UserData {
    name: string;
    profilePic: string;
}

function ChatScreen() {
    const { chatId } = useParams<{ chatId: string }>();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [otherUser, setOtherUser] = useState<UserData | null>(null);

    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    const navigate = useNavigate();

    useEffect(() => {
        if (!chatId) {
            console.error("Chat ID is undefined. Redirecting to the chats page.");
            navigate("/chats");
            return;
        }

        const fetchChatData = async () => {
            try {
                const chatDocRef = doc(db, 'chats', chatId);
                const chatDoc = await getDoc(chatDocRef);

                if (chatDoc.exists()) {
                    const chatData = chatDoc.data();
                    const userIds = chatData?.userIds || [];

                    for (const id of userIds) {
                        if (id !== userId) {
                            let userQuery: any;
                            let name: string;
                            let profilePic: string;

                            if (userType === 'employee') {
                                userQuery = query(
                                    collection(db, 'employer'),
                                    where("companyMail", "==", id)
                                );
                                const querySnapshot = await getDocs(userQuery);
                                if (!querySnapshot.empty) {
                                    const userDoc = querySnapshot.docs[0];
                                    const userData = userDoc.data();
                                    name = userData?.companyName || "Unknown";
                                    profilePic = userData?.picture || "";
                                    setOtherUser({ name, profilePic });
                                } else {
                                    console.error(`No employer document found for companyMail ${id}`);
                                }
                            } else if (userType === 'employer') {
                                userQuery = query(
                                    collection(db, 'employee'),
                                    where("email", "==", id)
                                );
                                const querySnapshot = await getDocs(userQuery);
                                if (!querySnapshot.empty) {
                                    const userDoc = querySnapshot.docs[0];
                                    const userData = userDoc.data();
                                    name = userData?.name || "Unknown";
                                    profilePic = userData?.picture || "";
                                    setOtherUser({ name, profilePic });
                                } else {
                                    console.error(`No employee document found for email ${id}`);
                                }
                            } else {
                                console.error("Unknown user type");
                            }
                            break;
                        }
                    }
                } else {
                    console.error(`Chat document does not exist for chatId ${chatId}`);
                }
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        };

        const fetchMessages = () => {
            try {
                const messagesQuery = query(
                    collection(db, 'chats', chatId, 'messages'),
                    orderBy("timestamp")
                );

                const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
                    const fetchedMessages = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setMessages(fetchedMessages);
                });

                return unsubscribe;
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchChatData();
        fetchMessages();
    }, [chatId, userId, userType, navigate]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
        }

        if (!chatId) {
            console.error("Chat ID is undefined.");
            return;
        }

        if (input.trim()) {
            try {
                await addDoc(collection(db, 'chats', chatId, 'messages'), {
                    message: input,
                    timestamp: Timestamp.now(),
                    sender: userId,
                });

                setInput('');
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">
                {otherUser ? `Chat with ${otherUser.name}` : "Loading..."}
            </p>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} className="chatScreen__message">
                        {message.sender === userId ? (
                            <p className="chatScreen__textUser">{message.message}</p>
                        ) : (
                            <div>
                                <Avatar
                                    className="chatScreen__image"
                                    src={otherUser?.profilePic || ""}
                                />
                                <p className="chatScreen__text">{message.message}</p>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No messages yet.</p>
            )}
            <form className="chatScreen__input" onSubmit={handleSend}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="chatScreen__inputField"
                    type="text"
                    placeholder="Type a message..."
                />
                <button type="submit" className="chatScreen__inputButton">SEND</button>
            </form>
        </div>
    );
}

export default ChatScreen;
