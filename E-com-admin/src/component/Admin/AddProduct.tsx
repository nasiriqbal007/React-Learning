import {
  BRANDS,
  PRODUCT_TYPES,
  SPEC_OPTIONS,
  AVAILABLE_COLORS,
} from "../../../types/ProductData";

import { useAddProductForm } from "../../custom_hook/useAddProductForm";

function AddProduct() {
  const {
    productData,
    error,
    handleChange,
    handleColor,
    handleSpec,
    handleSubmit,
  } = useAddProductForm();

  
  return (
    <main className="min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add product</h1>

      <section className="mt-8 lg:py-4 lg:px-8 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <div className="flex gap-4 sm:flex-row flex-col">
            <input
              name="name"
              onChange={handleChange}
              className="input-field flex-3"
              type="text"
              placeholder="Product Name"
              value={productData.name}
            />

            {error && (
              <span className="text-sm text-red-500">{error.name}</span>
            )}

            <input
              name="price"
              onChange={handleChange}
              className="input-field flex-1"
              type="number"
              placeholder="Price"
              value={productData.price}
            />
          </div>
          {error && <span className="text-sm text-red-500">{error.price}</span>}
          <div className="flex gap-4 sm:flex-row flex-col">
            <select
              className="input-field"
              name="brand"
              onChange={handleChange}
              value={productData.brand}
            >
              {BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              className="input-field"
              name="type"
              onChange={handleChange}
              value={productData.type}
            >
              {PRODUCT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 sm:gap-4 md:gap-6 md:flex-row flex-col">
            <select
              className="input-field"
              value={productData.specs.Storage || ""}
              onChange={(e) => handleSpec("Storage", e.target.value)}
            >
              <option value="">Select Storage</option>
              {SPEC_OPTIONS.Storage.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              className="input-field"
              value={productData.specs.RAM || ""}
              onChange={(e) => handleSpec("RAM", e.target.value)}
            >
              <option value="">Select RAM</option>
              {SPEC_OPTIONS.RAM.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              className="input-field"
              value={productData.specs.Battery || ""}
              onChange={(e) => handleSpec("Battery", e.target.value)}
            >
              <option value="">Select Battery</option>
              {SPEC_OPTIONS.Battery.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          {error && <span className="text-sm text-red-500">{error.specs}</span>}
          <div className="flex items-center gap-0.5 sm:gap-2 flex-wrap">
            <span className="text-sm font-medium">Color:</span>

            {AVAILABLE_COLORS.map((color) => (
              <div
                key={color.name}
                onClick={() => handleColor(color)}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                  productData.colors.includes(color)
                    ? "border-black scale-110"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
          {error && (
            <span className="text-sm text-red-500">{error.colors}</span>
          )}
          <textarea
            name="description"
            onChange={handleChange}
            className="input-field"
            placeholder="Description"
            value={productData.description}
          />
          {error && (
            <span className="text-sm text-red-500">{error.description}</span>
          )}
          <input
            name="imageUrl"
            onChange={handleChange}
            className="input-field"
            type="url"
            placeholder="Image URL"
            value={productData.imageUrl}
          />
          {error && (
            <span className="text-sm text-red-500">{error.imageUrl}</span>
          )}
          <label className="flex items-center gap-2">
            <input
              name="inStock"
              type="checkbox"
              checked={productData.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>

          <button className="btn-primary self-center" type="submit">
            Add Product
          </button>
        </form>
      </section>
    </main>
  );
}

export default AddProduct;
