// src/components/Card.jsx
import React from "react";

export default function Card({ icon: Icon, title, description, link }) {
  return (
    <a
      href={link}
      className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-[#2d3d33]/10 hover:shadow-[#2d3d33]/10"
    >
      {Icon && <Icon className="w-10 h-10 text-[#66a939]" />}
      <h2 className="mt-4 text-xl font-bold text-[#3c6724]">{title}</h2>
      <p className="mt-1 text-sm text-gray-700">{description}</p>
    </a>
  );
}
