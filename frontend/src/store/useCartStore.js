import { create } from "zustand";

// Function to load cart from localStorage
const loadCart = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return []; // Return an empty cart if JSON parsing fails
  }
};


const useCartStore = create((set, get) => ({
  cart: loadCart(), // Load cart on app start

  addToCart: (product) => {
    
    const existingCart = get().cart;
    const existingItem = existingCart.find((item) => item._id === product._id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) => 
        item._id === product._id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      
    } else {
      updatedCart = [ ...existingCart, { ...product, quantity: product.quantity }];
    }

    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
    
  },

  removeFromCart: (id) => {
    const updatedCart = get().cart.filter((item) => item._id !== id);
    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  },

  increaseQuantity: (id) => {
    const updatedCart = get().cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  },

  decreaseQuantity: (id) => {
    const updatedCart = get().cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("cart"); // Clear cart from localStorage
  },
}));

export default useCartStore;
