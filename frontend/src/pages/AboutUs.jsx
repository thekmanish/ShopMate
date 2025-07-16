import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-500 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            About Shopmate
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            We believe shopping should be smooth, smart, and delightful — and we’re building exactly that.
          </p>
        </div>

        {/* Vision + Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-3 text-cyan-300">Our Mission</h2>
            <p className="text-gray-300">
              To make online shopping easy, intuitive, and accessible for everyone. We’re dedicated to providing top-quality products with a smooth and secure shopping experience.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-3 text-purple-300">Our Vision</h2>
            <p className="text-gray-300">
              We envision a platform that empowers users to discover and shop effortlessly. Our goal is to set a new standard for modern eCommerce.
            </p>
          </div>
        </div>

        {/* Who We Are Section */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Who We Are</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We are a team of passionate designers, developers, and dreamers working to redefine how online shopping feels. Built with care, powered by technology, and focused on people — Shopmate is here to serve you better.
          </p>
        </div>

        {/* Quote or Highlight */}
        <div className="text-center mt-8">
          <blockquote className="italic text-gray-900 text-lg">
            "Good service is good business." — <span className="text-white font-semibold">Shopmate Team</span>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
