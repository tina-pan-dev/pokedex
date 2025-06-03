# Pokedex App

This is a responsive, performant Pokedex web app built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It showcases the original 151 Pokemon with server-rendered data, dynamic detail pages, search, sorting, and more.

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/docs/app)
- TypeScript
- Tailwind CSS
- PokéAPI (https://pokeapi.co)
- Server-side rendering (SSR)
- React hooks + memoization
- React Testing Library for testing

## ✨ Features

### ✅ MVP

- List of the original 151 Pokémon
- Displays name, number, type(s), and image
- Dynamic detail pages with full data
- Fully responsive layout

### ✨ Extras

- Search by name or number
- Sort by number or name
- Type-based color tags
- Server-side fetching with revalidation
- "Load more" button pagination
- Clearable search input
- Accessible, clean UI with Tailwind CSS

## 📦 Setup

```bash
# Clone the repo
git clone https://github.com/your-username/pokedex-task.git
cd pokedex-task

# Install dependencies
npm install

# Run dev server
npm run dev

# Open in browser
http://localhost:3000

# Run tests
npm test
```

## 🧩 Components

- **`Header`** – Combines search input and sort dropdown in a single responsive control bar.
- **`PokemonCard`** – Renders each Pokémon’s name, image, number, and type tags.
- **`HomePage`** – Handles filtering, sorting, pagination, and renders the list of Pokémon using `Header` and `PokemonCard`.

## 🧠 Developer Notes

- **Types**: Strong typing used throughout (`Pokemon`, `PokemonType`, etc).
- **Fetching**: Data is fetched server-side using async server components for better performance and SEO.
- **Fallbacks**: If fetch fails or a Pokémon is not found, a fallback message is displayed
- **Performance**: Used `useMemo` to avoid unnecessary re-renders during sorting and filtering.
- **Styling**: Types use a centralized `typeColors` utility for consistent color-coding across views.
- **Pagination**: The example apps provided used a "Load more Pokemon" button instead of traditional pagination, so I chose to follow the same approach.
- **Testing**: Includes basic tests for card display, sorting and filtering.

## 🧪 Improvements

While some features were not implemented due to the nature of server-side data fetching, they could enhance UX in a more dynamic app:

- [ ] **Skeleton loading states** – Not strictly required here since data is fetched server-side, but could be useful for future client-side transitions.
- [ ] **Global state (e.g., Zustand)** – Unnecessary in this case as sorting and search state are local and lightweight, but would be helpful in more complex or multi-page flows.
- [ ] **Accessibility audit** – Further improvements could be made, especially around `aria-*` attributes.
- [ ] **Testing** – Given more time, more testing could be done to cover the Pokemon detail page and Load More functionality.
