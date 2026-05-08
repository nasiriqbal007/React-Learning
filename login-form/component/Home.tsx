import Card from "../component/Card";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ProductContext from "../src/context/ProductContext";

function Home() {
  console.log("render home");
  const products = useContext(ProductContext)?.products || [];

  const [searchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");
  const brandFilter = searchParams.get("brand");
  console.log("Products in Home:", products);
  const filteredProducts = products.filter((p) => {
    const matchType = typeFilter
      ? p.type.toLowerCase() === typeFilter.toLowerCase()
      : true;

    const matchBrand = brandFilter
      ? p.brand.toLowerCase() === brandFilter.toLowerCase()
      : true;
    return matchType && matchBrand;
  });

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-(--background-color) text-(--text-color)">
      <section className="min-h-screen">
        <div>
          <main className="w-full flex">
            <section className="min-h-screen px-5">
              <h1 className="text-sm lg:text-xl font-semibold mb-5 mt-5">
                {typeFilter}/{brandFilter}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    image={item.imageUrl}
                    name={item.name}
                    price={item.price}
                    cat={item.type}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      </section>
    </div>
  );
}

export default Home;
