import {create} from "zustand";
import api from "../utils/api";

const useOrderStore = create((set) => ({
    orders: [],
    myOrders: [],
    loading: false,
    error: null,

    fetchOrders: async () => {
        set({loading: true, error: null});
        try {
            const { data } = await api.get("/admin/orders");
            set({orders: data});
        } catch (err) {
            set({error: err.message || "Failed to load the orders"})
            console.error(err.message)
        } finally {
            set({loading: false})
        }
    },

    updatePaymentStatus: async (_id, status) => {
    set({loading: true})
    try {

      const allowedStatuses = ["successful", "failed"];
      if (!allowedStatuses.includes(status)) {
        console.error("Invalid status update attempted:", status);
        return;
      }

      const { data } = await api.put("/admin/orders/payment-status", {
        _id,
        status,
      });

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === _id ? data.updatedOrder : order
        ),
      }));
    } catch (err) {
        set({error: err.message || "Payment status update failed !"})
    } finally {
        set({loading: false})
    }

  },

    markAsDelivered : async ( _id ) => {
        set({loading: true});
        try {
            const { data } = await api.put("/admin/orders", {_id});
            set((state) => ({
                orders: state.orders.map((order) =>
            order._id === _id ? data.updatedStatus : order
            ),
            }));
        } catch (err) {
            set({error: err.message || "Marking as delivered failed"});
        }
    },

    deleteOrder : async ( _id ) => {
        set({loading: true});
        try {
          await api.delete("/admin/orders", {
            data: { _id }
          });

          set((state) => ({
            orders: state.orders.filter((order) => order._id !== _id),
          }));
        } catch (err) {
          set({error: err.message || "Order deletion failed !"});
          console.error(err.message);        
        } finally {
          set({loading: false})
        }
    },

    fetchMyOrders: async () => {
    try {
      set({ loading: true });
      const { data } = await api.get('/orders/my-orders');
      set({ myOrders: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },


}));

export default useOrderStore;