import React from "react";
import "../css/Chat.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface ChatProps {
    chatId: string;
    name?: string;
    companyName?: string;
    message: string;
    timestamp: string;
    profilePic: string;
}

function Chat({ chatId, name, companyName, message, timestamp, profilePic }: ChatProps) {
    const displayName = companyName || name || "Unknown";

    return (
        <Link to={`/chat/${chatId}`}>
            <div className="chat">
                <Avatar className="chat__image" src={profilePic} />
                <div className="chat__details">
                    <h2>{displayName}</h2>
                    <p>{message}</p>
                </div>
                <p className="chat__timestamp">{timestamp}</p>
            </div>
        </Link>
    );
}

export default Chat;