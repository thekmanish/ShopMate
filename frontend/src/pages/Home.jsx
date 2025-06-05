import React, { useEffect } from "react";
import ProductComponent from "../components/product/ProductComponent";
import useProductStore from "../store/useProductStore";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const Home = () => {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    "Electronics",
    "Men",
    "Women",
    "Grocery",
    "Furniture",
    "Kids",
  ];

  const latest = categories
    .map((cat) => products.find((prod) => prod.category === cat))
    .filter(Boolean);

  const renderSection = (title, filteredProducts, categoryLink) => (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {categoryLink && (
          <Link
            to={`/category/${categoryLink.toLowerCase()}`}
            className="text-sm text-gray-900 font-medium hover:underline"
          >
            View All →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductComponent key={product._id} product={product} />
        ))}
      </div>
    </div>
  );

  if (loading) return <Loader />;
  if (error) return <Message type="error" message={error} />;

  return (
    <div className="container mx-auto pb-16 p-4">
      {/* Scrollable Category Buttons on Mobile */}
      <div className="overflow-x-auto mb-6">
        <div className="flex justify-start sm:justify-center flex-nowrap sm:flex-wrap gap-4 scrollbar-hide">
          {categories.map((category) => (
            <Link
              to={`/category/${category.toLowerCase()}`}
              key={category}
              className="whitespace-nowrap px-4 py-2 bg-gray-700 text-gray-100 rounded-full hover:bg-gray-900 hover:text-white transition"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {renderSection("Latest Products", latest, null)}

      {categories.map((category) => {
        const categoryProducts = products.filter(
          (prod) => prod.category === category
        );
        return renderSection(category, categoryProducts.slice(0, 4), category);
      })}
    </div>
  );
};

export default Home;
