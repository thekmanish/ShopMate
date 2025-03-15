import { create } from 'zustand';
import api from '../utils/api'; // Imported the axios instance

const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/products'); // Uses baseURL from api.js
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/products/${id}`);
      set({ product: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;
