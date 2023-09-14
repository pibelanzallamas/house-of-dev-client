import axios from "axios";
import { useState, useEffect } from "react";
import { alerts } from "../utils/alerts";
import Navbar from "./Navbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [modUsers, setModUser] = useState(false);

  //get all user
  useEffect(() => {
    axios
      .get("/api/users/all")
      .then((all) => setUsers(all.data))
      .catch((err) => console.log(err));
  }, [modUsers]);

  //del user
  function handleDelete(userId, userName) {
    axios.delete(`/api/users/${userId}`).then(() => {
      setModUser(!modUsers);
      alerts("Oh no!", `El usuario ${userName} ha sido eliminado 😵`, "danger");
    });
  }

  //admin user
  function handleAdmin(userId, userName) {
    axios.put(`/api/users/${userId}`, { admin: true }).then(() => {
      setModUser(!modUsers);
      alerts("Ok!", `El usuario ${userName} ahora es admin 💼`, "success");
    });
  }

  //scroll up
  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">USUARIOS</h2>
        </div>
        {users.length > 0 ? (
          <div className="property-list">
            {users.map((user) => (
              <>
                <div className="user-datos" style={{ height: "310px" }}>
                  <form>
                    <img
                      src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
                      alt="Imagen del usuario"
                    />

                    <div className="inputName">
                      <label> Nombre y Apellido </label>
                      <br></br>
                      <input value={user.name}></input>
                    </div>

                    <div className="inputEmail">
                      <label> Email </label>
                      <br></br>
                      <input value={user.email}></input>
                    </div>

                    <div className="inputTel">
                      <label> Telefono </label>
                      <br></br>
                      <input value={user.telephone}></input>
                    </div>
                    {user.admin ? <label>Admin ✔️</label> : <></>}
                    {user.admin ? (
                      <p> </p>
                    ) : (
                      <button
                        className="boton-editar"
                        onClick={() => handleAdmin(user.id, user.name)}
                        style={{ left: "79%" }}
                      >
                        ADMIN
                      </button>
                    )}
                    {user.email === "b@gmail.com" ? (
                      <></>
                    ) : (
                      <button
                        className="boton-editar "
                        onClick={() => handleDelete(user.id, user.name)}
                        style={{ left: "87%" }}
                      >
                        ELIMINAR
                      </button>
                    )}
                  </form>
                </div>
                <hr></hr>
              </>
            ))}
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            position: "relative",
            "margin-bottom": "7%",
            "margin-top": "2%",
          }}
        >
          <button className="onTop" onClick={handleScroll}>
            IR A INICIO
          </button>
        </div>
      </div>
    </div>
  );
}

export default Users;
