import {
  Navigate,
  NavLink,
  Outlet,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import Footer from "./Footer";
import { useState, useContext, useEffect } from "react";
import Cart from "./Cart";
import AuthContext from "../context/AuthContext";
import { PRODUCT_TYPES, BRANDS } from "../../types/ProductData";
import SideNavbar from "./SideNavbar";
import Drawer from "../utility/Drawer";

function ProtectedRoutes() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState<"cart" | "sidebar" | false>(false);
  const isCartOpen = isOpen === "cart";
  const isSidebarOpen = isOpen === "sidebar";

  const { user, onLogout } = useContext(AuthContext);

  useEffect(() => {
    const hasType = searchParams.get("type");
    const hasBrand = searchParams.get("brand");

    if (!hasType && PRODUCT_TYPES.length > 0) {
      const typeParam = PRODUCT_TYPES[0].toLowerCase();
      const brandParam =
        hasBrand || (BRANDS.length > 0 ? BRANDS[0].toLowerCase() : "");
      navigate(`/home?type=${typeParam}&brand=${brandParam}`);
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const getTypeLink = (typeValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", typeValue.toLowerCase());
    return `/home?${params.toString()}`;
  };

  const closeDrawer = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-(--background-color) border-b border-(--greyColor) shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div
                onClick={() =>
                  navigate(
                    `/home?type=${PRODUCT_TYPES[0].toLowerCase()}&brand=${BRANDS[0].toLowerCase()}`,
                  )
                }
                className="text-2xl font-bold text-blue-600 border rounded-full w-10 h-10 flex items-center justify-center shrink-0 hover:bg-(--accent-hover) hover:text-(--secondary-color) transition cursor-pointer"
              >
                T
              </div>

              <button
                onClick={() => setOpen("sidebar")}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-(--accent-hover) transition"
                aria-label="Open brands menu"
              >
                <span className="text-xl">☰</span>
              </button>
            </div>

            <nav className="hidden sm:flex flex-wrap items-center gap-4 md:gap-8 justify-start md:justify-center">
              {PRODUCT_TYPES.map((type) => {
                const typeVal = type.toLowerCase();
                return (
                  <NavLink
                    key={type}
                    to={getTypeLink(typeVal)}
                    className={() =>
                      `hover:text-(--accent-hover) font-medium transition cursor-pointer text-sm md:text-base ${
                        searchParams.get("type") === typeVal
                          ? "text-(--accent-color) font-semibold border-b-2 border-(--accent-color)"
                          : ""
                      }`
                    }
                  >
                    {type}
                  </NavLink>
                );
              })}
            </nav>

            <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 md:gap-6 flex-wrap">
              <button
                onClick={() => setOpen("cart")}
                className="relative bg-(--accent-color) text-(--secondary-color) px-3 sm:px-4 md:px-4 py-2 rounded-lg hover:bg-(--accent-hover) transition font-medium text-sm md:text-base"
              >
                Cart
              </button>

              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 border-l pl-3 sm:pl-4">
                <span className="text-(--text-color) font-medium text-sm md:text-base hidden sm:inline">
                  {user?.firstName}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-(--secondary-color) px-3 sm:px-4 md:px-4 py-2 rounded-lg text-sm md:text-base hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <nav className="sm:hidden mt-4 flex  flex-wrap items-center gap-2">
            {PRODUCT_TYPES.map((type) => {
              const typeVal = type.toLowerCase();
              return (
                <NavLink
                  key={type}
                  to={getTypeLink(typeVal)}
                  className={() =>
                    `text-xs px-3 py-1 rounded transition ${
                      searchParams.get("type") === typeVal
                        ? "bg-(--accent-color) text-(--secondary-color) font-semibold"
                        : "bg-(--greyColor) hover:bg-(--accent-hover) text-(--text-color)"
                    }`
                  }
                >
                  {type}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      <Cart open={isCartOpen} close={closeDrawer} />

      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="hidden md:block md:w-48 shrink-0">
          <SideNavbar />
        </div>

        <Drawer open={isSidebarOpen} onClose={closeDrawer}>
          <SideNavbar onClose={closeDrawer} />
        </Drawer>

        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>

      <Footer email={user?.email} />
    </>
  );
}

export default ProtectedRoutes;
