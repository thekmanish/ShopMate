import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  // Function to set user and token on login
  login: (userData, token) => set({ user: userData, token: token }),

  // Function to clear user and token on logout
  logout: () => set({ user: null, token: null }),
}));



export default useAuthStore;
