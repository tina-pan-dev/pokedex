// components/PokemonCard.tsx
import Link from "next/link";
import Image from "next/image";
import { typeColors } from "../utils/typeColors";
import { Pokemon } from "./HomePage";

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const paddedId = pokemon?.id
    ? `#${pokemon.id.toString().padStart(4, "0")}`
    : "";

  const imageUrl = pokemon?.id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    : "";

  return (
    <li key={pokemon.id}>
      <Link href={`/pokemon/${pokemon.name}`} className="block">
        <div className="bg-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
          <div className="w-28 h-28 mb-2 flex items-center justify-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={pokemon.name}
                width={256}
                height={256}
                className="object-contain mb-4"
              />
            )}
          </div>
          <p className="text-sm text-gray-500">{paddedId}</p>
          <h2 className="text-lg font-bold capitalize mb-2">{pokemon.name}</h2>
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
}
