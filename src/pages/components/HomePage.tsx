import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "../utils/useDebounce";
import { Header } from "../components/Header";
import { PokemonCard } from "../components/PokemonCard";

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

  // debounced search
  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
    setVisibleCount(12);
  }, [debouncedSearchTerm]);

  // search by name or number
  const filteredList = useMemo(() => {
    return initialList.filter((pokemon) => {
      const idMatch = pokemon.id.toString().includes(searchTerm.trim());
      const nameMatch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      return idMatch || nameMatch;
    });
  }, [initialList, searchTerm]);

  // sort by name or number
  const sortedList = useMemo(() => {
    return [...filteredList].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
  }, [filteredList, sortBy]);

  const displayedList = useMemo(() => {
    return sortedList.slice(0, visibleCount);
  }, [sortedList, visibleCount]);

  return (
    <div className="p-4">
      {/* search & sort */}
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchTerm={setSearchTerm}
        setVisibleCount={setVisibleCount}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* pokemon grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
        {displayedList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>

      {/* load more */}
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

      {/* error handling */}
      {filteredList.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No Pokémon found.</p>
      )}
    </div>
  );
}
