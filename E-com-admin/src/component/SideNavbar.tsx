import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { BRANDS } from "../../types/ProductData";
import { useEffect } from "react";

function SideNavbar({ onClose }: { onClose?: () => void }) {
  const [searchParams] = useSearchParams();
  const currentBrand = searchParams.get("brand");
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !searchParams.get("brand") &&
      BRANDS.length > 0 &&
      searchParams.get("type")
    ) {
      navigate(
        `/home?brand=${BRANDS[0].toLowerCase()}&type=${searchParams.get("type")}`,
      );
    }
  }, []);

  const getBrandLink = (brandName: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("brand", brandName.toLowerCase());
    return `/home?${params.toString()}`;
  };

  return (
    <aside className="w-full md:w-48 bg-(--greyColor) p-6 border-r border-(--secondary-color) md:border-r h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Brands</h2>

        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-xl hover:text-(--accent-color) transition"
            aria-label="Close brands menu"
          >
            ✕
          </button>
        )}
      </div>

      <div className="space-y-2">
        {BRANDS.map((item) => {
          const brandValue = item.toLowerCase();

          return (
            <NavLink
              key={item}
              to={getBrandLink(brandValue)}
              onClick={onClose}
              className={() =>
                `block w-full text-left px-4 py-2 rounded transition-colors ${
                  currentBrand === brandValue
                    ? "bg-(--accent-color) text-white font-semibold"
                    : "hover:bg-(--accent-hover) hover:text-(--secondary-color)"
                }`
              }
            >
              {item}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}

export default SideNavbar;
