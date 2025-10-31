import { useState, useMemo } from "react";
import { FiEdit2, FiSave, FiX, FiUpload } from "react-icons/fi";

// Mock inicial (reemplazá por tu fetch/auth)
const mockUser = {
  nombre: "Pilar Ayala",
  email: "pilarayala@example.com",
  telefono: "+54 2966 123456",
  direccion: "Las heras 123",
  barrio: "Centro",
  avatarUrl: "",
  preferencias: {
    notificaciones: true,
    newsletter: false,
  },
};

// barrios de tu ciudad (podés traerlos de tu API)
const BARRIOS = ["Centro", "Belgrano", "San Benito", "Jardín Botánico", "YCF", "Evita"];

export default function Profile() {
  const [user, setUser] = useState(mockUser);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(user);
  const [avatarFile, setAvatarFile] = useState(null);
  const avatarPreview = useMemo(
    () => (avatarFile ? URL.createObjectURL(avatarFile) : user.avatarUrl || ""),
    [avatarFile, user.avatarUrl]
  );

  const onEdit = () => {
    setForm(user);
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
    setAvatarFile(null);
  };
  const onChange = (path, value) => {
    // path: e.g. "nombre" o "preferencias.notificaciones"
    if (path.startsWith("preferencias.")) {
      const key = path.split(".")[1];
      setForm((f) => ({ ...f, preferencias: { ...f.preferencias, [key]: value } }));
    } else {
      setForm((f) => ({ ...f, [path]: value }));
    }
  };

  const onSave = async (e) => {
    e?.preventDefault();
    // Validaciones mínimas
    if (!form.nombre?.trim()) return alert("El nombre es obligatorio.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return alert("Email inválido.");

    setSaving(true);
    try {
      // Si conectás backend: armás FormData y enviás
      // const fd = new FormData();
      // Object.entries(form).forEach(([k, v]) => {
      //   if (k === "preferencias") fd.append(k, JSON.stringify(v));
      //   else fd.append(k, v ?? "");
      // });
      // if (avatarFile) fd.append("avatar", avatarFile);
      // await fetch("/api/me", { method: "POST", body: fd });

      // Mock de guardado
      await new Promise((r) => setTimeout(r, 700));
      setUser((u) => ({
        ...u,
        ...form,
        avatarUrl: avatarFile ? avatarPreview : u.avatarUrl,
      }));
      setEditing(false);
      setAvatarFile(null);
    } catch (e) {
      console.error(e);
      alert("No se pudo guardar. Intentá nuevamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-8 py-10">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#2d3d33]">Perfil</h1>
          <p className="text-gray-500 mt-2">Gestioná tus datos y preferencias.</p>
        </div>
        <div className="flex items-center gap-2">
          {!editing ? (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
            >
              <FiEdit2 className="w-4 h-4" /> Editar
            </button>
          ) : (
            <>
              <button
                onClick={onCancel}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
              >
                <FiX className="w-4 h-4" /> Cancelar
              </button>
              <button
                onClick={onSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f8237] text-white hover:bg-[#0d6f2f] disabled:opacity-60"
              >
                <FiSave className="w-4 h-4" /> {saving ? "Guardando..." : "Guardar"}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Grid: avatar + formulario */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Avatar */}
        <aside className="md:col-span-4">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Sin foto
                  </div>
                )}
              </div>
              {editing && (
                <label className="absolute -bottom-2 right-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow cursor-pointer text-sm">
                  <FiUpload className="w-4 h-4 text-[#0f8237]" />
                  Cambiar
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setAvatarFile(f);
                    }}
                  />
                </label>
              )}
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-[#2d3d33]">{user.nombre}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

        
          </div>
        </aside>

        {/* Formulario */}
        <section className="md:col-span-8">
          <form
            onSubmit={onSave}
            className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nombre y Apellido">
                <input
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f8237]/30"
                  value={editing ? form.nombre : user.nombre}
                  onChange={(e) => onChange("nombre", e.target.value)}
                  disabled={!editing}
                  required
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f8237]/30 disabled:bg-gray-50"
                  value={editing ? form.email : user.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  disabled={!editing} // si usás Firebase Auth, conviene no permitir cambiar email aquí
                />
              </Field>

              <Field label="Teléfono">
                <input
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f8237]/30"
                  value={editing ? form.telefono : user.telefono}
                  onChange={(e) => onChange("telefono", e.target.value)}
                  disabled={!editing}
                />
              </Field>

              <Field label="Barrio ">
                <select
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f8237]/30"
                  value={editing ? form.barrio : user.barrio}
                  onChange={(e) => onChange("barrio", e.target.value)}
                  disabled={!editing}
                >
                  {BARRIOS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </Field>

              <Field label="Dirección">
                <input
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f8237]/30 md:col-span-2"
                  value={editing ? form.direccion : user.direccion}
                  onChange={(e) => onChange("direccion", e.target.value)}
                  disabled={!editing}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Preferencias">
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#0f8237] focus:ring-[#0f8237]"
                      checked={editing ? form.preferencias.notificaciones : user.preferencias.notificaciones}
                      onChange={(e) => onChange("preferencias.notificaciones", e.target.checked)}
                      disabled={!editing}
                    />
                    <span className="text-gray-700">Recibir notificaciones</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#0f8237] focus:ring-[#0f8237]"
                      checked={editing ? form.preferencias.newsletter : user.preferencias.newsletter}
                      onChange={(e) => onChange("preferencias.newsletter", e.target.checked)}
                      disabled={!editing}
                    />
                    <span className="text-gray-700">Recibir newsletter</span>
                  </label>
                </div>
              </Field>

              {/* Zona de seguridad (placeholder) */}
              <Field label="Seguridad (próximamente)">
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-600">
                  Cambio de contraseña / 2FA desde el panel de seguridad.
                </div>
              </Field>
            </div>

            {editing && (
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-[#0f8237] text-white hover:bg-[#0d6f2f] disabled:opacity-60"
                >
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            )}
          </form>
        </section>
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
function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
      <div className="text-[#2d3d33] font-semibold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
