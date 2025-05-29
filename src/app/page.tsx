// app/page.tsx (Server Component)
import HomePage from "./HomePage";

export default async function Page() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    // Optional caching if needed:
    next: { revalidate: 3600 }, // revalidates every hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data = await res.json();
  const list = data.results.map(
    (pokemon: { name: string; url: string }, index: number) => ({
      ...pokemon,
      id: index + 1,
    })
  );

  return <HomePage initialList={list} />;
}
