![Wardrobe Filter Builder header](/public/assets/screenshots/screenshot-header.jpg)

### Hung-Up:

# Wardrobe Filter Builder

_Wardrobe Filter Builder_ is a React and TypeScript demo built as a companion to my full stack app, _Hung-Up_. It simulates a realistic product feature where users can filter, sort, and save presets to browse through their wardrobe.

My goal is not quantity, but to model a state focused UI problem in a way that stays predictable, readable, and easy to extend. The interface and interaction patterns are designed to stay consistent with the original _Hung-Up_ app while remaining fully independent of backend concerns.

This project highlights frontend architecture, state modeling, and UI behavior in isolation.

[Wardrobe Filter Builder demo](https://filter-builder.delaneywells.dev) •
[Hung-Up repo](https://github.com/lanewells/hung-up-react) •
[Hung-Up live site](https://hung-up-demo.delaneywells.dev)

---

## Features / MVP

- Filter items by category, price range, and favorites
- Sort by name or price in ascending or descending order
- Save and load filter and sort presets using localStorage
- Responsive layout down to 480px
- Reusable display card component for wardrobe items

---

## Technical Highlights

- React with TypeScript in strict mode
- Discriminated unions for filter state modeling
- Pure filtering and sorting utilities decoupled from the UI
- Derived state using useMemo
- Component based architecture without UI frameworks or heavy dependencies

These choices reflect how I structure real product features, with explicit state and clear separation between logic and presentation.

---

## Screenshots

![Desktop view](/public/assets/screenshots/screenshot-default.jpg)
Desktop view showing filters in their default state with item grid

![Desktop view](/public/assets/screenshots/screenshot-sort.jpg)
Desktop view showing sort controls

![Mobile view](/public/assets/screenshots/screenshot-mobile-reset.jpg) ![Mobile view](/public/assets/screenshots/screenshot-mobile-load.jpg)
Mobile views with single column layout and condensed controls

---

## Architecture Notes & Code Example

A main goal of this project was to keep filtering logic independent from the UI. I modeled the filters as a discriminated union, which makes each filter type explicit and type safe. The filtering function itself is a pure utility that can be reused, tested, or moved to the server side later.

```ts
import type { Filter, WardrobeItem } from "../types"

function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`)
}

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

      default:
        return assertNever(filter)
    }
  }, items)
}
```

The assertNever guard enforces exhaustiveness. If I add a new filter type in the future, TypeScript forces it to be handled here. This keeps the feature safe to extend without risking bugs that I may not catch as they happen.

---

## Stretch Goals

- Integrate this feature directly into the original _Hung-Up_ app
- Add search by brand or color
- Replace localStorage with server-backed persistence

---

## Why This Project

Wardrobe Filter Builder is intentionally small but complete.
It prioritizes finished behavior and thoughtful UI details, with clear and easily extendable code.
It's designed as an independent feature with clear real world applications.
It reflects how I approach frontend work in production environments.

Delaney Wells 2026
