import "./DisplayCard.css"
import type { WardrobeItem } from "./types"

type DisplayCardItem = Pick<
  WardrobeItem,
  "id" | "name" | "brand" | "price_usd" | "image_url" | "favorite"
>

function formatPriceUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value)
}

export default function DisplayCard({ item }: { item: DisplayCardItem }) {
  return (
    <article className="card">
      <div className="card-media">
        <img className="card-img" src={item.image_url} alt={item.name} />

        {item.favorite ? (
          <span className="fav" aria-label="Favorite" title="Favorite">
            ★
          </span>
        ) : null}
      </div>

      <div className="card-body">
        <h3 className="card-name">{item.name}</h3>
        <p className="card-brand">{item.brand}</p>
        <p className="card-price">{formatPriceUSD(item.price_usd)}</p>
      </div>
    </article>
  )
}
