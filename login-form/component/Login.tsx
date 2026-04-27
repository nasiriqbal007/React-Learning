import { useState } from "react";
import loginImg from "../src/assets/login_img.jpg";
import { Link } from "react-router-dom";
import type { UserData } from "../types/UserData";
type FormData = {
  email: string;
  password: string;
};

type ErrorState = {
  email?: string;
  password?: string;
};

type Props = {
  onLogin: (userData: UserData) => void;
};

function Login({ onLogin }: Props) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [authError, setAuthError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error: ErrorState = {};
    setAuthError("");

    if (!formData.email) {
      error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      error.email = "Email is invalid";
    }
    if (!formData.password) {
      error.password = "Password is required";
    } else if (formData.password.length < 8) {
      error.password = "Password must be at least 8 characters";
    }

    setErrors(error);
    if (Object.keys(error).length > 0) return;

    const saved = localStorage.getItem("user");
    if (saved) {
      const savedUser = JSON.parse(saved);
      if (
        savedUser.email === formData.email &&
        savedUser.password === formData.password
      ) {
        onLogin(savedUser);
        return;
      }
    }
    setAuthError("Invalid email or password.");
  };

  return (
    <div className="flex h-screen w-full">
      <div className="left">
        <img src={loginImg} alt="login" className="auth-img" />
      </div>
      <div className="right flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl font-bold flex flex-col items-start justify-start text-left">
          Welcome Back
          <span className="text-sm font-light text-(--greyColor)">
            please login here
          </span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full max-w-sm mt-4"
        >
          <label className="label">Email Address</label>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="robertfox@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}

          <label className="label">Password</label>
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}

          {authError && (
            <span className="text-sm text-red-500">{authError}</span>
          )}

          <button className="auth-btn" type="submit">
            Login
          </button>

          <p className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-(--primary-color) font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
