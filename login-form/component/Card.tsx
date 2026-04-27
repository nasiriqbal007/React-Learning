import { Link } from "react-router-dom";

type Card = {
  image: string;
  name: string;
  price: number;
  cat: string;
  id: string;
};

function Card({ image, name, price, cat, id }: Card) {
  return (
    <article className=" min-w-64 bg-(--secondary-color) group relative rounded-lg shadow-md flex flex-col overflow-hidden">
      <div className="w-full h-full overflow-hidden group-hover:brightness-50 transition-all duration-300 ">
        <img className="w-full h-56 object-cover" src={image} alt={name} />
      </div>

      <div className="flex flex-col gap-1 p-3">
        <p className="text-xs text-(--grey0color) uppercase tracking-wide">
          {cat}
        </p>
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-sm font-semibold">{name}</h2>
          <span className="text-gray-900 font-bold">${price}</span>
        </div>

        <Link
          to={`/home/details/${id}`}
          className="mt-3 px-4 py-2 text-sm absolute bottom-20 left-1/2 -translate-x-1/2 text-white bg-(--primary-color) rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        >
          Buy Now
        </Link>
      </div>
    </article>
  );
}

export default Card;
