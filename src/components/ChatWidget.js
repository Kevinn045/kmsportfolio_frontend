import React, { useState } from "react";
import axios from "axios";

function ChatWidget() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input) return;

        const userMsg = { sender: "user", text: input };
        setMessages([...messages, userMsg]);

        const res = await axios.post("https://kmsportfolio-back.onrender.com/api/chat/", {
            message: input
        });

        const botMsg = { sender: "bot", text: res.data.reply };

        setMessages(prev => [...prev, botMsg]);
        setInput("");
    };

    return (
        <div style={styles.chat}>
            <div style={styles.box}>
                {messages.map((m, i) => (
                    <div key={i} style={m.sender === "user" ? styles.user : styles.bot}>
                        {m.text}
                    </div>
                ))}
            </div>

            <input
                style={styles.input}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

const styles = {
    chat: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px"
    },
    box: {
        height: "300px",
        overflowY: "scroll",
        background: "#fff",
        padding: "10px",
        borderRadius: "10px"
    },
    user: {
        textAlign: "right",
        margin: "5px",
        color: "blue"
    },
    bot: {
        textAlign: "left",
        margin: "5px",
        color: "green"
    },
    input: {
        width: "100%",
        marginTop: "5px"
    }
};

export default ChatWidget;