import React, { useState } from "react";
import "./ChatScreen.css"
import { Avatar } from "@mui/material";

function ChatScreen() {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        {
            name: 'Mark',
            image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1631109.png',
            message: 'Wassabi'
        },
        {
            name: 'Mark',
            image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1631109.png',
            message: 'how is it going?'
        },
        {
            message: 'hehe get trolled'
        },
    ])


    const handleSend = (e : any) => {
        e.preventDefault();

        setMessages([...messages, {message : input}]);
        setInput('');
    }

    return (
        <>
            <div className="chatScreen">
                <p className="chatScreen__timestamp">YOUR INTERVIEW PAGE</p>
                {messages.map(message => (
                    message.name ? (
                        <div className="chatScreen__message">
                            <Avatar
                                className="chatScreen__image"
                                alt={message.name}
                                src={message.image}
                            />
                            <p className="chatScreen__text">
                                {message.message}
                            </p>
                        </div>
                    ) : (
                        <div className="chatScreen__message">
                            <p className="chatScreen__textUser">{message.message}</p>
                        </div>
                    )

                )
                )}
                <form className="chatScreen__input">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="chatScreen__inputField"
                        type="text"
                        placeholder="Type a message..." />
                    <button onClick={handleSend} type="submit" className="chatScreen__inputButton">SEND</button>
                </form>
            </div>
        </>
    )
}

export default ChatScreen;