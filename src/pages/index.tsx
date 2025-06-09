import HomePage, { Pokemon } from "../components/HomePage";

type PokemonTypeData = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Props = {
  initialList: Pokemon[];
};

export default function IndexPage({ initialList }: Props) {
  return <HomePage initialList={initialList} />;
}

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();

  const detailedList: Pokemon[] = await Promise.all(
    data.results.map(
      async (pokemon: { name: string; url: string }, index: number) => {
        try {
          const detailRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const detailData = await detailRes.json();
          const types: PokemonTypeData[] = detailData.types;
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: index + 1,
            types,
          };
        } catch {
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: index + 1,
            types: [],
          };
        }
      }
    )
  );

  return {
    props: {
      initialList: detailedList,
    },
    revalidate: 86400, // optional ISR: revalidate every 24 hours
  };
}
