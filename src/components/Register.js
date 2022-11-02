import React, { useState } from "react";
import axios from "axios";

const registerUrl =
  " https://s9tme76mge.execute-api.eu-central-1.amazonaws.com/BU2_Ecommerce/register";

const Register = () => {
  const [typeId, setTypeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      typeId === "" ||
      username === "" ||
      email === "" ||
      name === "" ||
      password === ""
    ) {
      setMessage("All fields are required");
      return;
    }
    setMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": "O8vHCdfPJQ3kdEsvIEUZh4OSgfOgomIZ8beWa0uP",
      },
    };

    const requestBody = {
      typeId: typeId,
      username: username,
      email: email,
      name: name,
      password: password,
    };
    axios
      .post(registerUrl, requestBody, requestConfig)
      .then((response) => {
        setMessage("Registeration Successful");
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <div>
      <form class="Signup" onSubmit={submitHandler}>
      <label>TypeId:{" "}</label>
        <input
          type="text"
          placeholder="Your TypeId .."
          value={typeId}
          onChange={(event) => setTypeId(event.target.value)}
        ></input>{" "}
        
        <label>Name:{" "}</label>
        <input
          type="text"
          placeholder="Your Name .."
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></input>{" "}
        
        <label>Email:{" "}</label>
        <input
          type="text"
          placeholder="Your Email .."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>{" "}
        
        <label>Username:{" "}</label>
        <input
          type="text"
          placeholder="Your Username .."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>{" "}
        
        <label>Password:{" "}</label>
        <input
          type="password"
          placeholder="Your Password .."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>{" "}
        <br />
        <button type="submit" > SIGN UP </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
