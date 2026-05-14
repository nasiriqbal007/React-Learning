import { useState } from "react";

type ProductData = {
  id: string;
  name: string;
  price: string | number;
  type: string;
  inStock: boolean;
};

function Products() {
  const [products, setProducts] = useState<ProductData[]>(
    () => JSON.parse(localStorage.getItem("products") || "[]") as ProductData[],
  );
  const [page, setPage] = useState<number>(0);
  const totalProducts = products.length;
  const PER_PAGE = 5;
  const offSet = page * PER_PAGE;
  const pagination = products.slice(offSet, offSet + PER_PAGE);
  const totalPages = Math.ceil(totalProducts / PER_PAGE);

  const handleDelete = (id: string) => {
    const deleteItem = products.filter((item) => item.id !== id);

    setProducts(deleteItem);
    localStorage.setItem("products", JSON.stringify(deleteItem));
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <p>Total Products: {totalProducts}</p>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-left">
          <thead className="text-sm text-body bg-(--secondary-color)  rounded-base border-default">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pagination.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="btn-primary bg-red-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="">
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={() =>
                setPage((prev) => {
                  if (prev - 3 < 0) {
                    return 0;
                  }
                  return prev - 3;
                })
              }
              disabled={page === 0}
              className="px-4 py-1 border bg-gray-200 border-gray-400 rounded disabled:opacity-50 hover:bg-gray-500"
            >
              Prev
            </button>
            <span>
              {page + 1} of {totalPages}
            </span>
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-1 border bg-gray-200 border-gray-400 rounded disabled:opacity-50 hover:bg-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
