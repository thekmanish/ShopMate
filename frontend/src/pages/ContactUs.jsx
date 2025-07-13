import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
    // Reset form or handle submission logic
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-500 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-4">
          Contact Us
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Have any questions or feedback? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Your Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Your Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-purple-400 text-gray-900 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
