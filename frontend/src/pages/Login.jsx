import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);   
    if (success) {
      navigate("/");
    } else {
      console.error("Login failed")
    }
  };
  
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Social Login & Links */}
        <div className="mt-6 text-center">
          <p className="text-sm">Or sign in with</p>
          <div className="flex justify-center mt-3 space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition">
              🔵
            </button>
            <button className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition">
              🔴
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 p-3 rounded-full transition">
              ⚫
            </button>
          </div>
        </div>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
