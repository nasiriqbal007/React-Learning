import { createContext, useState } from "react";
import type { UserData } from "../../types/UserData";

const AuthContext = createContext<{
  user: UserData | null;
  onSignup: (user: UserData) => void;
  onLogin: (loginData: {
    email: string;
    password: string;
    role: "user" | "admin";
    login: boolean;
  }) => boolean;
  onLogout: () => void;
}>({
  user: null,
  onSignup: () => {},
  onLogin: () => false,
  onLogout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const getUsers = (): UserData[] => {
    return JSON.parse(localStorage.getItem("users") || "[]") as UserData[];
  };

  const saveUsers = (users: UserData[]): void => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const onSignup = (newUser: UserData) => {
    const allUsers = getUsers();
    allUsers.push(newUser);
    saveUsers(allUsers);
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const onLogin = (loginData: {
    email: string;
    password: string;
    role: "user" | "admin";
    login: boolean;
  }) => {
    const users = getUsers();
    const foundUser = users.find(
      (u) =>
        u.email === loginData.email &&
        u.password === loginData.password &&
        loginData.role === u.role,
    );
    if (foundUser) {
      const updatedUsers = users.map((u) =>
        u.email === foundUser.email ? { ...u, Login: true } : u,
      );
      saveUsers(updatedUsers);
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    const users = getUsers();
    const updatedUsers = users.map((u) => ({ ...u, Login: false }));
    saveUsers(updatedUsers);
  };

  return (
    <AuthContext.Provider value={{ user, onSignup, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
