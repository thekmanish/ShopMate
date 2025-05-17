import {create} from "zustand";
import api from "../utils/api.js";

const useAdminUserStore = create ((set) => ({
    users: [],
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({loading: true});
        try {
            const {data} = await api.get("/admin/users");
            set({users: data});
        } catch (err) {
            console.error(err.message)
        } finally{
            set({loading: false})
        }
    },

    deleteUser : async ( _id ) => {
        set({loading: true});
        try {
          await api.delete("/admin/users", {
            data: { _id }
          });

          set((state) => ({
            users: state.users.filter((user) => user._id !== _id),
          }));
        } catch (err) {
          set({error: err.message || "User deletion failed !"});
          console.error(err.message);        
        } finally {
          set({loading: false})
        }

    },
}));

export default useAdminUserStore;