// __tests__/PokemonCard.test.tsx
import { Pokemon } from "../src/components/HomePage";
import { PokemonCard } from "../src/components/PokemonCard";
import { render, screen } from "@testing-library/react";

const mockPokemon: Pokemon = {
  id: 1,
  name: "bulbasaur",
  url: "",
  types: [
    { slot: 1, type: { name: "grass", url: "" } },
    { slot: 2, type: { name: "poison", url: "" } },
  ],
};

test("renders Pokémon name, ID and type tags", () => {
  render(<PokemonCard pokemon={mockPokemon} />);

  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText("#0001")).toBeInTheDocument();
  expect(screen.getByText("grass")).toBeInTheDocument();
  expect(screen.getByText("poison")).toBeInTheDocument();
});
