import { useParams } from "react-router-dom";
import data from "../data/data.json";
import { useState } from "react";
type Cart = {
  id: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

function Detail() {
  const { id } = useParams();

  const allItems = Object.keys(data).flatMap(
    (cat) => data[cat as keyof typeof data],
  );
  const [sColor, setColor] = useState<string>("");
  const [sSize, setSize] = useState<string>("");

  const item = allItems.find((i) => String(i.id) === id);
  const [loading, setLoading] = useState<boolean>(false);

  const addToCart = () => {
    if (!item) return;
    setLoading(true);
    setTimeout(() => {
      const existingCart = JSON.parse(
        localStorage.getItem("cart") || "[]",
      ) as Cart[];
      const itemIndex = existingCart.findIndex(
        (c) =>
          c.id === String(item.id) &&
          (sColor === c.color || c.color === item.colors[0].name) &&
          (c.size === sSize || c.size === item.sizes[0]),
      );

      if (itemIndex !== -1) {
        existingCart[itemIndex].quantity++;
      } else {
        const cartItem: Cart = {
          id: item?.id || "",
          image: item.image || "",
          name: item?.name || "",
          price: item?.price || 0,
          color: sColor || item.colors[0].name,
          size: sSize || item.sizes[0],
          quantity: 1,
        };
        existingCart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      setLoading(false);
      console.log(existingCart);
    }, 500);
  };

  const images: string[] = Array(5).fill(item?.image || "");
  if (!item)
    return (
      <div className="h-full w-full flex items-center justify-center min-h-screen font-extrabold text-2xl text-red-500">
        Item Is Not Found
      </div>
    );

  return (
    <div className="w-full flex flex-row gap-10 px-20 py-10 min-h-screen">
      {/* LEFT  */}
      {/* LEFT */}
      <div className="flex-1 flex items-start justify-start sticky top-10">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-150 object-cover rounded-lg"
        />
      </div>
      {/* middle for the images which display different*/}

      <div className=" flex flex-col gap-4">
        {images.map((img) => (
          <img
            src={img}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md border cursor-pointer hover:border-0 hover:ring-2 hover:ring-(--primary-color) transition-all duration-300"
          />
        ))}
      </div>

      {/* RIGHT  */}

      <div className="w-72 flex flex-col gap-4">
        <h1 className="text-xl font-bold uppercase">{item.name}</h1>
        <p className="text-lg font-semibold">${item.price}</p>
        <p className="text-sm text-(--grey-color)">{item.description}</p>
        <h3 className="text-bold font-semibold text-(--text-color)">
          {item.type}
        </h3>
        <div>
          <p className="text-sm font-medium mb-2">Color</p>
          <div className="flex gap-2">
            {item.colors.map((c) => (
              <button
                onClick={() => setColor(c.name)}
                key={c.name}
                className={`w-7 h-7 rounded-full border transition-all duration-300
              ${sColor === c.name ? "ring-2 ring-(--primary-color)" : "hover:ring-2 hover:ring-(--primary-color)"}
    `}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Size</p>
          <div className="flex gap-2">
            {item.sizes.map((size) => (
              <button
                onClick={() => setSize(size)}
                key={size}
                className={`"border px-2 py-1 text-sm rounded
                ${sSize === size ? "bg-(--primary-color) text-white" : "bg-(--secondary-color) text-(--text-color)"}
                hover:bg-black hover:text-white transition-all"
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* for adding button  */}
        <button
          onClick={addToCart}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-all mt-4 cursor-pointer"
        >
          {loading ? "Adding..." : "Add To cart"}
        </button>
      </div>
    </div>
  );
}

export default Detail;
