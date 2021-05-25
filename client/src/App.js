import React, { useState } from "react";
import io from "socket.io-client";
import "../../node_modules/bulma/css/bulma.css";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    let socket = io.connect("http://localhost:5000/");
    socket.on("connect", () => {
      if (message !== "") {
        socket.emit("chat", { message: message, person: name });
      }
    });
  };

  return (
    <form className="form container my-6">
      <label className="has-info" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        placeholder="enter your name here"
        value={name}
        className="input"
        onChange={handleNameChange}
      />
      <label htmlFor="message"> Message </label>
      <input
        id="message"
        value={message}
        placeholder="enter your message here"
        onChange={handleMessageChange}
        className="input"
      />
      <hr />
      <button type="submit" className="button is-info" onClick={handleClick}>
        Submit
      </button>
    </form>
  );
}

export default App;
