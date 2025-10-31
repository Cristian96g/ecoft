const mockPoints = [
  {
    _id: 1,
    name: "Punto Verde - Centro",
    location: { type: "Point", coordinates: [-72.264, -50.340] }, // lng, lat
    types: ["plastico", "vidrio"]
  },
  {
    _id: 2,
    name: "Punto Verde - Lago Argentino",
    location: { type: "Point", coordinates: [-72.275, -50.345] },
    types: ["papel", "pilas"]
  },
  {
    _id: 3,
    name: "Punto Verde - Aeropuerto Viejo",
    location: { type: "Point", coordinates: [-72.255, -50.337] },
    types: ["aceite", "plastico"]
  }
];

export default mockPoints;
