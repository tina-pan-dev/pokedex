"use client";

import { usePokemon } from "./usePokemon";
import { useState, useMemo, FormEvent } from "react";
import Link from "next/link";

type Pokemon = {
  name: string;
  url: string;
  id: number;
};

export default function HomePage() {
  const { data, isLoading, error } = usePokemon();
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortBy, setSortBy] = useState<"number" | "name">("number");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const pokemonList: Pokemon[] = useMemo(() => {
    if (!data?.results) return [];
    return data.results.map(
      (pokemon: { name: string; url: string }, index: number) => ({
        ...pokemon,
        id: index + 1,
      })
    );
  }, [data]);

  const filteredList = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      const idMatch = pokemon.id.toString().includes(searchTerm.trim());
      const nameMatch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      return idMatch || nameMatch;
    });
  }, [pokemonList, searchTerm]);

  const sortedList = useMemo(() => {
    return [...filteredList].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
  }, [filteredList, sortBy]);

  const displayedList = useMemo(() => {
    return sortedList.slice(0, visibleCount);
  }, [sortedList, visibleCount]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
    setVisibleCount(12);
  };

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Something went wrong!</p>;

  return (
    <div className="p-4">
      {/* Search + Sort Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search (centered always) */}
        <div className="w-full flex justify-center sm:justify-start">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full max-w-md gap-2"
          >
            <input
              type="text"
              placeholder="Search by name or number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border rounded px-4 py-2 text-sm w-full"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Sort dropdown (top right) */}
        <div className="flex items-center gap-2 sm:justify-end">
          <label
            htmlFor="sort-select"
            className="text-sm text-gray-700 font-medium"
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "number" | "name")}
            className="border rounded px-4 py-2 text-sm"
          >
            <option value="number">Number</option>
            <option value="name">Name</option>
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
