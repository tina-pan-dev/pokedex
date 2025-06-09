import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

type Pokemon = {
  name: string;
  id: number;
  types: { slot: number; type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
};

type Props = {
  pokemon: Pokemon | null;
};

export default function PokemonPage({ pokemon }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <p className="text-center p-6">Loading...</p>;
  }

  if (!pokemon) {
    return <p className="text-center text-red-600 p-6">Pokémon not found.</p>;
  }

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const paddedId = `#${pokemon.id.toString().padStart(4, "0")}`;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-48 h-48 object-contain"
        />
        <h1 className="text-4xl font-bold capitalize mt-4">{pokemon.name}</h1>
        <p className="text-gray-500">{paddedId}</p>

        <div className="mt-4 flex gap-2">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 rounded-full bg-blue-500 text-white capitalize text-sm"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
        <div>
          <h2 className="font-semibold text-gray-700">Height</h2>
          <p>{pokemon.height / 10} m</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-700">Weight</h2>
          <p>{pokemon.weight / 10} kg</p>
        </div>
        <div className="col-span-2">
          <h2 className="font-semibold text-gray-700">Abilities</h2>
          <ul className="list-disc list-inside">
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name} className="capitalize">
                {a.ability.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <h2 className="font-semibold text-gray-700 mb-2">Base Stats</h2>
          <ul className="space-y-1">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name} className="flex justify-between">
                <span className="capitalize">{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const paths = data.results.map((p: { name: string }) => ({
    params: { name: p.name },
  }));

  return {
    paths,
    fallback: true, // Allow dynamic generation
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${params?.name}`
    );
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();

    const pokemon: Pokemon = {
      name: data.name,
      id: data.id,
      types: data.types,
      stats: data.stats,
      weight: data.weight,
      height: data.height,
      abilities: data.abilities,
    };

    return {
      props: { pokemon },
      revalidate: 60 * 60 * 24, // optional ISR
    };
  } catch {
    return {
      props: { pokemon: null },
    };
  }
};
