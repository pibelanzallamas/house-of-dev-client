import useInput from "../hooks/useInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";
import { useNavigate, Link } from "react-router-dom";
import { alerts } from "../utils/alerts";
import OAuth2Login from "react-oauth2";

function Login() {
  const email = useInput("");
  const password = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // function handleGoogleLoginSuccess(response) {
  //   const { access_token } = response;
  //   // Realiza acciones adicionales después del inicio de sesión exitoso con Google.
  //   // Por ejemplo, puedes enviar el token de acceso al servidor para verificar la autenticación con Google.
  //   axios
  //     .post("/api/users/google-login", { access_token })
  //     .then((payload) => {
  //       alerts("Aloha!", `Welcome ${payload.data.name} 🏝`, "success");
  //       dispatch(setUser(payload.data));
  //       navigate("/");
  //     })
  //     .catch(() => {
  //       alerts("Nope!", "Error en la autenticación con Google ☠️", "danger");
  //     });
  // }

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

          {/* <Link to="/forget">
            <p>¿Olvidaste tu contraseña?</p>
          </Link> */}
          <Link className="registrarse" to="/register">
            <p>¿Registrarse?</p>
          </Link>

          {/* <OAuth2Login
            provider="google"
            clientId="413054924757-23310blgvskehh7c4o6j2pis1fqpgv6i.apps.googleusercontent.com"
            onSuccess={handleGoogleLoginSuccess}
            onError={(error) =>
              console.error("Error de autenticación con Google", error)
            }
            className="buttonGoogle"
          >
            Ingresar con Google
          </OAuth2Login> */}

          <button className="buttonLogin">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
