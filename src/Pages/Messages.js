import { useEffect, useState } from "react";
import api from "../api";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMessages = async () => {
        try {
            const response = await api.get("messages/");
            setMessages(response.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load messages.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const deleteMessage = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`messages/${id}/`);

            setMessages((prev) =>
                prev.filter((message) => message.id !== id)
            );
        } catch (err) {
            console.error(err);
            alert("Failed to delete message.");
        }
    };

    if (loading) {
        return (
            <div className="messages-page">
                <div className="messages-container">
                    <p>Loading messages...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="messages-page">
            <div className="messages-container">

                <div className="messages-header">
                    <div>
                        <p className="messages-label">INBOX</p>
                        <h1>Messages</h1>
                        <p>
                            Messages received through your portfolio contact form.
                        </p>
                    </div>

                    <div className="message-count">
                        {messages.length}{" "}
                        {messages.length === 1 ? "Message" : "Messages"}
                    </div>
                </div>

                {error && (
                    <div className="messages-error">
                        {error}
                    </div>
                )}

                {!error && messages.length === 0 && (
                    <div className="empty-messages">
                        <div className="empty-icon">✉</div>
                        <h3>No messages yet</h3>
                        <p>
                            Messages submitted through your contact form
                            will appear here.
                        </p>
                    </div>
                )}

                <div className="messages-list">
                    {messages.map((message) => (
                        <article
                            className="message-card"
                            key={message.id}
                        >
                            <div className="message-top">

                                <div>
                                    <h3>{message.name}</h3>
                                    <a href={`mailto:${message.email}`}>
                                        {message.email}
                                    </a>
                                </div>

                                <span className="message-date">
                                    {new Date(message.created).toLocaleDateString()}
                                </span>

                            </div>

                            <p className="message-content">
                                {message.message}
                            </p>

                            <div className="message-actions">

                                <a
                                    href={`mailto:${message.email}`}
                                    className="message-reply"
                                >
                                    Reply
                                </a>

                                <button
                                    onClick={() =>
                                        deleteMessage(message.id)
                                    }
                                    className="message-delete"
                                >
                                    Delete
                                </button>

                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Messages;