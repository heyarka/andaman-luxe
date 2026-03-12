# Andaman Luxe — Premium Island Travel Website

A luxury travel website for the Andaman Islands, built with React, Vite, TypeScript, and Tailwind CSS.

## 🚀 Run Locally (Quick Start)

### Prerequisites

Make sure you have **Node.js 18+** and **npm** installed.
- Check: `node -v` and `npm -v`
- Install Node.js: https://nodejs.org/ (download the LTS version)

### Steps

```sh
# Step 1: Clone the repository
git clone https://github.com/heyarka/andaman-luxe.git

# Step 2: Go into the project folder
cd andaman-luxe

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

### ✅ Open in browser

Once the server starts, open: **http://localhost:8080**

> **Note:** The app runs on port **8080**, not 3000.

The development server supports hot-reload — any file changes you save will instantly appear in the browser without refreshing.

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite** — fast build tool & dev server
- **TypeScript** — type-safe JavaScript
- **Tailwind CSS** — utility-first CSS
- **shadcn/ui** — accessible UI components
- **React Router** — client-side routing
- **Framer Motion** — animations

## 📁 Project Structure

```
src/
├── pages/          # Route pages (Index, Destinations, Book, etc.)
├── components/     # Reusable UI components
├── data/           # Static data (packages, destinations, etc.)
├── hooks/          # Custom React hooks
└── lib/            # Utility functions
```

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at http://localhost:8080 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
