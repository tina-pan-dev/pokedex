import { useQuery } from "@tanstack/react-query";

const fetchPokemonList = async () => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  if (!res.ok) throw new Error("Failed to fetch Pokémon");
  return res.json();
};

export const usePokemon = () => {
  return useQuery({
    queryKey: ["pokemon", 151],
    queryFn: fetchPokemonList,
  });
};
