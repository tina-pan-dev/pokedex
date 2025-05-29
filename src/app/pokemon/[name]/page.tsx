// app/api/pokemon/[name]/page.tsx

import Image from "next/image";
import { typeColors } from "../../typeColors";
import Link from "next/link";

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
}

export async function generateStaticParams() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data: { results: { name: string }[] } = await res.json();

  return data.results.map((pokemon) => ({
    name: pokemon.name,
  }));
}

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);

  if (!res.ok) {
    return <p className="p-6 text-center text-red-600">Pokémon not found.</p>;
  }

  const data: PokemonData = await res.json();

  const paddedId = `#${data.id.toString().padStart(4, "0")}`;
  const image = data.sprites.other["official-artwork"].front_default;
  const types = data.types.sort((a, b) => a.slot - b.slot);
  const stats = data.stats;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link
        href="/"
        className="mb-4 inline-block text-blue-600 hover:underline text-sm"
      >
        ← Back to list
      </Link>
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
          {types.map((t) => (
            <span
              key={t.type.name}
              className={`text-xs px-3 py-1 rounded-full capitalize text-white ${
                typeColors[t.type.name] || "bg-gray-400"
              }`}
            >
              {t.type.name}
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
            {stats.map((s) => (
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
