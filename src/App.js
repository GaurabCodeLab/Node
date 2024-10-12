// App.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to the Socket.IO server
const socket = io("http://localhost:1634/"); // Use your backend server's address

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Listen for incoming messages from the server
  useEffect(() => {
    socket.on("chat", (msg) => {
      console.log("message hai", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("chat");
    };
  }, []);

  // Handle sending a new message
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit("chat", input); // Send message to server
      setInput(""); // Clear input field
    }
  };

  console.log("mesage", messages);

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
