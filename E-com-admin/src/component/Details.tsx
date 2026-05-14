import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import ProductContext from "../context/ProductContext";

type Cart = {
  id: string;
  name: string;
  image: string;
  price: number;
  color: string;
  quantity: number;
};

function Detail() {
  const { id } = useParams();

  const products = useContext(ProductContext)?.products || [];
  const [sColor, setColor] = useState<{ name: string; hex: string } | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const item = products.find((i) => String(i.id) === id);

  const addToCart = () => {
    if (!item) return;

    if (!sColor) {
      setError("Please select a color");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      const existingCart = JSON.parse(
        localStorage.getItem("cart") || "[]",
      ) as Cart[];

      const itemIndex = existingCart.findIndex(
        (c) => c.id === String(item.id) && c.color === sColor.name,
      );

      if (itemIndex !== -1) {
        existingCart[itemIndex].quantity++;
      } else {
        const cartItem: Cart = {
          id: String(item.id),
          image: item.imageUrl,
          name: item.name,
          price: item.price,
          color: sColor.name,
          quantity: 1,
        };
        existingCart.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setLoading(false);

      setColor(null);
      setError("");
      console.log(existingCart);
    }, 500);
  };

  const images: string[] = Array(5).fill(item?.imageUrl || "");

  if (!item)
    return (
      <div className="h-full w-full flex items-center justify-center min-h-screen font-extrabold text-2xl text-red-500">
        Item Is Not Found
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] sm:gap-6 md:gap-8 lg:gap-12 px-6">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="relative w-full rounded-lg overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-125 object-cover rounded-lg"
            />
          </div>
        </div>
        {/* MIDDLE */}
        <div className="flex flex-row mt-6 lg:mt-0 lg:flex-col gap-2 sm:gap-3 pb-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={item.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-23 md:h-23 object-cover rounded-md
               cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-300"
            />
          ))}
        </div>

        {/* RIGHT */}
        <div className=" flex flex-col w-full lg:w-72 gap-4 sm:gap-5">
          <h1 className="text-sm lg:text-xl font-bold uppercase">
            {item.name}
          </h1>
          <p className="text-lg font-semibold">${item.price}</p>

          <div className="flex items-center gap-2">
            {item.inStock ? (
              <span className="text-sm font-medium text-green-600">
                ✓ In Stock
              </span>
            ) : (
              <span className="text-sm font-medium text-red-600">
                Out of Stock
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600">{item.description}</p>

          <h3 className="text-bold font-semibold text-gray-800">
            {item.brand} • {item.type}
          </h3>
          {Object.keys(item.specs).length > 0 && (
            <div className="border-t pt-3">
              <p className="text-sm font-medium mb-4">Specifications</p>
              <div className="text-xs text-gray-600 space-y-1">
                {Object.entries(item.specs).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Color */}
          <div>
            <p className="text-sm font-medium mb-2">Color</p>
            <div className="flex gap-2">
              {item.colors.map((c) => (
                <button
                  onClick={() => {
                    setColor(c);
                    setError("");
                  }}
                  key={c.name}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                    sColor?.name === c.name
                      ? "ring-0.6 ring-(--accent-color) border-(--accent-color)"
                      : "border-(--hint-color) hover:border-blue-300"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {error && (
            <span className="text-sm text-(--error-color) font-medium">
              {error}
            </span>
          )}

          <button
            onClick={addToCart}
            disabled={!item.inStock || loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all mt-4 cursor-pointer font-medium"
          >
            {loading
              ? "Adding..."
              : !item.inStock
                ? "Out of Stock"
                : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
