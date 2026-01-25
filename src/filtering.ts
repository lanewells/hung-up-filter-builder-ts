import type { Filter, WardrobeItem } from "./types"

export function applyFilters(
  items: WardrobeItem[],
  filters: Filter[]
): WardrobeItem[] {
  return filters.reduce((result, filter) => {
    switch (filter.kind) {
      case "drawer":
        return result.filter((item) => item.drawer === filter.drawer)

      case "favorite":
        return result.filter((item) => item.favorite === filter.value)

      case "price":
        return result.filter(
          (item) => item.price_usd >= filter.min && item.price_usd <= filter.max
        )

      default: {
        return result
      }
    }
  }, items)
}
