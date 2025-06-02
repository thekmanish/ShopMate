import {create} from "zustand";

const useBuyNowStore = create((set) => ({

    buyNowProduct: null,
    setBuyNowProduct: (product) => set({buyNowProduct: product}),
    clearBuyNowProduct: () => set({buyNowProduct: null})

}));

export default useBuyNowStore;