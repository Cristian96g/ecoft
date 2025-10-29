import { useState, useEffect } from "react";
import { mockEducation } from "../constants/mockEducation";

export default function Education() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simula llamada a la API
    setTimeout(() => {
      setItems(mockEducation);
    }, 500);
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="titlesecond">Educación Ambiental</h1>
        <p className="text-lg text-gray-600">Aprende sobre recolección</p>
      </div>
      <div className="mt-6 grid gap-4">
        {items.map((it) => (
          <article key={it._id} className="bg-[#f5f8f5] border-gray-200 rounded-lg shadow-sm p-4">
            <h3 className="font-semibold">{it.title}</h3>
            {it.url && (
              <a
                className="text-primary-700 text-sm"
                href={it.url}
                target="_blank"
              >
                Ver recurso
              </a>
            )}
            <p className="text-sm text-gray-700 mt-1">{it.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
