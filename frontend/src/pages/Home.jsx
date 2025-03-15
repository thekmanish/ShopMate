import React, { useEffect } from "react";
import ProductComponent from "../components/product/ProductComponent";
import useProductStore from "../store/useProductStore";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Home = () => {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Latest Products</h1>

      {/* Show Loading State */}
      {loading && <Loader />}

      {/* Show Error Message */}
      {error && <Message type="error" message={error} />}

      {/* Show Products Only If No Loading or Error */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductComponent key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
