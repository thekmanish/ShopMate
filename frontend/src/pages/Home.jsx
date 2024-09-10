import React from "react";
import products from "../products.js";
import Product from "../components/product/Product.jsx";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
          >
            <Product product = {product}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
