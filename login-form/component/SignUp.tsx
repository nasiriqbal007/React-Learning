import { useState } from "react";
import signupImg from "../src/assets/signup_img.jpg";
import { Link } from "react-router-dom";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  Login: boolean;
};

type ErrorState = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

type Props = {
  onSignup: (userData: FormData) => void;
};

function SignUp({ onSignup }: Props) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Login: true,
  });
  const [errors, setErrors] = useState<ErrorState>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error: ErrorState = {};

    if (!formData.firstName) error.firstName = "First name is required";
    if (!formData.lastName) error.lastName = "Last name is required";
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

    if (Object.keys(error).length === 0) {
      onSignup(formData);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="left">
        <img className="auth-img" src={signupImg} alt="signup_image" />
      </div>
      <div className="right flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl font-bold flex flex-col items-start gap-1">
          Create New Account
          <span className="text-sm font-light text-(--greyColor)">
            Please enter details
          </span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full max-w-sm mt-4"
        >
          <label className="label">First Name</label>
          <input
            className="input-field"
            type="text"
            name="firstName"
            placeholder="Robert"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="text-sm text-red-500">{errors.firstName}</span>
          )}

          <label className="label">Last Name</label>
          <input
            className="input-field"
            type="text"
            name="lastName"
            placeholder="Fox"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <span className="text-sm text-red-500">{errors.lastName}</span>
          )}

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

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              className="h-4 w-4"
            />
            <label htmlFor="agree" className="text-sm">
              I agree to the terms and conditions
            </label>
          </div>

          <button className="auth-btn" type="submit">
            Sign Up
          </button>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
