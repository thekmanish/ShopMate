import React, { useEffect, useState } from "react";
import useAdminProductStore from "../../store/useAdminProductStore";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const {
    products,
    fetchProducts,
    deleteProduct,
    loading,
    error,
    pageSize,
    pageNumber,
  } = useAdminProductStore();

  const navigate = useNavigate();
  const [page, setPage] = useState(1);


  useEffect(() => {
  fetchProducts(page);
}, [page, fetchProducts]);


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}`)
  };

  const handleCreate = () => {
    navigate("/admin/product/new");
  };

  return (
    <div className="p-6">
      {loading && <Loader/>}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Create New Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  product && (
                    <tr key={product._id} className="border-b text-center">
                      <td className="p-2 border">{product._id}</td>
                      <td className="p-2 border">{product.name}</td>
                      <td className="p-2 border">₹{product.price}</td>
                      <td className="p-2 border">{product.inStock}</td>
                      <td className="p-2 border space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                          onClick={() => handleEdit(product._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">No products found.</td>
                </tr>
              )}

            </tbody>
          </table>

          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: pageSize }, (_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-1 rounded ${
                  page === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProducts;
