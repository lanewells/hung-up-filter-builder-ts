import { z } from "zod"

const SortModeSchema = z.enum([
  "price-asc",
  "price-desc",
  "name-asc",
  "name-desc"
])

const PresetSchema = z.object({
  drawer: z.enum([
    "All",
    "Tops",
    "Bottoms",
    "One-pieces",
    "Outerwear",
    "Shoes",
    "Accessories"
  ]),
  onlyFavorites: z.boolean(),
  maxPrice: z.number(),
  sortMode: SortModeSchema.optional().default("price-asc")
})

export type Preset = z.infer<typeof PresetSchema>

const KEY = "hung-up-filter-preset-v1"

export function savePreset(preset: Preset): void {
  localStorage.setItem(KEY, JSON.stringify(preset))
}

export function loadPreset(): Preset | null {
  const raw = localStorage.getItem(KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    return PresetSchema.parse(parsed)
  } catch {
    return null
  }
}
