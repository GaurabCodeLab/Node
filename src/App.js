import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Swal from "sweetalert2";

const socket = io("http://localhost:1634/");

const App = () => {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:1634/message");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setMessages(result);
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error.message ? error.message : "Something went wrong",
        });
      }
    };
    fetchMessage();
    socket.on("chat", (data) => {
      setMessages((pre) => [...pre, data]);
    });
    return () => {
      socket.off("chat");
    };
  }, []);
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const newMessage = { userName, message };
      socket.emit("chat", newMessage);
      setMessage("");
    }
  };
  const handleSetUsername = () => {
    if (userName.trim() !== "") {
      localStorage.setItem("userName", userName);
      setShow(false);
    }
  };
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      {!localStorage.getItem("userName") && show ? (
        <div>
          <h2>Enter your name</h2>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleSetUsername}>Join Chat</button>
        </div>
      ) : (
        <div>
          <h2>Group Chat</h2>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              height: "400px",
              overflowY: "scroll",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.userName === userName ? "right" : "left",
                  margin: "5px 0",
                }}
              >
                <b>{msg.userName}</b>: {msg.message}
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSendMessage}
            style={{ marginTop: "10px", display: "flex", gap: "10px" }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              style={{ width: "70%", padding: "5px" }}
            />
            <button
              type="submit"
              style={{ width: "18%", padding: "5px", cursor: "pointer" }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
