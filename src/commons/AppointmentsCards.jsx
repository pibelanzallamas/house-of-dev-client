import axios from "axios";
import { Link } from "react-router-dom";
import "animate.css/animate.min.css";
import { alerts } from "../utils/alerts";

function AppointmentsCards({ cita, modFavs }) {

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
          <img src={cita.property.images} alt={cita.property.name} />
        </div>
        <div className="texto">
          <div className="rectangulo-uno">
            <div className="cuadradito-uno">
              <p style={{ top: "-6px" }}>
                <strong>
                  {" "}
                  {cita.date.slice(11, 13) - 3}:{cita.date.slice(14, 16)} hs
                </strong>
              </p>
            </div>
            <div className="cuadradito-cuatro">
              <p style={{ top: "-6px", left: "6%" }}>
                <strong>
                  {cita.date.slice(8, 10)} / {cita.date.slice(5, 7)} /{" "}
                  {cita.date.slice(0, 4)}
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
              <p style={{ left: "3%" }}>{cita.property.name}</p>
            </div>
          </div>
          <div className="rectangulo-dos">
            <p style={{ top: "-6px" }}>
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
              style={{ left: "68%" }}
            >
              CANCELAR
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentsCards;
