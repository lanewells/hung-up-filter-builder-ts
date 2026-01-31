import { useState, useMemo } from "react"
import "./App.css"
import { exampleWardrobe } from "./exampleWardrobe"
import { applyFilters } from "./filtering"
import type { Filter } from "./types"
import { loadPreset, savePreset } from "./presets"
import DisplayCard from "./DisplayCard"

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
  const [maxPrice, setMaxPrice] = useState<number>(300)

  function handleSave() {
    savePreset({ drawer, onlyFavorites, maxPrice })
  }

  function handleLoad() {
    const preset = loadPreset()
    if (!preset) return

    setDrawer(preset.drawer)
    setOnlyFavorites(preset.onlyFavorites)
    setMaxPrice(preset.maxPrice)
  }

  function handleReset() {
    setDrawer("All")
    setOnlyFavorites(false)
    setMaxPrice(300)
  }

  const filters: Filter[] = useMemo(() => {
    const next: Filter[] = []

    if (drawer !== "All") next.push({ kind: "drawer", drawer })
    if (onlyFavorites) next.push({ kind: "favorite", value: true })

    next.push({ kind: "price", min: 0, max: maxPrice })

    return next
  }, [drawer, onlyFavorites, maxPrice])

  const filtered = applyFilters(exampleWardrobe, filters)

  return (
    <main className="app">
      <header>
        <h3>Hung-Up</h3>
        <h1>Filter Builder</h1>

        <div className="controls">
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

          <label className="inline">
            <input
              className="checkbox"
              type="checkbox"
              checked={onlyFavorites}
              onChange={(e) => setOnlyFavorites(e.target.checked)}
            />
            Only favorites
          </label>

          <label className="inline">
            Max price $
            <input
              type="range"
              min={0}
              max={300}
              step={5}
              value={maxPrice}
              style={{
                ["--value" as any]: `${(maxPrice / 300) * 100}%`
              }}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <span className="range-value">{maxPrice}</span>
          </label>

          <div className="buttons">
            <button className="btn-pri" onClick={handleSave}>
              Save preset
            </button>
            <button className="btn-pri" onClick={handleLoad}>
              Load preset
            </button>
            <button className="btn-sec" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </header>

      <section className="results">
        <div className="results-header">
          <h2 className="results-title">Items</h2>
          <p className="results-count">{filtered.length} shown</p>
        </div>

        <div className="grid">
          {filtered.map((item) => (
            <DisplayCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
