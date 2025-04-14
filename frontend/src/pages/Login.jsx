import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Loader from "../components/Loader";

export default function Login() {
  // [Keep all existing state and logic unchanged]
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, loading } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from || "/", { replace: true });
    }
  }, [user, navigate, location.state]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);   
    if (!success) {
      console.error("Login failed");
    }
  };
  
  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="relative bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500 rounded-full opacity-10"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-0"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-0"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg"
            >
              {loading ? "Signing in..." : "Sign In"}
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}