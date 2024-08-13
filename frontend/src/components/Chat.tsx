import React, { useState } from "react";
import "../css/Chat.css";
import { Avatar, Box } from "@mui/material";
import Rating from '@mui/material/Rating';
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
    const [value, setValue] = useState<number | null>(0);
    const displayName = companyName || name || "Unknown";

    return (
        <div className="chat">
            <Link to={`/chat/${chatId}`}>
                <div className="chat">
                    <Avatar className="chat__image" src={profilePic} />
                    <div className="chat__details">
                        <h2>{displayName}</h2>
                        <p>{message}</p>
                    </div>

                </div>
            </Link>
            <div className="chat_main">
                <div className="rating"><Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Rating
                        name="rating"
                        sx={{ marginRight: 3 }}
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        precision={0.5}
                    />
                </Box>
                </div>
                <p className="chat__timestamp">{timestamp}</p></div>
        </div>
    );
}

export default Chat;
