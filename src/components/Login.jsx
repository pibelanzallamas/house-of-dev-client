import useInput from "../hooks/useInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";
import { useNavigate, Link } from "react-router-dom";
import { alerts } from "../utils/alerts";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function Login() {
  const email = useInput("");
  const password = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    const token = response.credential;

    const decode = jwt_decode(token);

    console.log(decode);

    //alerts("Aloha!", `Welcome ${googleState.name} 🏝`, "success");
    // dispatch(
    //   setUser({
    //     name: googleState.name,
    //     email: googleState.email,
    //     id: googleState.nbf,
    //   })
    // );
    //navigate("/");
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "413054924757-e1sknitkpf313733h32aq5mfhse3f1j8.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("google-login"), {
      theme: "outline",
      size: "small",
    });

    google.accounts.id.prompt();
  }, []);

  function handleLogin(e) {
    e.preventDefault();

    axios
      .post("/api/users/login", {
        email: email.value,
        password: password.value,
      })
      .then((payload) => {
        alerts("Aloha!", `Welcome ${payload.data.name} 🏝`, "success");
        dispatch(setUser(payload.data));
        navigate("/");
      })
      .catch(() => {
        alerts("Nope!", "Email o password incorrectos ☠️", "danger");
      });
  }

  return (
    <div className="containerLogin">
      <div className="sideALogin">
        <div className="colitaLogin"></div>
      </div>

      <div className="sideBLogin">
        <div className="blueEffectLogin"></div>
      </div>

      <div className="loginConteiner">
        <div className="logoLogin"></div>

        <form onSubmit={handleLogin}>
          <div className="inputALogin">
            <div className="buttonMailLog"></div>
            <input
              {...email}
              className="textInputALog"
              type="email"
              placeholder="EMAIL"
              required
            ></input>
          </div>

          <div className="inputBLogin">
            <div className="buttonLockLog"></div>
            <input
              {...password}
              className="textInputBLog"
              type="password"
              placeholder="PASSWORD"
              required
            ></input>
          </div>

          <Link className="registrarse" to="/register">
            <p>¿Registrarse?</p>
          </Link>

          <div id="google-login"></div>
          <button className="buttonLogin">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
