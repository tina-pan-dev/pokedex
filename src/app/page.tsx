"use client";

import { usePokemon } from "./usePokemon";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading, error } = usePokemon();
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortBy, setSortBy] = useState<"number" | "name">("number");

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Something went wrong!</p>;

  // 🧠 Prepare Pokémon with index for sorting by number
  const pokemonList = data.results.map(
    (pokemon: { name: string; url: string }, index: number) => ({
      ...pokemon,
      id: index + 1,
    })
  );

  // 🔁 Sort logic
  const sortedList = [...pokemonList].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return a.id - b.id;
  });

  return (
    <div className="p-4">
      {/* Sort Dropdown */}
      <div className="mb-4 flex justify-end">
        <label className="text-sm font-medium mr-2">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "number" | "name")}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="number">Number</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>

      {/* Pokémon Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
        {sortedList.slice(0, visibleCount).map((pokemon) => {
          const paddedId = `#${pokemon.id.toString().padStart(4, "0")}`;
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

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

      {/* Load More Button */}
      {visibleCount < sortedList.length && (
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
