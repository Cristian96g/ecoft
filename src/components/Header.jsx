import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiMap, FiCalendar, FiAward, FiAlertCircle,
  FiBookOpen, FiUser, FiHome
} from "react-icons/fi";
import Logo from "../assets/ecorg-logo.png";

const linkClasses = ({ isActive }) =>
  `flex items-center space-x-2 px-1.5 py-3 rounded-lg font-medium transition-colors gap-[0.2rem] ${isActive
    ? "text-[#2976A6] "
    : "text-gray-400 hover:text-[#2976A6]"
  }`;

function Header() {
  return (
    <header className="backdrop-blur-md bg-transparent sticky top-0 z-50 shadow-md border-b border-white/30 px-6">
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* <h1 className="text-2xl font-extrabold text-[#2d3d33] tracking-wide">
          EcoRG
        </h1> */}
        <img
          src={Logo}
          alt="EcoRG logo"
          className="h-16 w-auto"
          draggable="false"
        />
        <ul className="hidden md:flex space-x-4">
          <NavLink to="/" className={linkClasses} ><FiHome />Inicio</NavLink>
          <NavLink to="/mapa" className={linkClasses}><FiMap />Mapa</NavLink>
          <NavLink to="/calendario" className={linkClasses}><FiCalendar />Calendario</NavLink>
          {/* <NavLink to="/gamificacion" className={linkClasses}><FiAward />Gamificación</NavLink> */}
          <NavLink to="/reportes" className={linkClasses}><FiAlertCircle />Reportes</NavLink>
          <NavLink to="/educacion" className={linkClasses}><FiBookOpen />Educación</NavLink>
          <NavLink to="/perfil" className={linkClasses}><FiUser />Perfil</NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default Header;