import { useState, useMemo } from "react"
import "./App.css"
import { exampleWardrobe } from "./exampleWardrobe"
import { applyFilters } from "./filtering"
import type { Filter } from "./types"

function App() {
  const [drawer, setDrawer] = useState<
    | "All"
    | "Tops"
    | "Bottoms"
    | "One-pieces"
    | "Outerwear"
    | "Shoes"
    | "Accessories"
  >("All")
  const [onlyFavorites, setOnlyFavorites] = useState(false)

  const filters: Filter[] = useMemo(() => {
    const next: Filter[] = []

    if (drawer !== "All") next.push({ kind: "drawer", drawer })
    if (onlyFavorites) next.push({ kind: "favorite", value: true })

    return next
  }, [drawer, onlyFavorites])

  const filtered = applyFilters(exampleWardrobe, filters)

  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>Hung-Up Filter Builder (TS)</h1>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          margin: "16px 0"
        }}
      >
        <label>
          Drawer{" "}
          <select
            value={drawer}
            onChange={(e) => setDrawer(e.target.value as typeof drawer)}
          >
            <option value="All">All</option>
            <option value="Tops">Tops</option>
            <option value="Bottoms">Bottoms</option>
            <option value="One-pieces">One-pieces</option>
            <option value="Outerwear">Outerwear</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
          </select>
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={onlyFavorites}
            onChange={(e) => setOnlyFavorites(e.target.checked)}
          />
          Only favorites
        </label>
      </div>

      <ul>
        {filtered.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> — {item.brand} — {item.drawer} — $
            {item.price_usd}
            {item.favorite ? " ★" : ""}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
