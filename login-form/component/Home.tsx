import Navbar from "../component/Navbar";
import Card from "../component/Card";
import data from "../data/data.json";
import { useState, useEffect } from "react";
interface MousePosition {
  x: number;
  y: number;
}

function Home() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const allItems = Object.keys(data).flatMap(
    (category) => data[category as keyof typeof data],
  );
  const [slider, setSlider] = useState(0);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleNext = () => {
    setSlider((prev) => (prev + 1) % 8);
  };
  const handlePrev = () => {
    setSlider((prev) => (prev - 1 + 8) % 8);
  };

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <main className="">
        <div
          className="pointer-events-none fixed rounded-full bg-teal-600 z-40 border-2 border-green-500"
          style={{
            left: position.x - 20,
            top: position.y - 20,
            width: 40,
            height: 40,
            transition: "left 0.15s ease, top 0.15s ease",
          }}
        />
        <section id="home" className="min-h-screen">
          <Navbar />
        </section>

        <section id="collection" className="min-h-screen px-5">
          <h1 className="text-xl font-bold mb-5">Collection</h1>
          <div className="flex flex-wrap gap-4 px-18">
            {allItems

              .filter((filter) => filter.type === "Formal")
              .slice(0, 8)
              .map((item) => (
                <Card
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  cat={item.category}
                />
              ))}
          </div>
        </section>

        <section
          id="new"
          className="flex flex-col items-start justify-start gap-4 mt-20 px-5 mb-30"
        >
          <h1 className="text-xl font-bold mb-5">New This week</h1>
          <div className="flex items-center gap-2">
            <button className="btn-primary" onClick={handlePrev}>
              &lt;
            </button>
            <div className="flex flex-nowrap overflow-hidden gap-2 mt-10 px-10 w-full">
              {allItems.slice(slider, slider + 4).map((item) => (
                <Card
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  cat={item.category}
                />
              ))}
            </div>
            <div className="flex items-center gap-2"></div>
            <button className="btn-primary" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
