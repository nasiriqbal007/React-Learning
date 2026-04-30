import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Home from "./component/Home.tsx";
import Contact from "./component/Contact.tsx";
import About from "./component/About.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: (
      <div className="flex flex-col bg-white items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4 text-red-500 ">
          404 - Page Not Found
        </h1>
        <p className="text-lg">Page does not exist...</p>
        <button
          className="mt-6 px-4 py-2 bg-black text-white rounded cursor-pointer hover:bg-gray-800 hover:scale-105 transition-all"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
