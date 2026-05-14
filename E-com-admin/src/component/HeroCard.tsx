import { Link } from "react-router-dom";

type HeroCardProps = { img: string; title: string; id: string };

function HeroCard({ img, title, id }: HeroCardProps) {
  return (
    <article className=" min-w-64 bg-(--secondary-color) rounded-lg shadow-md overflow-hidden">
      <div className="group relative w-full h-full overflow-hidden ">
        <img
          src={img}
          alt={title}
          className="w-full h-56 object-cover transition-all duration-300 group-hover:brightness-50"
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

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

export default HeroCard;
