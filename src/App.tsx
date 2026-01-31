import { useState, useMemo } from "react"
import "./App.css"
import { exampleWardrobe } from "./exampleWardrobe"
import { applyFilters } from "./filtering"
import type { Filter } from "./types"
import { loadPreset, savePreset } from "./presets"
import DisplayCard from "./DisplayCard"

type SortMode = "price-asc" | "price-desc" | "name-asc" | "name-desc"

function compareByName(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
}

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
  const [sortMode, setSortMode] = useState<SortMode>("price-asc")

  function handleSave() {
    savePreset({ drawer, onlyFavorites, maxPrice, sortMode })
  }

  function handleLoad() {
    const preset = loadPreset()
    if (!preset) return

    setDrawer(preset.drawer)
    setOnlyFavorites(preset.onlyFavorites)
    setMaxPrice(preset.maxPrice)
    setSortMode(preset.sortMode)
  }

  function handleReset() {
    setDrawer("All")
    setOnlyFavorites(false)
    setMaxPrice(300)
    setSortMode("price-asc")
  }

  const filters: Filter[] = useMemo(() => {
    const next: Filter[] = []

    if (drawer !== "All") next.push({ kind: "drawer", drawer })
    if (onlyFavorites) next.push({ kind: "favorite", value: true })

    next.push({ kind: "price", min: 0, max: maxPrice })

    return next
  }, [drawer, onlyFavorites, maxPrice])

  const filtered = useMemo(
    () => applyFilters(exampleWardrobe, filters),
    [filters]
  )

  const sorted = useMemo(() => {
    const copy = [...filtered]

    copy.sort((a, b) => {
      switch (sortMode) {
        case "price-asc": {
          const byPrice = a.price_usd - b.price_usd
          if (byPrice !== 0) return byPrice
          const byName = compareByName(a, b)
          if (byName !== 0) return byName
          return a.id.localeCompare(b.id)
        }
        case "price-desc": {
          const byPrice = b.price_usd - a.price_usd
          if (byPrice !== 0) return byPrice
          const byName = compareByName(a, b)
          if (byName !== 0) return byName
          return a.id.localeCompare(b.id)
        }
        case "name-asc": {
          const byName = compareByName(a, b)
          if (byName !== 0) return byName
          const byPrice = a.price_usd - b.price_usd
          if (byPrice !== 0) return byPrice
          return a.id.localeCompare(b.id)
        }
        case "name-desc": {
          const byName = compareByName(b, a)
          if (byName !== 0) return byName
          const byPrice = b.price_usd - a.price_usd
          if (byPrice !== 0) return byPrice
          return a.id.localeCompare(b.id)
        }
        default:
          return 0
      }
    })

    return copy
  }, [filtered, sortMode])

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

          <label>
            Sort{" "}
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
            >
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
            </select>
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
          <p className="results-count">{sorted.length} shown</p>
        </div>

        <div className="grid">
          {sorted.map((item) => (
            <DisplayCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
