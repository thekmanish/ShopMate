import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCheckoutStore = create(
  persist(
    (set) => ({
      proceedToShipping: false,
      allowShippingAccess: (allowed) => set({ proceedToShipping: allowed }),

      shippingDetails: {
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
      },
      setShippingDetails: (details) => set({ shippingDetails: details }),

      paymentMethod: "",
      setPaymentMethod: (method) => set({ paymentMethod: method }),

      proceedToPayment: false,
      allowPaymentAccess: (allowed) => set({ proceedToPayment: allowed }),
    }),
    {
      name: "checkout-storage", // sessionStorage/localStorage me yeh key banegi
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);

export default useCheckoutStore;
