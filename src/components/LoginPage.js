import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Login.css";
import login from "../images/login.png";

function LoginPage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signInHandler = (e) => {
    e.preventDefault();

    fetch("/loginuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((message) => {
        console.log(message);
      });

    // history.push("/");
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={login} alt="" />
      </Link>
      <div className="login__container">
        <h1>Sign in</h1>

        <form onSubmit={signInHandler}>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //required
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login__signInButton" type="submit">
            Sign in
          </button>
        </form>
      </div>
      <Link to="/register">
        <button className="login__registerButton">Register</button>
      </Link>
    </div>
  );
}

export default LoginPage;
