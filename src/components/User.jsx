import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { alerts } from "../utils/alerts";
import Navbar from "../components/Navbar";
import Cards from "../commons/Cards";
import Appointments from "../components/Appointments";

function User() {
  const user = useSelector((state) => state.user);
  const uid = user.id;
  const [favoritos, setFavoritos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [estado, setEstado] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  //lee estado desde cards
  function hanldeEstado() {
    setEstado(!estado);
  }

  //get user
  useEffect(() => {
    axios
      .get(`/api/users/${uid}`)
      .then((user) => {
        setName(user.data.name);
        setEmail(user.data.email);
        setTelephone(user.data.telephone);
      })
      .catch((err) => console.log(err));
  }, [user]);

  //mod user
  function handleChange(e) {
    e.preventDefault();

    axios
      .put(`/api/users/${user.id}`, { name, email, telephone })
      .then((mod) => alerts("Ok!", "Modificó su perfil 😎", "success"))
      .catch((err) => alerts("Err", "Ingrese datos correctos 😖", "danger"));
  }

  //get favs de user
  useEffect(() => {
    axios
      .get(`/api/favorites/${user.id}`)
      .then((res) => setFavoritos(res.data))
      .catch((err) => console.log(err));
  }, [estado, user]);

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">MI PERFIL</h2>
        </div>
        <div className="user-datos">
          <form onSubmit={handleChange}>
            <img
              src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
              alt="Imagen del usuario"
            />

            <div className="inputName">
              <label> Nombre y Apellido </label>
              <br></br>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={3}
                maxLength={25}
                required
              ></input>
            </div>

            <div className="inputEmail">
              <label> Email </label>
              <br></br>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                minLength={5}
                maxLength={25}
                required
              ></input>
            </div>

            <div className="inputTel">
              <label> Telefono </label>
              <br></br>
              <input
                id="telephone"
                type="number"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                min={10000}
                max={9999999999}
                required
              ></input>
            </div>
            {user.admin ? <label>Admin ✔️</label> : <></>}
            <button className="boton-editar" style={{ left: "86%" }}>
              MODIFICAR
            </button>
          </form>
        </div>

        {favoritos.length > 0 ? (
          <>
            <div className="home-titulo">
              <h2 className="linea1">FAVORITOS</h2>
            </div>
            <div className="todo-tarjetas-prop">
              {favoritos.map((favorito, id) => (
                <div key={id} className="property-cards-container">
                  <Cards property={favorito.property} modFavs={hanldeEstado} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="home-titulo" style={{ border: "none" }}>
            <h2 className="linea1" style={{ marginRight: "1%" }}>
              NO HAY FAVORITOS
            </h2>
          </div>
        )}

        {citas.length > 0 ? (
          <>
            <div className="home-titulo">
              <h2 className="linea1">PRÓXIMAS CITAS</h2>
            </div>
            <div className="todo-tarjetas-prop">
              {citas.map((app) => (
                <Appointments property={app} /> //cancelar
              ))}
            </div>
          </>
        ) : (
          <div className="home-titulo" style={{ border: "none" }}>
            <h2 className="linea1" style={{ marginRight: "1%" }}>
              NO HAY PRÓXIMAS CITAS
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
