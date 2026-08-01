
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://kmsportfolio-back.onrender.com";

function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm Kevin's AI assistant. Ask me about his skills, projects, experience, or background.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) return;

    const userMessage = {
      sender: "user",
      text: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((message) => ({
        role: message.sender === "user" ? "user" : "model",
        content: message.text,
      }));

      const response = await axios.post(`${API_URL}/api/chat/`, {
        message: trimmedInput,
        history,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            response.data.reply ||
            "I couldn't generate a response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("AI chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="ai-widget">

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-window"
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
          >

            {/* Header */}
            <div className="ai-chat-header">

              <div className="ai-profile">

                <div className="ai-avatar">
                  AI
                </div>

                <div>
                  <h3>Kevin's AI Assistant</h3>

                  <div className="ai-status">
                    <span></span>
                    Online
                  </div>
                </div>

              </div>

              <button
                className="ai-close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI assistant"
              >
                ×
              </button>

            </div>

            {/* Messages */}
            <div className="ai-messages">

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sender === "user"
                      ? "ai-message user-message"
                      : "ai-message bot-message"
                  }
                >
                  {message.sender === "bot" && (
                    <div className="message-avatar">
                      AI
                    </div>
                  )}

                  <div className="message-bubble">
                    {message.text}
                  </div>
                </div>
              ))}

              {/* Loading */}
              {isLoading && (
                <div className="ai-message bot-message">

                  <div className="message-avatar">
                    AI
                  </div>

                  <div className="message-bubble ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                </div>
              )}

              <div ref={chatEndRef}></div>

            </div>

            {/* Input */}
            <div className="ai-input-area">

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Kevin..."
                disabled={isLoading}
                aria-label="Ask Kevin's AI assistant"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                ↑
              </button>

            </div>

            <div className="ai-footer">
              Powered by Gemini AI
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        className={`ai-floating-button ${
          isOpen ? "ai-button-open" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={
          isOpen
            ? "Close AI assistant"
            : "Open AI assistant"
        }
      >
        {isOpen ? "×" : "AI"}
      </motion.button>

    </div>
  );
}

export default ChatWidget;
