import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light mb-0 border border-bottom-0">
      <div>
        <Link className="navbar-brand" to="/">
          Evaluación Osp
        </Link>
      </div>
      <div className="float-left" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link p-3" to="#">
            <i className="fa fa-user" aria-hidden="true" /> Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
