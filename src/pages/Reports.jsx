// import { useState } from 'react';

// export default function Reports() {
//   const [items, setItems] = useState([
//     {
//       _id: '1',
//       title: 'Basural en Av. San Martín',
//       description: 'Acumulación de bolsas y plásticos en la esquina.',
//       upvotes: 3
//     },
//     {
//       _id: '2',
//       title: 'Contenedor roto en Barrio Belgrano',
//       description: 'El contenedor de reciclaje de vidrio está dañado.',
//       upvotes: 7
//     }
//   ]);

//   function vote(id) {
//     setItems(items.map(r => r._id === id ? { ...r, upvotes: r.upvotes + 1 } : r));
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-6 md:px-8 py-8 grid gap-8 md:grid-cols-2">
//       <div>
//        <div className="text-start mb-8">
//         <h1 className="titlesecond">Reportes comunitarios</h1>
//         <p className="text-lg text-gray-600">Estos son reportes de minibasurales</p>
//       </div>
//         <ul className="mt-4 space-y-3">
//           {items.map(r => (
//             <li key={r._id} className="p-4 bg-[#f5f8f5] border-gray-200 rounded-lg shadow-sm">
//               <div className="font-semibold">{r.title}</div>
//               <p className="text-sm text-gray-700 mb-2">{r.description}</p>
//               <button 
//                 onClick={() => vote(r._id)} 
//                 className="text-sm rounded-md border px-3 py-1">
//                 +1 ({r.upvotes})
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


import { useMemo, useState } from "react";
import { reportsMock } from "../constants/reportsMock";
import { FiSearch, FiPlus, FiMapPin, FiEye } from "react-icons/fi";

const ESTADOS = [
  { value: "", label: "Todos" },
  { value: "abierto", label: "Abierto" },
  { value: "en_progreso", label: "En progreso" },
  { value: "resuelto", label: "Resuelto" },
];

const SEVERIDADES = [
  { value: "", label: "Todas" },
  { value: "baja", label: "Baja" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" },
];

const WEEKDAYS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const fmtFecha = (iso) => {
  const d = new Date(iso);
  return `${WEEKDAYS[d.getDay()]} ${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}`;
};

export default function Reports() {
  const [q, setQ] = useState("");
  const [barrio, setBarrio] = useState("");
  const [estado, setEstado] = useState("");
  const [severidad, setSeveridad] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const barrios = useMemo(() => {
    const set = new Set(reportsMock.map(r => r.barrio));
    return ["", ...Array.from(set).sort()];
  }, []);

  const rows = useMemo(() => {
    return reportsMock.filter(r => {
      const okBarrio = !barrio || r.barrio === barrio;
      const okEstado = !estado || r.estado === estado;
      const okSev    = !severidad || r.severidad === severidad;
      const text = `${r.id} ${r.titulo} ${r.direccion} ${r.barrio}`.toLowerCase();
      const okQ = !q || text.includes(q.toLowerCase());
      return okBarrio && okEstado && okSev && okQ;
    });
  }, [q, barrio, estado, severidad]);

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-8 py-10">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#2d3d33]">Reportes de Mini Basurales</h1>
          <p className="text-gray-500 mt-2">Informes de la comunidad y estado de resolución.</p>
        </div>
        <button
          onClick={() => setOpenForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl shadow-md bg-[#0f8237] text-white hover:bg-[#0d6f2f] transition"
        >
          <FiPlus className="w-5 h-5" />
          Nuevo reporte
        </button>
      </header>

      {/* GRID: sidebar + tabla */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar filtros */}
        <aside className="md:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white shadow-sm p-4 space-y-4">
            <label className="block">
              <span className="block text-sm text-gray-500 mb-1">Buscar</span>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="ID, título, dirección…"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0f8237]/30"
                />
              </div>
            </label>

            <Select
              label="Barrio"
              value={barrio}
              onChange={setBarrio}
              options={barrios.map(b => ({ value: b, label: b || "Todos" }))}
            />
            <Select
              label="Estado"
              value={estado}
              onChange={setEstado}
              options={ESTADOS}
            />
            <Select
              label="Severidad"
              value={severidad}
              onChange={setSeveridad}
              options={SEVERIDADES}
            />

            <p className="text-xs text-gray-500">
              Consejo: al crear un reporte, agregá una dirección clara para verlo en el mapa.
            </p>
          </div>
        </aside>

        {/* Tabla */}
        <section className="md:col-span-8">
          <div className="rounded-2xl border border-gray-100 shadow-sm bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-[#0f8237]/10 text-[#2d3d33]">
                  <tr className="text-left">
                    <Th>ID</Th>
                    <Th>Barrio</Th>
                    <Th>Dirección</Th>
                    <Th>Severidad</Th>
                    <Th>Estado</Th>
                    <Th>Fecha</Th>
                    <Th className="w-28">Acciones</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/60">
                      <Td className="font-medium text-[#2d3d33]">{r.id}</Td>
                      <Td>{r.barrio}</Td>
                      <Td className="text-gray-600">{r.direccion}</Td>
                      <Td><SeverityPill level={r.severidad} /></Td>
                      <Td><StatusBadge state={r.estado} /></Td>
                      <Td className="text-gray-600">{fmtFecha(r.fecha)}</Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          <button
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-200 hover:bg-gray-50"
                            onClick={() => alert(`Ver ${r.id} en el mapa`)}
                          >
                            <FiMapPin className="w-4 h-4" /> Mapa
                          </button>
                          <button
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-200 hover:bg-gray-50"
                            onClick={() => alert(`Detalle ${r.id}`)}
                          >
                            <FiEye className="w-4 h-4" /> Ver
                          </button>
                        </div>
                      </Td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <Td colSpan={7} className="text-center py-10 text-gray-500">
                        No hay reportes con los filtros actuales.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Panel lateral: formulario nuevo reporte */}
      {openForm && (
        <SidePanel onClose={() => setOpenForm(false)} />
      )}
    </div>
  );
}

/* ---------- UI helpers ---------- */
function Th({ children, className = "" }) {
  return <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide ${className}`}>{children}</th>;
}
function Td({ children, className = "", colSpan }) {
  return <td colSpan={colSpan} className={`px-4 py-3 text-gray-700 ${className}`}>{children}</td>;
}
function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-500 mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#0f8237]/30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg fill='%23727272' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5.5 7.5l4.5 4.5 4.5-4.5'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right .6rem center",
          backgroundSize: "1rem 1rem",
        }}
      >
        {options.map((o) => <option key={o.value || "all"} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
function StatusBadge({ state }) {
  const map = {
    abierto:     "bg-rose-100 text-rose-700",
    en_progreso: "bg-amber-100 text-amber-700",
    resuelto:    "bg-emerald-100 text-emerald-700",
  };
  const txt = { abierto: "Abierto", en_progreso: "En progreso", resuelto: "Resuelto" }[state] || state;
  return <span className={`inline-flex px-2 py-1 rounded-full text-xs ${map[state] || "bg-gray-100 text-gray-700"}`}>{txt}</span>;
}
function SeverityPill({ level }) {
  const map = {
    baja:  "bg-gray-100 text-gray-700",
    media: "bg-amber-100 text-amber-700",
    alta:  "bg-red-100 text-red-700",
  };
  const txt = { baja: "Baja", media: "Media", alta: "Alta" }[level] || level;
  return <span className={`inline-flex px-2 py-1 rounded-full text-xs ${map[level] || "bg-gray-100 text-gray-700"}`}>{txt}</span>;
}

/* ---------- Panel lateral (formulario nuevo reporte) ---------- */
function SidePanel({ onClose }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto">
        <h3 className="text-xl font-semibold text-[#2d3d33]">Nuevo reporte</h3>
        <p className="text-gray-500 mb-4">Describe el mini basural para que podamos resolverlo.</p>

        <form className="space-y-4">
          <Field label="Título">
            <input className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f8237]/30" placeholder="Ej: Residuos en la vereda" />
          </Field>
          <Field label="Barrio">
            <input className="w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="Ej: Centro" />
          </Field>
          <Field label="Dirección">
            <input className="w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="Calle y número" />
          </Field>
          <Field label="Severidad">
            <select className="w-full rounded-xl border border-gray-200 px-3 py-2">
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </Field>
          <Field label="Descripción">
            <textarea rows={3} className="w-full rounded-xl border border-gray-200 px-3 py-2" placeholder="Detalles útiles…" />
          </Field>
          {/* Aquí podrías integrar subida de fotos y geolocalización */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50">Cancelar</button>
            <button type="button" onClick={() => { alert("Reporte enviado"); onClose(); }} className="px-4 py-2 rounded-xl bg-[#0f8237] text-white hover:bg-[#0d6f2f]">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-500 mb-1">{label}</span>
      {children}
    </label>
  );
}
