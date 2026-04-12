import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ChatWidget() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    // Auto scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input) return;

        const newMessages = [...messages, { role: "user", content: input }];

        setMessages(prev => [...prev, { sender: "user", text: input }]);
        setInput("");

        try {
            const res = await axios.post(
                "https://kmsportfolio-back.onrender.com/api/chat/",
                {
                    message: input,
                    history: newMessages
                }
            );

            setMessages(prev => [
                ...prev,
                { sender: "bot", text: res.data.reply }
            ]);

        } catch (err) {
            setMessages(prev => [
                ...prev.slice(0, -1),
                { sender: "bot", text: "Error, try again." }
            ]);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatBox}>
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={
                            msg.sender === "user" ? styles.userBubble : styles.botBubble
                        }
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            <div style={styles.inputArea}>
                <input
                    style={styles.input}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask me anything..."
                />
                <button style={styles.button} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "320px",
        fontFamily: "Arial"
    },
    chatBox: {
        height: "350px",
        overflowY: "auto",
        background: "#f9f9f9",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)"
    },
    userBubble: {
        textAlign: "right",
        background: "#007bff",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "15px",
        margin: "5px",
        alignSelf: "flex-end"
    },
    botBubble: {
        textAlign: "left",
        background: "#e5e5ea",
        color: "#000",
        padding: "8px 12px",
        borderRadius: "15px",
        margin: "5px"
    },
    inputArea: {
        display: "flex",
        marginTop: "5px"
    },
    input: {
        flex: 1,
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    },
    button: {
        marginLeft: "5px",
        padding: "8px 12px",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "5px"
    }
};

export default ChatWidget;