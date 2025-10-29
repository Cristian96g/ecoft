// import { useEffect } from "react";
// import L from "leaflet";

// export const MapLeaflet = () => {
//     useEffect(() => {
//         // Initialize the map
//         const map = L.map("map").setView([-51.623, -69.216], 12);
//         // Add a tile layer (you can choose different providers)
//         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             attribution: '&copy; OpenStreetMap contributors'
//         }).addTo(map);
//         // Add a marker (optional)
//         points.forEach(p => L.marker([p.location.coordinates[1], p.location.coordinates[0]]).addTo(map).bindPopup(p.name));
//         return () => map.remove();
//     }, [points]);


//     return <div id="map" className="h-[72vh] rounded-lg border" />;
// }

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapLeaflet({ points = [] }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Río Gallegos -> lat, lng
      mapRef.current = L.map("map").setView([-51.623, -69.216], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(mapRef.current);
    }

    // limpiar marcadores anteriores
    const markers = [];
    points.forEach((p) => {
      const [lng, lat] = p.location.coordinates; // ⚠️ en DB siempre es [lng, lat]
      const marker = L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup(p.name);
      markers.push(marker);
    });

    // cleanup para no duplicar marcadores
    return () => {
      markers.forEach((m) => mapRef.current.removeLayer(m));
    };
  }, [points]);

  return <div id="map" className="h-[70vh] rounded-lg border" />;
}
