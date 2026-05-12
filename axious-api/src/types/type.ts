export interface User {
  id: string;
  name: string;

  avatar: string;

  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  inStock: boolean;
  tags: string[];
}
