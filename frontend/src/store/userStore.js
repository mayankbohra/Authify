import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/user" : "/api/user";

axios.defaults.withCredentials = true;

export const useUserStore = create((set) => ({
    users: [],
    managers: [],
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/admin/dashboard`);
            set({ users: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error fetching users", isLoading: false });
        }
    },

    fetchManagers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/manager/dashboard`);
            set({ managers: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error fetching managers", isLoading: false });
        }
    },

    fetchUserProfile: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/user/${id}`);
            set({ currentUser: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error fetching user profile", isLoading: false });
        }
    },

    deleteUser: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(`${API_URL}/admin/delete/${id}`);
            set((state) => ({
                users: state.users.filter(user => user._id !== id),
                managers: state.managers.filter(manager => manager._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Error deleting user", isLoading: false });
        }
    },
}));
