import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import useProductStore from "../store/useProductStore";
import ProductComponent from "../components/product/ProductComponent";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  const filtered = products.filter(
    (prod) => prod.category.toLowerCase() === categoryName.toLowerCase()
  );

  const categories = [
    "Electronics",
    "Men",
    "Women",
    "Grocery",
    "Furniture",
    "Kids",
  ];

  if (loading) return <Loader />;
  if (error) return <Message type="error" message={error} />;

  return (
    <div className="container mx-auto p-4 pb-16">
      {/* Scrollable Category Links */}
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex md:justify-center md:flex-wrap gap-4 w-max md:w-full px-4">
          {categories.map((category) => (
            <NavLink
              to={`/category/${category.toLowerCase()}`}
              key={category}
              className={({ isActive }) =>
                `whitespace-nowrap px-4 py-2 rounded-full transition font-medium ${
                  isActive
                    ? "bg-yellow-300 text-black"
                    : "bg-gray-700 text-gray-100 hover:bg-gray-900 hover:text-white"
                }`
              }
            >
              {category}
            </NavLink>
          ))}
        </div>
      </div>

      <h1 className="text-2xl font-bold capitalize mb-6">
        {categoryName} Products
      </h1>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductComponent key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
