import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Loader from "../components/Loader";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { user, signup, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from || "/", { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await signup(
      formData.name,
      formData.email,
      formData.password
    );

    if (success) {
      navigate("/login");
    } else {
      setErrors((prev) => ({
        ...prev,
        api: "Signup failed. Email may already be in use.",
      }));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="relative bg-gray-800 p-10 mt-2 mb-16 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500 rounded-full opacity-10"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join us and start your journey</p>
          </div>

          {/* API error */}
          {errors.api && (
            <div className="mb-4 text-sm text-red-400 text-center bg-red-500/10 p-2 rounded-md border border-red-400/30">
              {errors.api}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-3 bg-gray-700 border ${errors.name ? "border-red-500" : "border-gray-600"} rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-0`}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className={`w-full px-4 py-3 bg-gray-700 border ${errors.email ? "border-red-500" : "border-gray-600"} rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-0`}
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                className={`w-full px-4 py-3 bg-gray-700 border ${errors.password ? "border-red-500" : "border-gray-600"} rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-0`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={`w-full px-4 py-3 bg-gray-700 border ${errors.confirmPassword ? "border-red-500" : "border-gray-600"} rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-0`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-sm text-red-400 mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4 mb-6">
            <button className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600">
              <span className="text-white">G</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600">
              <span className="text-white">F</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600">
              <span className="text-white">T</span>
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
