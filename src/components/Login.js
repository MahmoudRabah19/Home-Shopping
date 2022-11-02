import axios from "axios";
import React, { useState } from "react";
import { setUserSession } from "../service/AuthService";


const LoginAPIUrl =
  " https://s9tme76mge.execute-api.eu-central-1.amazonaws.com/BU2_Ecommerce/login";

const Login = (props) => {
  const [typeId, setTypeId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (username === "" || password === "" || typeId === "") {
      setErrorMessage("Both username and password are required");
      return;
    }
    setErrorMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": "O8vHCdfPJQ3kdEsvIEUZh4OSgfOgomIZ8beWa0uP",
      },
    };
    const requestBody = {
      typeId: typeId,
      username: username,
      password: password,
    };

    axios
      .post(LoginAPIUrl, requestBody, requestConfig)
      .then((respose) => {
        setUserSession(respose.data.user, respose.data.token);
        props.history.push("/admin");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(
            "sorry... the backend server is down.please try again later"
          );
        }
      });
  };

  return (
		<div>
      <form class="Signin" onSubmit={submitHandler}>
        <label>TypeId:{" "}</label>
        <input
          type="text"
          placeholder="Your Type ID .."
          value={typeId}
          onChange={(event) => setTypeId(event.target.value)}
        ></input>{" "}
        <label>Username:{" "}</label> 
        <input
          type="text"
          placeholder="Your Username .."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>{" "}
        <br />
        <label>Password:{" "}</label>
        <input
          type="password"
          placeholder="Your Password .."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>{" "}
        <br />
        <button type="submit" > SIGN IN </button>
      </form>
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
