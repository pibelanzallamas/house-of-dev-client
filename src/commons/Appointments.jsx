import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "animate.css/animate.min.css";
import { alerts } from "../utils/alerts";

function Appointments({ cita, modFavs }) {
  const user = useSelector((state) => state.user);

  //modFavs

  //eliminar cita
  function handleDel(id) {
    axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        alerts("Ok!", "Cita cancelada! 🤝", "success");
        modFavs();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div id={cita.id} className="todo-tarjeta">
        <div className="imagen">
          <img src={cita.property.images} alt={cita.name} />
        </div>
        <div className="texto">
          <div className="rectangulo-uno">
            <div className="cuadradito-uno">
              <p>{cita.date}</p>
            </div>
            <div className="cuadradito-cuatro">
              <img src="/logo-city.png" />
              <p>{cita.date}</p>
            </div>
          </div>
          <div className="rectangulo-uno">
            <div className="cuadradito-dos">
              <img src="/logo-metro.png" />
              <p> 100 m²</p>
            </div>
            <div className="cuadradito-tres">
              <img src="/logo-bed.png" />
              <p>{cita.property.rooms} dorm.</p>
            </div>
            <div className="cuadradito-cinco">
              <img src="/logo-bath.png" />
              <p>{cita.property.bathrooms} baños</p>
            </div>
          </div>
          <div className="rectangulo-dos">
            <p>
              {cita.property.address}, {cita.property.neighborhood},{" "}
              {cita.property.city}, {cita.property.country}
            </p>
          </div>
          <div className="rectangulo-tres">
            <Link
              className="boton-mas"
              onClick={() => {
                handleDel(cita.id);
              }}
            >
              CANCELAR
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;
