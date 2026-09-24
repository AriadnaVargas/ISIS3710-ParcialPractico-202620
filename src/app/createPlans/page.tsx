"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPlan } from "@/services/createplans";
import { getSession } from "@/services/session";

export default function CreatePlan() {
  const router = useRouter();
  const [nombrePlan, setNombrePlan] = useState("");
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [recomendacion, setRecomendacion] = useState("");
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const session = getSession();
      if (!session?.id) throw new Error("No hay una sesión activa");

      await createPlan(
        nombrePlan,
        direccion,
        Number(precio),
        Number(duracion),
        descripcion,
        recomendacion,
        imagen,
        session.id,
      );
      router.push("/plans");
    } catch (err) {
      setError("No se pudo crear el plan, revisa los datos");
      console.error(err);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-5xl font-bold text-slate-900 mt-6">Crea un plan</h1>
      <p className="text-lg text-slate-600 mt-2">Comparte una nueva experiencia.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 mt-10 w-full max-w-md">
        <label className="block text-sm font-semibold text-slate-700">Nombre del plan</label>
        <input value={nombrePlan} onChange={(e) => setNombrePlan(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none" />

        <label className="block text-sm font-semibold text-slate-700 mt-4">Dirección</label>
        <input value={direccion} onChange={(e) => setDireccion(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none" />

        <label className="block text-sm font-semibold text-slate-700 mt-4">Precio</label>
        <input type="number" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none" />

        <label className="block text-sm font-semibold text-slate-700 mt-4">Duración</label>
        <input type="number" min="0" value={duracion} onChange={(e) => setDuracion(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none" />

        <label className="block text-sm font-semibold text-slate-700 mt-4">Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none" />

        <label className="block text-sm font-semibold text-slate-700 mt-4">Recomendación</label>
        <textarea value={recomendacion} onChange={(e) => setRecomendacion(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none" />

        <label className="block text-sm font-semibold text-slate-700 mt-4">Imagen</label>
        <input type="url" value={imagen} onChange={(e) => setImagen(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none" />

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-700 text-white font-semibold rounded-xl py-4 mt-8">Crear plan</button>
      </form>
    </div>
  );
}