import { NavLink } from "react-router-dom";
import HeroCard from "../component/HeroCard";
import data from "../data/data.json";

function Navbar() {
  return (
    <nav className="flex w-full flex-col items-start px-10 justify-start gap-4 p-4 bg-gray-100">
      {/* create three men, women,child  */}
      <NavLink
        className="nav-link"
        to="/men"
      >
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>Men</span>
        )}
      </NavLink>
      <NavLink
        className="nav-link"
        to="/women"
      >
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>Women</span>
        )}
      </NavLink>

      <NavLink
        className="nav-link"
        to="/child"
      >
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>Child</span>
        )}
      </NavLink>

      <section className="flex flex-row items-start justify-start gap-10 mt-10 overflow-x-clip">
        <h1 className="text-xl font-bold flex flex-col">
          New Collection
          <span className="text-sm font-light text-(--greyColor)">
            Summer 2026
          </span>
        </h1>

        <div className="pl-30 flex flex-row gap-2">
          {data.men.slice(0, 3).map((item) => {
            return <HeroCard id={item.id} img={item.image} title={item.name} />;
          })}
        </div>
      </section>
      <section>
        <div className="flex items-center px-3 justify-center border rounded-sm bg-(--grey-color) w-full gap-1 hover:bg-gray-300 scale-110 transition-all duration-300 ease-in-out cursor-pointer">
          {/* add arrow forward\ */}

          <button className="text-(--text-color) py-2 px-2 font-medium">
            Go To Shop
          </button>
          <svg
            width="49"
            height="14"
            viewBox="0 0 49 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 6.75H48.25M48.25 6.75L42.25 0.75M48.25 6.75L42.25 12.75"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </section>
    </nav>
  );
}
export default Navbar;
