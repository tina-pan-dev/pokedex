# Pokedex App

This is a responsive, performant Pokedex web app built with **Next.js 13 Pages Router**, **TypeScript**, and **Tailwind CSS**. It showcases the original 151 Pokemon with server-rendered data, dynamic detail pages, search, sorting, and more.

## 🧱 Tech Stack

- [Next.js 13+ (App Router)](https://nextjs.org/docs/app)
- TypeScript
- Tailwind CSS
- PokéAPI (https://pokeapi.co)
- Server-side rendering (SSR) + static generation
- React hooks + memoization

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
```

## 🧠 Developer Notes

- **Types**: Strong typing used throughout (`Pokemon`, `PokemonType`, etc).
- **Fetching**: Data is fetched server-side using async server components for better performance and SEO.
- **Fallbacks**: If detail fetch fails, it gracefully returns a fallback with empty types.
- **Performance**: Used `useMemo` to avoid unnecessary re-renders during sorting and filtering.
- **Styling**: Types use a centralized `typeColors` utility for consistent color-coding across views.
- **Pagination**: The example apps provided used a "Load more Pokemon" button instead of traditional pagination, so I chose to follow the same approach.

## 🧪 Improvements

While some features were not implemented due to the nature of server-side data fetching, they could enhance UX in a more dynamic app:

- [ ] **Skeleton loading states** – Not strictly required here since data is fetched server-side, but could be useful for future client-side transitions.
- [ ] **Global state (e.g., Zustand)** – Unnecessary in this case as sorting and search state are local and lightweight, but would be helpful in more complex or multi-page flows.
- [ ] **Accessibility audit** – Further improvements could be made, especially around `aria-*` attributes.
- [ ] **Testing** – Given more time, unit and integration tests could be added to cover search, filtering, and rendering logic.
