// app/page.tsx (Server Component)
import HomePage, { Pokemon } from "./HomePage";

type PokemonTypeData = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export default async function Page() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 3600 }, // Optional caching
  });

  if (!res.ok) throw new Error("Failed to fetch Pokémon list");

  const data = await res.json();

  // Fetch detailed data (with types) for each Pokémon in parallel
  const detailedList: Pokemon[] = await Promise.all(
    data.results.map(
      async (pokemon: { name: string; url: string }, index: number) => {
        try {
          const detailRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const detailData = await detailRes.json();
          const types: PokemonTypeData[] = detailData.types;
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: index + 1,
            types,
          };
        } catch {
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: index + 1,
            types: [],
          };
        }
      }
    )
  );

  return <HomePage initialList={detailedList} />;
}
