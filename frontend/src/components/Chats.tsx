import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { fetchChats } from "../api";
import { useAuth } from "../AuthContext";

function Chats() {
    const [chats, setChats] = useState<any[]>([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        // Define an async function to fetch chats
        const fetchUserChats = async () => {
            if (!currentUser) {
                console.error("No current user found.");
                return;
            }

            const userEmailOrCompanyMail = currentUser.email || "";
            const userType = currentUser.type || "";

            if (!userEmailOrCompanyMail || !userType) {
                console.error("User email or type not available.");
                return;
            }

            try {
                console.log("Fetching chats for:", userEmailOrCompanyMail, userType);
                const fetchedChats = await fetchChats(userEmailOrCompanyMail, userType);
                console.log("Fetched chats:", fetchedChats);
                setChats(fetchedChats);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };

        // Call the function to fetch chats
        fetchUserChats();
    }, [currentUser]); // Fetch chats every time the component mounts or `currentUser` changes

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
}

export default Chats;
