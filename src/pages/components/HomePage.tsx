// pages/HomePage.tsx
import { useState, useMemo, FormEvent, useEffect } from "react";
import Link from "next/link";
import { typeColors } from "../utils/typeColors";
import { useDebounce } from "../utils/useDebounce";

export type Pokemon = {
  name: string;
  url: string;
  id: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

type Props = {
  initialList: Pokemon[];
};

export default function HomePage({ initialList }: Props) {
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [sortBy, setSortBy] = useState<"number" | "name">("number");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchInput.trim(), 300);
  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
    setVisibleCount(12);
  }, [debouncedSearchTerm]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVisibleCount(12);
  };

  const filteredList = useMemo<Pokemon[]>(() => {
    return initialList.filter((pokemon) => {
      const idMatch = pokemon.id.toString().includes(searchTerm.trim());
      const nameMatch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      return idMatch || nameMatch;
    });
  }, [initialList, searchTerm]);

  const sortedList = useMemo<Pokemon[]>(() => {
    return [...filteredList].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
  }, [filteredList, sortBy]);

  const displayedList = useMemo<Pokemon[]>(() => {
    return sortedList.slice(0, visibleCount);
  }, [sortedList, visibleCount]);

  return (
    <div className="p-4">
      {/* Search + Sort Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="w-full flex justify-center">
          <form className="relative flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search by name or number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border rounded px-4 py-2 pl-4 pr-10 text-sm w-full"
            />

            {searchInput ? (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  setSearchTerm("");
                  setVisibleCount(12);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
                aria-label="Clear search"
              >
                ×
              </button>
            ) : (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
              </div>
            )}
          </form>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
          <label
            htmlFor="sort-select"
            className="text-sm text-gray-700 font-medium mr-2"
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

      {/* Pokémon Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
        {displayedList.map((pokemon) => {
          const paddedId = `#${pokemon.id.toString().padStart(4, "0")}`;
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

          return (
            <li key={pokemon.id}>
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
                  <div className="flex flex-wrap gap-1 justify-center mt-1">
                    {pokemon.types
                      .sort((a, b) => a.slot - b.slot)
                      .map((t) => (
                        <span
                          key={t.type.name}
                          className={`px-2 py-0.5 text-xs text-white rounded-full capitalize ${
                            typeColors[t.type.name] || "bg-gray-400"
                          }`}
                        >
                          {t.type.name}
                        </span>
                      ))}
                  </div>
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
