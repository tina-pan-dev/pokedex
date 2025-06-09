// components/Header.tsx

interface HeaderProps {
  searchInput: string;
  setSearchInput: (val: string) => void;
  setSearchTerm: (val: string) => void;
  setVisibleCount: (val: number) => void;
  sortBy: "number" | "name";
  setSortBy: (val: "number" | "name") => void;
}

export function Header({
  searchInput,
  setSearchInput,
  setSearchTerm,
  setVisibleCount,
  sortBy,
  setSortBy,
}: HeaderProps) {
  return (
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
  );
}
