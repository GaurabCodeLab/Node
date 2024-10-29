import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [messages, setMessages] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const socket = io("http://localhost:1634");
  socket.on("connect", () => {
    console.log("client connected");
  });
  socket.on("disconnect", (reason) => {
    console.log("client disconnected reason", reason);
  });
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
    socket.on("newMessage", (data) => {
      setMessages((pre) => [...pre, data]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);
  const onSubmit = (data) => {
    localStorage.setItem("user", data?.name);
    setUser(data?.name);
    setValue("name", "");
  };
  const chatSubmit = (data) => {
    const chatData = {
      name: localStorage.getItem("user"),
      message: data?.chat,
    };
    setValue("chat", "");
    socket.emit("chat", chatData);
  };
  const handleClick = () => {
    localStorage.clear();
    setUser(null);
  };
  return (
    <div>
      <h1 className="text-center mt-3">Chat Application</h1>
      {!localStorage.getItem("user") ? (
        <form
          className="mb-3 mt-4"
          style={{ width: "30%", margin: "auto" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="exampleInputPassword1" className="form-label">
            Register with your name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            maxLength={15}
            {...register("name", {
              required: "User name is required",
              onChange: (e) => {
                setValue("name", e.target.value.replace(/[^A-Za-z\s]/g, ""));
              },
            })}
          />
          {errors.name && (
            <div style={{ marginTop: "8px", color: "red" }}>
              {errors?.name?.message}
            </div>
          )}
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <div style={{ width: "40%", margin: "auto", marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                gap: "30px",
                marginBottom: "10px",
              }}
            >
              <div style={{ fontSize: "26px", marginBottom: "10px" }}>
                Chat History
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
            <div
              style={{
                height: "65vh",
                border: "1px solid gray",
                borderRadius: "5px",
                marginBottom: "15px",
                padding: "10px",
                overflow: "auto",
                cursor: "pointer",
              }}
            >
              {messages?.map((value) => (
                <div
                  style={{
                    textAlign: value.name === user ? "right" : "left",
                  }}
                  key={value._id}
                >
                  <span style={{ marginRight: "10px" }}>
                    <b>{value?.name}:</b>
                  </span>
                  <span>{value?.message}</span>
                </div>
              ))}
            </div>
          </div>
          <form
            style={{
              display: "flex",
              width: "40%",
              margin: "auto",
              gap: "20px",
            }}
            onSubmit={handleSubmit(chatSubmit)}
          >
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              {...register("chat", {
                required: "message is required",
              })}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
      {errors.chat && (
        <div
          style={{
            marginTop: "8px",
            color: "red",
            width: "40%",
            margin: "5px auto",
          }}
        >
          {errors?.chat?.message}
        </div>
      )}
    </div>
  );
};

export default App;
