import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../src/pages/components/HomePage";
import { Pokemon } from "../src/pages/components/HomePage";

const mockList: Pokemon[] = [
  {
    id: 1,
    name: "bulbasaur",
    url: "",
    types: [{ slot: 1, type: { name: "grass", url: "" } }],
  },
  {
    id: 4,
    name: "charmander",
    url: "",
    types: [{ slot: 1, type: { name: "fire", url: "" } }],
  },
];

test("filters Pokemon by name", async () => {
  render(<HomePage initialList={mockList} />);

  const input = screen.getByPlaceholderText(/search by name or number/i);
  fireEvent.change(input, { target: { value: "bulba" } });

  await waitFor(() => {
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
  });
});

test("filters Pokemon by number", async () => {
  render(<HomePage initialList={mockList} />);

  const input = screen.getByPlaceholderText(/search by name or number/i);
  fireEvent.change(input, { target: { value: "4" } }); // Charmander is #4

  await waitFor(() => {
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  });
});
