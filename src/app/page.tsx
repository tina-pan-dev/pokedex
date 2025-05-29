"use client";

import { usePokemon } from "./usePokemon";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading, error } = usePokemon();
  const [visibleCount, setVisibleCount] = useState(12); // 3 rows of 4 cards

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Something went wrong!</p>;

  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
        {data.results
          .slice(0, visibleCount)
          .map((pokemon: { name: string; url: string }, index: number) => {
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
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>

      {visibleCount < data.results.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Load more Pokémon
          </button>
        </div>
      )}
    </div>
  );
}
