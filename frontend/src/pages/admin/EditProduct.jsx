import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import useAdminProductStore from "../../store/useAdminProductStore";
import Loader from "../../components/Loader";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editProduct, loading } = useAdminProductStore();

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
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setForm({
          name: data.name,
          price: data.price,
          image: data.image,
          description: data.description,
          category: data.category,
          inStock: data.inStock,
          brand: data.brand,
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found or failed to fetch.");
      } finally {
        setLocalLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProduct(id, form);
    navigate("/admin/products");
  };

  if (localLoading || loading) return <Loader />;

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-4">
        <p className="bg-red-100 text-red-600 p-3 rounded shadow">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Edit Product</h2>
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
              required={field.name !== "inStock"} // optional for inStock
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`Enter ${field.label}`}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
