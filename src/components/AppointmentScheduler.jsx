import React, { useState } from "react";
//import transporter from "../../../back/utils/mailer";
import { alerts } from "../utils/alerts";
import { useNavigate } from "react-router-dom";

function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleScheduleAppointment = () => {
    const appointmentData = {
      date: selectedDate,
      time: selectedTime,
    };

    alerts(
      "Cita agendada!",
      "Un correo electronico fue enviado con los datos de la cita.",
      "success"
    );

    navigate("/");

    // try {
    //   transporter.sendMail({
    //     from: "brandoncastillo.09@gmail.com", // Cambia esto a tu dirección de correo
    //     to: "notas@icloud.com", // Cambia esto al correo del usuario
    //     subject: "Cita agendada",
    //     text: `Has agendado una cita para la propiedad con ID ${propertyId} el ${selectedDate} a las ${selectedTime}.`,
    //   });

    //   alerts(
    //     "Cita agendada!",
    //     "Un correo electronico fue nevio con los datos de la cita.",
    //     "success"
    //   );
    // } catch (error) {
    //   alerts(
    //     "Error al enviar el correo!",
    //     "Por favor intente nuevamente",
    //     "danger"
    //   );
    // }
  };

  return (
    <div>
      <h2>Agendar Cita</h2>
      <label>Fecha:</label>
      <input type="date" value={selectedDate} onChange={handleDateChange} />

      <label>Hora:</label>
      <input type="time" value={selectedTime} onChange={handleTimeChange} />

      <button onClick={handleScheduleAppointment}>Agendar Cita</button>
    </div>
  );
}

export default AppointmentScheduler;
