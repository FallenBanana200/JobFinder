import React, { useEffect, useState } from "react";
import { fetchChats } from "../api";
import Chat from "./Chat";

const Chats: React.FC = () => {
    const [chats, setChats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userType = localStorage.getItem("userType") || "employee";

        if (!userId) {
            console.error("No current user found.");
            setLoading(false);
            return;
        }

        const loadChats = async () => {
            try {
                setLoading(true);
                const userChats = await fetchChats(userId, userType);
                console.log("Chats loaded:", userChats);
                setChats(userChats);
            } catch (error) {
                console.error("Error loading chats:", error);
            } finally {
                setLoading(false);
            }
        };

        loadChats();
    }, []);

    if (loading) {
        return <div>Loading chats...</div>;
    }

    return (
        <div className="chats">
            {chats.length > 0 ? (
                chats.map((chat) => (
                    <Chat
                        key={chat.id}
                        chatId={chat.id}
                        name={chat.name}
                        message={chat.lastMessage}
                        timestamp={chat.timestamp}
                        profilePic={chat.picture}
                    />
                ))
            ) : (
                <p>No chats available</p>
            )}
        </div>
    );
};

export default Chats;