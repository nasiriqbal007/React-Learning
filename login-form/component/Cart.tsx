import { useState } from "react";
import { Link } from "react-router-dom";

type CartItem = {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

type Props = {
  open: boolean;
  close: () => void;
};

function Cart({ open, close }: Props) {
  const cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]",
  );

  const [cart, setCart] = useState<CartItem[]>(cartItems);
  const increaseQuantity = (id: string, color: string, size: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.color === color && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (id: string, color: string, size: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id &&
      item.color === color &&
      item.size === size &&
      item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const removeItem = (id: string, color: string, size: string) => {
    const remove = cartItems.filter(
      (item) => !(item.id === id && item.color === color && item.size === size),
    );
    setCart(remove);
    localStorage.setItem("cart", JSON.stringify(remove));
  };
  if (!open) return null;

  return (
    <>
      <div
        onClick={close}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      <div className="fixed top-0 right-0 h-full w-100 bg-(--secondary-color) z-50 flex flex-col">
        <div className="flex justify-between items-center px-6 py-5 border-b border-(--grey-color)">
          <h2 className="text-lg font-semibold text-(--text-color)">
            Cart :{" "}
            <span className="text-sm font-light">{cartItems.length}</span>
          </h2>
          <button
            onClick={close}
            className="text-(--grey-color) hover:text-(--text-color) text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* items */}
        <div className="flex flex-col overflow-y-auto flex-1 px-6 py-4 gap-4">
          {cartItems.length === 0 ? (
            <p className="text-sm text-(--grey-color) text-center mt-10">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-(--grey-color) pb-4"
              >
                {/* left */}
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-(--text-color) text-sm">
                    {item.name}
                  </p>
                  <p className="text-xs text-(--grey-color)">
                    {item.color} · {item.size}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id, item.color, item.size)
                      }
                      className="text-xs bg-(--primary-color) text-white px-2 rounded-sm"
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        increaseQuantity(item.id, item.color, item.size)
                      }
                      className="text-xs bg-(--primary-color) text-white px-2 rounded-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* right */}
                <div className="flex flex-col items-end gap-2">
                  <p className="font-semibold text-(--text-color) text-sm">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item.id, item.color, item.size)}
                    className="text-xs text-red-400 hover:text-red-600 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        <div className="px-6 py-5 border-t border-(--grey-color) flex flex-col gap-3">
          <div className="flex justify-between text-(--text-color) font-semibold">
            <span>Total</span>
            <span>
              $
              {cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
              )}
            </span>
          </div>
          <Link
            to="/home/checkout"
            onClick={close}
            className="w-full bg-(--primary-color) text-(--secondary-color) py-3 text-center rounded-lg font-medium hover:opacity-90 transition-all cursor-pointer"
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;
