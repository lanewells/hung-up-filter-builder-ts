import { useState } from "react"
import "./App.css"
import { exampleWardrobe } from "./exampleWardrobe"
import { applyFilters } from "./filtering"
import type { Filter } from "./types"

function App() {
  const [count, setCount] = useState(0)

  const filters: Filter[] = [
    { kind: "favorite", value: false },
    { kind: "drawer", drawer: "Bottoms" },
    { kind: "price", min: 0, max: 90 }
  ]

  const filtered = applyFilters(exampleWardrobe, filters)

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Hung-Up Filter Builder (TS)</h1>

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
