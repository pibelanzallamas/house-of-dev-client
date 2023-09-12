import axios from "axios";
import Cards from "../commons/Cards";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
//import Appointments from "../components/Appointments";
import { alerts } from "../utils/alerts";

function User() {
  const user = useSelector((state) => state.user);
  const [properties, setProperties] = useState([]);
  const [modFavs, setModFavs] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [telephone, setTelephone] = useState(user.telephone);
  const [appointments, setAppointments] = useState([1, 2, 3, 4, 5]);

  function handleMovFavs() {
    setModFavs(!modFavs);
  }

  function handleChange(e) {
    e.preventDefault();
    axios
      .put(`/api/users/${user.id}`, { name, email, telephone })
      .then((mod) => alerts("Ok!", "Modificó su perfil 😎", "success"))
      .catch((err) => alerts("Err", "Ingrese datos correctos 😖", "danger"));
  }

  useEffect(() => {
    axios
      .get(`/api/favorites/${user.id}`)
      .then((res) => setProperties(res.data))
      .catch((err) => console.log(err));
  }, [modFavs]);

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                maxLength={25}
                required
              ></input>
            </div>

            <div className="inputEmail">
              <label> Email </label>
              <br></br>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                maxLength={45}
              ></input>
            </div>

            <div className="inputTel">
              <label> Telefono </label>
              <br></br>
              <input
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                type="number"
                required
                min={10000}
                max={9999999999}
              ></input>
            </div>
            {user.admin ? <label>Admin ✔️</label> : <></>}
            <button className="boton-editar">EDITAR</button>
          </form>
        </div>

        {properties.length > 0 ? (
          <>
            <div className="home-titulo">
              <h2 className="linea1">FAVORITOS</h2>
            </div>
            <div className="todo-tarjetas-prop">
              {properties.map((property, id) => (
                <div key={id} className="property-cards-container">
                  <Cards property={property.property} modFavs={handleMovFavs} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="home-titulo" style={{ border: "none" }}>
            <h2 className="linea1">NO HAY FAVORITOS</h2>
          </div>
          // <div className="home-titulo">
          //   <h2 className="linea1">NO HAY FAVORITOS</h2>
          // </div>
        )}
        <div className="home-titulo">
          <h2 className="linea1">PRÓXIMAS CITAS</h2>
        </div>
        {/* <div className="todo-tarjetas-prop">
          {appointments.map((app) => (
            <Appointments property={app} />
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default User;
