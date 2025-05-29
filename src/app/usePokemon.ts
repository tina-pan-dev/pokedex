// app/usePokemon.ts
import { useQuery } from "@tanstack/react-query";

export type Pokemon = {
  name: string;
  url: string;
  id: number;
};

export function usePokemon() {
  return useQuery<Pokemon[], Error>({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const res = await fetch("/api/pokemon");
      if (!res.ok) throw new Error("Failed to fetch Pokémon");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
