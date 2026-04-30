import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
