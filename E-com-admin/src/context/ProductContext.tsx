import { createContext, useState } from "react";
import type { ProductData } from "../../types/ProductData";

const ProductContext = createContext<{
  products: ProductData[];
  addProduct: (product: ProductData) => boolean;
} | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductData[]>(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const addProduct = (product: ProductData): boolean => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    return true;
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
