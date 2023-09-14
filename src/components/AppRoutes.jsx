import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import Property from "./Property";
import Users from "./Users";
import Properties from "./Properties";
import CreateProp from "./CreateProp";
import CreateAppo from "./CreateAppo";

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
      <Route path="/appointments/register/:id" element={<CreateAppo />} />
    </Routes>
  );
}

export default AppRoutes;
