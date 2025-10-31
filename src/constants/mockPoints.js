const mockPoints = [
  {
    _id: 1,
    name: "Punto Verde - Centro",
    barrio: "Centro",
    estado: "activo",
    address: "Av. Libertador 1100",
    location: { type: "Point", coordinates: [-72.264, -50.340] }, // [lng, lat]
    types: ["plastico", "vidrio"],
  },
  {
    _id: 2,
    name: "Punto Verde - Lago Argentino",
    barrio: "Lago Argentino",
    estado: "activo",
    address: "Costanera y Los Pioneros",
    location: { type: "Point", coordinates: [-72.275, -50.345] },
    types: ["papel", "pilas"],
  },
  {
    _id: 3,
    name: "Punto Verde - Aeropuerto Viejo",
    barrio: "Aeropuerto Viejo",
    estado: "inactivo",
    address: "Av. del Libertador 3200",
    location: { type: "Point", coordinates: [-72.255, -50.337] },
    types: ["aceite", "plastico"],
  },
  {
    _id: 4,
    name: "Punto Verde - Punta Soberana",
    barrio: "Punta Soberana",
    estado: "activo",
    address: "Calle 25 y Los Álamos",
    location: { type: "Point", coordinates: [-72.300, -50.355] },
    types: ["vidrio", "papel"],
  },
];

export default mockPoints;
