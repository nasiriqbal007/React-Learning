import { useState, useContext } from "react";
import ProductContext from "../../src/context/ProductContext";
import {
  BRANDS,
  PRODUCT_TYPES,
  AVAILABLE_COLORS,
} from "../../types/ProductData";
import type { ProductData, SpecType } from "../../types/ProductData";
import { useNavigate } from "react-router-dom";

type FormErrors = {
  name?: string;
  price?: string;
  description?: string;
  imageUrl?: string;
  specs?: string;
  colors?: string;
};

export function useAddProductForm() {
  const navigate = useNavigate();
  const { addProduct } = useContext(ProductContext)!;
  const [error, setError] = useState<FormErrors>({});

  const [productData, setProductData] = useState<ProductData>({
    id: crypto.randomUUID(),
    name: "",
    brand: BRANDS[0],
    type: PRODUCT_TYPES[0],
    price: 0,
    specs: {},
    colors: [],
    description: "",
    imageUrl: "",
    inStock: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setProductData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "price"
            ? Number(value)
            : value,
    }));
  };

  const handleColor = (color: (typeof AVAILABLE_COLORS)[number]) => {
    setProductData((prev) => {
      const exists = prev.colors.some((c) => c.name === color.name);
      return {
        ...prev,
        colors: exists
          ? prev.colors.filter((c) => c.name !== color.name)
          : [...prev.colors, color],
      };
    });
  };

  const handleSpec = (spec: SpecType, value: string) => {
    setProductData((prev) => ({
      ...prev,
      specs: { ...prev.specs, [spec]: value },
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!productData.name.trim()) {
      newErrors.name = "Name required";
    } else if (productData.name.length < 5) {
      newErrors.name = "Min 5 chars";
    }

    if (productData.price <= 0) {
      newErrors.price = "Invalid price";
    } else if (String(productData.price).startsWith("0")) {
      newErrors.price = "Price cannot start with 0";
    }

    if (!productData.description.trim()) {
      newErrors.description = "Description required";
    }

    if (!productData.imageUrl.trim()) {
      newErrors.imageUrl = "Image required";
    }

    if (productData.colors.length === 0) {
      newErrors.colors = "Select color";
    }

    if (Object.keys(productData.specs).length < 3) {
      newErrors.specs = "Select all specs";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const success = addProduct(productData);
    if (success === true) {
      navigate("/admin/products", { replace: true });
    }
    addProduct(productData);

    setProductData({
      id: crypto.randomUUID(),
      name: "",
      brand: BRANDS[0],
      type: PRODUCT_TYPES[0],
      price: 0,
      specs: {},
      colors: [],
      description: "",
      imageUrl: "",
      inStock: false,
    });
  };

  return {
    productData,
    error,
    handleChange,
    handleColor,
    handleSpec,
    handleSubmit,
    setProductData,
  };
}
