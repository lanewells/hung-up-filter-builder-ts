export type Drawer =
  | "Tops"
  | "Bottoms"
  | "One-pieces"
  | "Outerwear"
  | "Shoes"
  | "Accessories"

export type WardrobeItem = {
  id: string
  name: string
  brand: string
  drawer: Drawer
  color: string
  price_usd: number
  favorite: boolean
}
