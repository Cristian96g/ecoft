// src/sections/RadialStatsSegmented.jsx
import React from "react";
import { FiUsers, FiCheckCircle } from "react-icons/fi";
import { LuRecycle } from "react-icons/lu";

// NOTA: ya no usamos SegmentedProgress acá porque el nuevo diseño no lleva círculo
// import SegmentedProgress from "./SegmentedProgress";

export default function RadialStatsSegmented() {
  // Datos (podés traerlos de props o API)
  const items = [
    {
      value: "15,000+",
      label: "Usuarios Activos",
      desc: "Personas usando EcoFt para mapear puntos verdes y reciclar.",
      Icon: FiUsers,
    },
    {
      value: "500",
      label: "Toneladas recicladas",
      desc: "Toneladas registradas en campañas y puntos verdes.",
      Icon: LuRecycle,
    },
    {
      value: "3,500+",
      label: "Reportes Resueltos",
      desc: "Microbasurales atendidos con ayuda de la comunidad.",
      Icon: FiCheckCircle,
    },
  ];

  return (
    <section className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
      {/* Título de sección (opcional) */}
      <div className="text-center mb-16">
        <h2 className="titlesecond">
          Impactos y Estadísticas Clave
        </h2>
      </div>

      {/* Grid de 3 columnas como el diseño “Statistic” */}
      <div className="grid gap-10 row-gap-8 lg:grid-cols-3">
        {items.map(({ value, label, desc, Icon }, i) => (
          <div key={i}>
            <div className="flex items-center">
              <h6 className="mr-2 text-4xl font-bold md:text-5xl" style={{ color: "#2d3d33" }}>
                {value}
              </h6>
              <div className="flex items-center justify-center rounded-full w-8 h-8 bg-[#66a93933] sm:w-9 sm:h-9">
                <Icon className="text-[#66a939] w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            <p className="mb-2 font-bold md:text-lg" style={{ color: "#2d3d33" }}>
              {label}
            </p>

            {desc && (
              <p className="text-gray-700">
                {desc}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
