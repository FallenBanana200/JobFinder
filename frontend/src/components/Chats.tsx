import React from "react";
import Chat from "./Chat"

function Chats() {
    return (
        <>
            <div className="chats">
                <Chat
                    name="Mark"
                    message="Whatsup"
                    timestamp="1 week ago"
                    profilePic="https://cdn.nba.com/headshots/nba/latest/1040x760/1631109.png"
                />
                <Chat
                    name="Broski"
                    message="new message"
                    timestamp="45 secs ago"
                    profilePic="https://i.pinimg.com/736x/31/cd/33/31cd33ba70bfb9716bf21d9829686fd8.jpg"
                />
                <Chat
                    name="Deward"
                    message="Hey you new here?"
                    timestamp="1h ago"
                    profilePic="https://imageio.forbes.com/specials-images/imageserve/5ed560d07fe4060006bbce1e/0x0.jpg?format=jpg&crop=878,879,x422,y0,safe&height=416&width=416&fit=bounds"
                />
                <Chat
                    name="Martin"
                    message="greetings"
                    timestamp="2h ago"
                    profilePic="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
                />
            </div>
        </>
    )
}

export default Chats;