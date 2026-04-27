import { Outlet } from "react-router-dom";
import type { UserData } from "../types/UserData";
import { Link } from "react-scroll";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import Cart from "./Cart";

type Props = {
  user: UserData | null;
  onLogout: () => void;
};

function ProtectedRoutes({ user, onLogout }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserData(user);
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);
  const cartClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="w-full items-center flex flex-row p-4 pl-10 pr-10">
        <nav className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-start gap-4">
            <Link
              className="nav-link"
              to="home"
              smooth={false}
              spy={true}
              offset={0}
              onSetActive={() => window.history.replaceState(null, "", "/home")}
            >
              Home
            </Link>

            <Link
              className="nav-link"
              to="collection"
              spy={true}
              smooth={true}
              offset={0}
              onSetActive={() =>
                window.history.replaceState(null, "", "/collection")
              }
            >
              Collection
            </Link>
            <Link
              className="nav-link"
              to="new"
              spy={true}
              smooth={true}
              offset={0}
              onSetActive={() => window.history.replaceState(null, "", "/new")}
            >
              New
            </Link>
          </div>
          <div className="flex flex-row items-center gap-4 ">
            <button onClick={() => setOpen(true)} className="btn-primary">
              Cart
            </button>
            <button className="btn-primary" onClick={onLogout}>
              Logout
            </button>

            <h1>{userData?.firstName}</h1>
          </div>
        </nav>
      </header>
      <Cart open={open} close={cartClose} />
      <Outlet />

      <Footer email={userData?.email} />
    </>
  );
}

export default ProtectedRoutes;
