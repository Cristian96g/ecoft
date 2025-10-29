import { useState, useEffect } from "react";
import { mockStats, mockPendingPoints } from "../constants/admin";

export default function Admin() {
  const [stats, setStats] = useState({});
  const [pending, setPending] = useState([]);

  useEffect(() => {
    // Simula la carga de datos desde el backend
    setStats(mockStats);
    setPending(mockPendingPoints);
  }, []);

  function approve(id) {
    // Simula aprobación
    setPending(pending.filter(p => p._id !== id));
  }

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8 py-8 space-y-8">
      <div>
        <h2>Panel de Administración</h2>
        <p className="text-sm text-gray-700">
          Usuarios: {stats.users} · Reportes: {stats.reports} · Puntos aprobados: {stats.points}
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Puntos sugeridos (pendientes)</h3>
        <ul className="mt-3 space-y-2">
          {pending.map(p => (
            <li
              key={p._id}
              className="border rounded-md p-3 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-600">{p.types.join(", ")}</div>
              </div>
              <button
                onClick={() => approve(p._id)}
                className="rounded-md bg-primary-700 text-white px-3 py-1.5"
              >
                Aprobar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
