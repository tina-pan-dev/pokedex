"use client";

import Link from "next/link";
import { usePokemon } from "./usePokemon";

export default function HomePage() {
  const { data, isLoading, error } = usePokemon();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 list-none">
      {data.results.map(
        (pokemon: { name: string; url: string }, index: number) => {
          const id = index + 1;
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          const paddedId = `#${id.toString().padStart(4, "0")}`;

          return (
            <li key={pokemon.name}>
              <Link href={`/pokemon/${pokemon.name}`} className="block">
                <div className="bg-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
                  <div className="w-28 h-28 mb-2 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={pokemon.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="text-sm text-gray-500">{paddedId}</p>
                  <h2 className="text-lg font-bold capitalize mb-2">
                    {pokemon.name}
                  </h2>

                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-green-400/80 text-white rounded-full">
                      Grass
                    </span>
                    <span className="text-xs px-2 py-1 bg-purple-400/80 text-white rounded-full">
                      Poison
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
}
