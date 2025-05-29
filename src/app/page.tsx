"use client";

import { usePokemon } from "./usePokemon";
import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function HomePage() {
  const { data, isLoading, error } = usePokemon();
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortBy, setSortBy] = useState<"number" | "name">("number");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Something went wrong!</p>;

  const pokemonList = data.results.map(
    (pokemon: { name: string; url: string }, index: number) => ({
      ...pokemon,
      id: index + 1,
    })
  );

  // 🔍 Filter by name or number
  const filteredList = pokemonList.filter((pokemon) => {
    const idMatch = pokemon.id.toString().includes(searchTerm.trim());
    const nameMatch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());
    return idMatch || nameMatch;
  });

  // 🔢 Sort
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return a.id - b.id;
  });

  const displayedList = sortedList.slice(0, visibleCount);

  return (
    <div className="p-4">
      {/* Search + Sort Controls */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTerm(searchInput.trim());
            setVisibleCount(12);
          }}
          className="w-full md:w-auto flex gap-2 items-center"
        >
          <input
            type="text"
            placeholder="Search by name or number"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border rounded px-4 py-2 text-sm w-full md:w-64"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "number" | "name")}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="number">Number</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
        {displayedList.map((pokemon) => {
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

      {/* Load More */}
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

      {/* No results */}
      {filteredList.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No Pokémon found.</p>
      )}
    </div>
  );
}
