import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Registration.css";
import register from "../images/register.png";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const registerHandler = (e) => {
    e.preventDefault();

    fetch("/registeruser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((message) => {
        console.log(message);
      });

    history.push("/login");
  };

  return (
    <div className="registration__page">
      <div className="register__container">
        <img className="register__logo" src={register} alt="" />
        <h1>Register</h1>

        <form onSubmit={registerHandler}>
          <h5>Full Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
          />

          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login__signInButton" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
