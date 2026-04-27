import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Home from "../component/Home";
import Login from "../component/Login";
import SignUp from "../component/SignUp";
import Detail from "../component/Details";
import ProtectedRoutes from "../component/ProtectedRoutes";
import type { UserData } from "../types/UserData";
import CheckOut from "../component/CheckOut";

function App() {
  const [userState, setUserState] = useState<UserData | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? (JSON.parse(saved) as UserData) : null;
  });

  const navigate = useNavigate();

  const handleLogin = (userData: UserData) => {
    const updatedUser = { ...userData, Login: true };
    setUserState(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate("/home");
  };

  const handleLogout = () => {
    const updatedUser = { ...userState, Login: false };
    setUserState(updatedUser as UserData);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignUp onSignup={handleLogin} />} />

      {userState?.Login === true ? (
        <Route
          element={<ProtectedRoutes user={userState} onLogout={handleLogout} />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/home/details/:id" element={<Detail />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
      <Route path="home/checkout" element={<CheckOut />} />
    </Routes>
  );
}

export default App;
