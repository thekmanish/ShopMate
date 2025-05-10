import { create } from "zustand";
import api from "../utils/api";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  setUser: (user) => set({user}),

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await api.post("/users", { email, password });
      toast.success("Logged in successfully !!");
      const { user, token } = response.data;
      
      localStorage.setItem("token", token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      set({ user, token, loading: false });
      return true;

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({
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

  checkAuth: async () => {
    set({loading: true});
    try {
      const res = await api.get("/users");
      set({ user: res.data.userDetails });
    } catch (error) {
      set({ user: null })
    } finally {
      set({loading: false});
    }
  },

  signup: async (name, email, password) => {
    set({loading: true});
    try {
      const res = await api.post("/users/signup", {name, email, password});
      toast.success("User created successfully");
      return true;
    } catch (error) {
      set({error: error.response?.data?.message || error.message});
      toast.error(error.message);
      return false;
    } finally {
      set({loading: false})
    }
  }
}));

export default useAuthStore;
