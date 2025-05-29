// app/api/pokemon/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const list = data.results.map(
    (pokemon: { name: string; url: string }, i: number) => ({
      ...pokemon,
      id: i + 1,
    })
  );

  return NextResponse.json(list);
}
