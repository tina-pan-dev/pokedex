"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function PokemonDetailPage() {
  const { name } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-details", name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error("Failed to fetch Pokémon details");
      return res.json();
    },
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Something went wrong!</p>;

  const paddedId = `#${data.id.toString().padStart(4, "0")}`;
  const image = data.sprites.other["official-artwork"].front_default;
  const types = data.types.map((t: any) => t.type.name);
  const stats = data.stats;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex flex-col items-center bg-white rounded-2xl p-6 shadow-md">
        <Image
          src={image}
          alt={data.name}
          width={256}
          height={256}
          className="object-contain mb-4"
        />

        <h1 className="text-3xl font-bold capitalize">{data.name}</h1>
        <p className="text-gray-500 text-sm mb-4">{paddedId}</p>

        <div className="flex gap-2 mb-6">
          {types.map((type: string) => (
            <span
              key={type}
              className={`text-xs px-3 py-1 rounded-full capitalize text-white ${
                typeColors[type] || "bg-gray-400"
              }`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mb-6 text-center">
          <div>
            <p className="text-gray-500 text-sm">Height</p>
            <p className="font-semibold">{data.height / 10} m</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Weight</p>
            <p className="font-semibold">{data.weight / 10} kg</p>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">Base Stats</h2>
          <ul className="space-y-2">
            {stats.map((s: any) => (
              <li key={s.stat.name} className="flex justify-between text-sm">
                <span className="capitalize">{s.stat.name}</span>
                <span className="font-medium">{s.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Type → Color mapping
const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  ice: "bg-cyan-300",
  fighting: "bg-orange-700",
  poison: "bg-purple-600",
  ground: "bg-yellow-700",
  flying: "bg-indigo-300",
  psychic: "bg-pink-400",
  bug: "bg-lime-500",
  rock: "bg-amber-700",
  ghost: "bg-indigo-700",
  dragon: "bg-indigo-800",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};
