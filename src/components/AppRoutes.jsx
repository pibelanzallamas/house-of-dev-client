import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Property from "./Property";
import User from "./User";
import Users from "./Users";
import CreateProp from "./CreateProp";
import Properties from "./Properties";
import AppointmentScheduler from "./AppointmentScheduler";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/properties/:id" element={<Property />} />
      <Route path="/users/" element={<Users />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/register" element={<CreateProp />} />
      <Route path="/properties/mod/:id" element={<Property />} />
      <Route path="/appointments/register" element={<AppointmentScheduler />} />
    </Routes>
  );
}

export default AppRoutes;
