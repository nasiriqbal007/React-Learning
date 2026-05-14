export const BRANDS = [
  "Apple",
  "Samsung",
  "Google",
  "OnePlus",
  "Sony",
] as const;

export const PRODUCT_TYPES = [
  "Smartphone",
  "Laptop",
  "Tablet",
  "Smartwatch",
] as const;

export const SPEC_OPTIONS = {
  RAM: ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB"],
  Storage: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"],
  Battery: ["3000mAh", "4000mAh", "5000mAh", "6000mAh"],
} as const;
export const AVAILABLE_COLORS = [
  { name: "white", hex: "#FFFFFF" },
  { name: "blue", hex: "#3B82F6" },
  { name: "black", hex: "#000000" },
  { name: "red", hex: "#EF4444" },
  { name: "green", hex: "#10B981" },
] as const;

export type SpecType = keyof typeof SPEC_OPTIONS;

export type Brand = (typeof BRANDS)[number];
export type ProductType = (typeof PRODUCT_TYPES)[number];
export type ColorOption = (typeof AVAILABLE_COLORS)[number];

export type ProductData = {
  id: string;
  name: string;
  brand: Brand;
  type: ProductType;
  price: number;
  specs: Partial<Record<SpecType, string>>;
  colors: ColorOption[];
  description: string;
  imageUrl: string;
  inStock: boolean;
};
