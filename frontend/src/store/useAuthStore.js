import { create } from "zustand";
import api from "../utils/api";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await api.post("/users", { email, password });

      // console.log(response);
      const { user, token } = response.data;
      // console.log(user);
      

      localStorage.setItem("token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      set({ user, token, loading: false });
      console.log(useAuthStore.getState());
      
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  logout: async () => {
    set({ error: null, loading: true });

    try {
      await api.get("/users/logout");

      localStorage.removeItem("token");
      delete api.defaults.headers.Authorization;
      set({ user: null, token: null, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Logout Failed",
        loading: false,
      });
    }
  },
}));

export default useAuthStore;
