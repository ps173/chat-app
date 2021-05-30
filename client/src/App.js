import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [userState, setUserState] = useState({ message: "", name: "" })
  const [chat, setChat] = useState([])

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5000")
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
    return () => socketRef.current.disconnect()
  }, [chat])


  const onTextChange = (e) => {
    console.log(e.target.value);
    setUserState({ ...userState, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    const { name, message } = userState
    socketRef.current.emit("message", { name, message })
    e.preventDefault()
    setUserState({ message: "", name })
  }


  return (
    <>
      <form onSubmit={onMessageSubmit}>
        <label htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="enter your name here"
          value={userState.name}
          onChange={(e) => onTextChange(e)}
        />
        <label htmlFor="message"> Message </label>
        <input
          id="message"
          name="message"
          placeholder="enter your message here"
          value={userState.message}
          onChange={(e) => onTextChange(e)}
        />
        <hr />
        <button type="submit">
          Submit
        </button>
      </form>
      <div>
        <h2>Messages Log</h2>
        {
          chat.map(({ name, message }, index) => (
            <div key={index}>
              <h3>
                {name}: <span>{message}</span>
              </h3>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default App;
