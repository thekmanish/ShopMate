import { create } from "zustand";

const useCheckoutStore = create((set) => ({
    shippingDetails: {
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    },
    setShippingDetails: (details) => set({shippingDetails: details})
}))

export default useCheckoutStore;