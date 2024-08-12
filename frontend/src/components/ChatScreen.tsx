import React, { useState, useEffect } from "react";
import "../css/ChatScreen.css";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../AuthContext";

function ChatScreen() {
    const { chatId } = useParams<{ chatId: string }>();
    const { currentUser } = useAuth();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        if (currentUser && chatId) {
            const fetchMessages = () => {
                try {
                    const messagesQuery = query(collection(db, 'chats', chatId, 'messages'), orderBy("timestamp"));
                    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
                        console.log("Messages snapshot:", snapshot.docs); // Debugging line

                        const fetchedMessages = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        setMessages(fetchedMessages);
                    });

                    return () => unsubscribe();
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };

            fetchMessages();
        }
    }, [chatId, currentUser]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        if (input.trim()) {
            try {
                await addDoc(collection(db, 'chats', chatId, 'messages'), {
                    message: input,
                    timestamp: Timestamp.now(),
                    sender: currentUser?.uid,
                });

                setInput('');
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">YOUR INTERVIEW PAGE</p>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} className="chatScreen__message">
                        {message.sender === currentUser?.uid ? (
                            <p className="chatScreen__textUser">{message.message}</p>
                        ) : (
                            <div>
                                <Avatar
                                    className="chatScreen__image"
                                    src={message.image || ""} // Default value if image is missing
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
