import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { alerts } from "../utils/alerts";

function CreateAppo() {
  const pid = useParams().id;
  const user = useSelector((state) => state.user);
  const uid = user.id;
  const [property, setProperty] = useState({});
  const [date, setDate] = useState(false);
  const [appo, setAppo] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  const navigate = useNavigate();

  //get property
  useEffect(() => {
    axios
      .get(`/api/properties/${pid}`)
      .then((data) => {
        setProperty(data.data);
      })
      .catch((err) => console.log(err));
  }, [user, pid]);

  //get appo
  useEffect(() => {
    axios
      .get("/api/appointments/find/one", { params: { uid, pid } })
      .then((data) => {
        if (data.data.pid) {
          setDate(true);
          setAppo(data.data);
        } else setDate(false);
      })
      .catch((err) => console.log(err));
  }, [user, pid]);

  //create appointment
  function handleDate() {
    axios
      .post("/api/appointments/register", { uid, pid, date: startDate })
      .then((data) => {
        if (data.data[1]) {
          alerts("Exito!", "Logró guardar la cita correctamente 📝", "success");
          navigate(`/users/${uid}`);
        } else {
          alerts(
            "Ohno!",
            "Lamentablemente, este horario ya esta reservado 😇",
            "warning"
          );
        }
      })
      .catch((err) => console.log(err));
  }

  registerLocale("es", es);
  setDefaultLocale("es");

  const handleDateChange = (date) => {
    date.setMilliseconds(0);
    setStartDate(date);
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1" style={{ textTransform: "uppercase" }}>
            REALIZAR CITA EN {property.name}
          </h2>
        </div>

        {date ? (
          <div className="home-titulo" style={{ border: "none" }}>
            <h2 className="linea1" style={{ marginRight: "1%" }}>
              USTED YA TIENE CITA
            </h2>
          </div>
        ) : (
          <div>
            <div className="appo-card">
              <div className="home-titulo" style={{ border: "none" }}>
                <h2
                  className="linea1"
                  style={{ marginRight: "1%", fontSize: "18px" }}
                >
                  Seleccionar Fecha
                </h2>
              </div>
              <div className="o">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeIntervals={60}
                  timeFormat="HH:mm:ss"
                  dateFormat="MMMM d, yyyy h:mm:ss aa"
                  inline
                  timeCaption="Hora"
                  minDate={today}
                  minTime={new Date().setHours(9, 0)}
                  maxTime={new Date().setHours(17, 0)}
                />
              </div>
              <div className="boton-div">
                <button className="boton-fecha" onClick={handleDate}>
                  Confirmar Fecha
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateAppo;
