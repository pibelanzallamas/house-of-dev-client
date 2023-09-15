import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { alerts } from "../utils/alerts";
import Navbar from "./Navbar";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    axios
      .get("/api/appointments/all")
      .then((data) => {
        setAppointments(data.data);
      })
      .catch((err) => console.log(err));
  }, [estado]);

  function handleDel(id) {
    axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        alerts("Ok!", "Cita cancelada! 🤝", "success");
        setEstado(!estado);
      })
      .catch((err) => console.log(err));
  }

  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  console.log(appointments);
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">CITAS</h2>
        </div>
        <div className="todo-tarjetas-prop">
          {appointments.map((elemento) => (
            <div id={elemento.id} className="todo-tarjeta">
              <div className="imagen">
                <img
                  src={elemento.property.images}
                  alt={elemento.property.name}
                />
              </div>
              <div className="texto">
                <div className="rectangulo-uno">
                  <div className="cuadradito-uno">
                    <p style={{ top: "-6px" }}>
                      <strong>
                        {" "}
                        {elemento.date.slice(11, 13) - 3}:
                        {elemento.date.slice(14, 16)} hs
                      </strong>
                    </p>
                  </div>
                  <div className="cuadradito-cuatro">
                    <p style={{ top: "-6px", left: "6%" }}>
                      <strong>
                        {elemento.date.slice(8, 10)} /{" "}
                        {elemento.date.slice(5, 7)} /{" "}
                        {elemento.date.slice(0, 4)}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="rectangulo-uno">
                  <div
                    className="cuadradito-dos"
                    style={{
                      top: "-1px",
                      width: "100%",
                      borderRight: "none",
                    }}
                  >
                    <p style={{ left: "3%" }}>
                      <strong>{elemento.user.name}</strong>
                    </p>
                  </div>
                </div>
                <div className="rectangulo-dos">
                  <p style={{ top: "-6px", marginRight: "2%" }}>
                    {elemento.property.address},{" "}
                    {elemento.property.neighborhood}, {elemento.property.city},{" "}
                    {elemento.property.country}
                  </p>
                </div>
                <div
                  className="rectangulo-dos"
                  style={{ borderBottom: "none" }}
                >
                  <p style={{ top: "-1px" }}>{elemento.property.name} </p>
                  <Link
                    className="boton-mas"
                    onClick={() => {
                      handleDel(elemento.id);
                    }}
                    style={{ left: "68%", top: "7px" }}
                  >
                    CANCELAR
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
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
    </>
  );
}

export default Appointments;
