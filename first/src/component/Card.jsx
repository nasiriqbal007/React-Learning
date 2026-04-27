import { useState } from "react";

function Card({ data }) {
  const [count, setCount] = useState(0);
  function handleInc() {
    setCount(count + 1);
    setCount(count + 1);
  }
  function handleDec() {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  return (
    <article className="card">
      <header className="card-title">{data.title}</header>
      <img src={data.img} alt="Card image"></img>
      <p className="desc">{data.desc}</p>
      <h3> {data.price}</h3>
      <div className="counter">
        <button onClick={handleDec}>-</button>
        <p>{count}</p>
        <button onClick={handleInc}>+</button>
      </div>
    </article>
  );
}
export default Card;
