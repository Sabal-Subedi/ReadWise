import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Login.css";
// import login from "../images/login.png";

function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signInHandler = (e) => {
    e.preventDefault();

    // fetch("/loginuser", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((message) => {
    //     console.log(message);
    //   });

    history.push("/");
  };

  return (
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first">
          <h1>Login</h1>
        </div>

        <form onSubmit={signInHandler}>
          <input
            type="text"
            id="login"
            class="login__input"
            name="login"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            id="password"
            class="login__input"
            name="login"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input type="submit" class="fadeIn fourth" value="Log In"></input>
        </form>
        <Link to="/register">
          <button type="button" class="reg">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
