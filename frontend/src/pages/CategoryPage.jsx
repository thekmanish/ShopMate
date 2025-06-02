import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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

  if (loading) return <Loader />;
  if (error) return <Message type="error" message={error} />;

  return (
    <div className="container mx-auto p-4 pb-16">
      <h1 className="text-2xl font-bold capitalize mb-6">
        {categoryName} Products
      </h1>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductComponent key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
