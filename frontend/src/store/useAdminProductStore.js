import { create } from "zustand";
import api from "../utils/api";

const useAdminProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  pageSize: 1,
  pageNumber: 1,

  fetchProducts: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(`/admin/products?page=${page}`);   
      set({
        products: data.allProducts || [],
        pageSize: data.pageSize,
        pageNumber: data.pageNumber,
      });
      
    } catch (err) {
      console.error("Error fetching products:", err);
      set({
        error: err.response?.data?.message || "Failed to fetch products",
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/admin/products`, {
        data: { _id: id },
      });
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));
    } catch (err) {
      console.error("Error deleting product:", err);
      set({
        error: err.response?.data?.message || "Product deletion failed",
      });
    } finally {
      set({ loading: false });
    }
  },

  editProduct: async(_id, updatedData) => {
    set({loading: true});
    try {
        const {data} = await api.put(`/admin/products/${_id}`, updatedData);
        set((state) => ({
            products: state.products.map((product) =>
            product._id === _id ? data.updatedProductStatus : product
            ),
        }))
    } catch (err) {
        console.error(err.message);       
    } finally {
        set({loading: false})
    }
  }
}));

export default useAdminProductStore;
