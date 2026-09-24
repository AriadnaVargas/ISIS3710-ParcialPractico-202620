// La URL del back se configura en el archivo .env
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Así viene cada plan en la lista que manda el back
export type PlanSummary = {
  
  name: string;
  description: string;
  estimatedPrice: number;
  estimatedTime: number;
  recomendations: string;
  address: string;
  image: string;
  userId: string;
};

export async function createPlan(
  name: string,
  description: string,
  estimatedPrice: number,
  estimatedTime: number,
  recomendations: string,
  address: string,
  image: string,
  userId: string,
) {
  const response = await fetch(`${API_URL}/plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, estimatedPrice, estimatedTime, recomendations, address, image, userId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo crear el plan");
  }

  return data.id;
}