import React, { useEffect, useState } from "react";
import { fetchChats } from "../api"; // Import your fetchChats function

// Assuming Chat is a separate component you've defined elsewhere
import Chat from "./Chat"; // Adjust the import path as needed

const Chats = () => {
    const [chats, setChats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Retrieve the current user ID from local storage directly
        const userId = localStorage.getItem("userId");
        const userType = "employee"; // Set this according to your logic or user state

        console.log("Retrieved user ID:", userId); // Debug log to ensure user ID retrieval

        if (!userId) {
            console.error("No current user found.");
            return;
        }

        // Fetch chats for the current user
        const loadChats = async () => {
            try {
                setLoading(true);
                const userChats = await fetchChats(userId, userType);
                console.log("Fetched chats:", userChats); // Debug log for fetched chats
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
                        profilePic={chat.profilePic}
                    />
                ))
            ) : (
                <p>No chats available</p>
            )}
        </div>
    );
};

export default Chats;
