/** Common saree colour options for admin + storefront */
export const PRODUCT_COLOR_PRESETS = [
  { name: "As shown", hex: "#EDE6D8" },
  { name: "Red", hex: "#8B1538" },
  { name: "Maroon", hex: "#6B1D2A" },
  { name: "Green", hex: "#1F6B5C" },
  { name: "Gold", hex: "#C9A962" },
  { name: "Blue", hex: "#1B2A4A" },
  { name: "Pink", hex: "#D4648A" },
  { name: "Orange", hex: "#D97706" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Purple", hex: "#6B21A8" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#F5F5F0" },
  { name: "Beige", hex: "#D4C4A8" },
] as const;

export function isAsShownColor(name: string) {
  return name.trim().toLowerCase() === "as shown";
}
