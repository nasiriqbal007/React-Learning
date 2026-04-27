import Card from "./Card";
import data from "../data/data.js";
function Content() {
  return (
    <main>
      <h1>Content</h1>
      <section className="card-section">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </section>
    </main>
  );
}
export default Content;
