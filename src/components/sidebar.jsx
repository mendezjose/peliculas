import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar d-none d-lg-block">
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link border-bottom p-3" to="#">
          Dashboard
        </NavLink>
        <NavLink
          className="nav-item nav-link border-bottom p-3"
          to="/peliculas"
        >
          Películas
        </NavLink>
        <NavLink className="nav-item nav-link border-bottom p-3" to="/turnos">
          Turnos
        </NavLink>
        <NavLink className="nav-item nav-link border-bottom p-3" to="#">
          Administradores
        </NavLink>
        <NavLink className="nav-item nav-link border-bottom p-3" to="#">
          Perfil
        </NavLink>
        <NavLink className="nav-item nav-link border-bottom p-3" to="#">
          Cerrar sesión
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
