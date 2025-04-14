import { create } from "zustand";

const useCheckoutStore = create((set) => ({
    proceedToShipping: false,
    allowShippingAccess: (allowed) => set({proceedToShipping: allowed}),

    shippingDetails: {
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    },
    setShippingDetails: (details) => set({shippingDetails: details}), 

    paymentMethod: "",
    setPaymentMethod: (method) => set({paymentMethod: method}),

    proceedToPayment: false,
    allowPaymentAccess: (allowed) => set({proceedToPayment: allowed})
    
}))

export default useCheckoutStore;