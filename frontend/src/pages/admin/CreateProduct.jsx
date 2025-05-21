import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminProductStore from "../../store/useAdminProductStore";
import Loader from "../../components/Loader";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { createProduct, loading } = useAdminProductStore();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    inStock: 0,
    brand: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      navigate("/admin/products");
    } catch (err) {
      setError("Failed to create product. Please try again.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Create New Product</h2>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4 shadow">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: "Product Name", name: "name", type: "text" },
          { label: "Brand", name: "brand", type: "text" },
          { label: "Category", name: "category", type: "text" },
          { label: "Image URL", name: "image", type: "text" },
          { label: "Description", name: "description", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "In Stock", name: "inStock", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-gray-700 font-medium mb-1">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={form[field.name]}
              onChange={handleChange}
              required={field.name !== "inStock"}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`Enter ${field.label}`}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
