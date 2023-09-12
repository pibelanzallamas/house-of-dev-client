import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/userState";
import { alerts } from "../utils/alerts";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post("/api/users/me")
      .then((cok) => dispatch(setUser(cok.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  function handleLogout(e) {
    e.preventDefault();

    const initialState = {
      id: null,
      email: null,
      telephone: null,
      name: null,
      admin: null,
    };
    axios
      .post("/api/users/logout")
      .then(() => {
        dispatch(setUser(initialState));
        alerts("See ya!", `Goodbye ${user.name} 🚀`, "success");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  return (
    <nav
      style={{
        backgroundColor: "red",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img
              src="https://imagizer.imageshack.com/img922/6165/gwEBmS.png"
              alt="logo"
            ></img>
          </Link>
        </div>
        <div className="navbar-links">
          {user.id ? (
            <>
              {user.admin ? (
                <>
                  <Link to={"/users"}> Ver Usuarios</Link>
                  <Link to={"/properties"}> Ver Propiedades</Link>
                  <Link to={"/properties/register"}>Agregar propiedades</Link>
                  <Link to={`/users/${user.id}`}> Mi perfil</Link>
                  <Link onClick={handleLogout}> Salir</Link>
                </>
              ) : (
                <>
                  <Link to={`/users/${user.id}`}> Mi perfil </Link>
                  <Link onClick={handleLogout}> Salir </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to={"/login"}> Iniciar Sesión </Link>
              <Link to={"/register"}> Registrarse </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
