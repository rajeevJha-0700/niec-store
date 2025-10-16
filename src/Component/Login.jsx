import { useForm } from "react-hook-form";
import { Auth } from "../Database/Auth.js";
import { useState } from "react";
import { login } from "../Store/Slice/AuthSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = async (data) => {
    try {
      setError("");
      setIsLoading(true);
      
      const session = await Auth.signIn({...data});
      
      if (session.data.session) {
        const userData = await Auth.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      } else {
        setError("You are not registered, please signup");
      }
    } catch (error) {
      console.error("Error while login (ERR:LN1): ", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-12rem)] flex items-center justify-center bg-gradient-to-br from-white to-red-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-red-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-red-600 hover:text-red-700 hover:underline transition-all duration-300"
            >
              Sign up now
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(userLogin)} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.email ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400 focus:shadow-md`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 font-medium animate-pulse">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.password ? "border-red-400" : "border-gray-200"
              } bg-gray-50 text-gray-900 placeholder-gray-400 focus:shadow-md`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 font-medium animate-pulse">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            assign={isLoading ? "Logging in..." : "Login"}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-300 ${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            } flex items-center justify-center gap-2`}
          >
            {isLoading && (
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
