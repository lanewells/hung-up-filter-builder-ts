import { useState } from "react"
import "./App.css"
import { exampleWardrobe } from "./exampleWardrobe"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Hung-Up Filter Builder (TS)</h1>

      <ul>
        {exampleWardrobe.map((item) => (
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
