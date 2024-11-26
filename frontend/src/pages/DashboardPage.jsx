// Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const DashboardPage = () => {
    const { user, logout } = useAuthStore();
    const { users, managers, isLoading, error, fetchUsers, fetchManagers, deleteUser } = useUserStore();

    const handleLogout = () => {
        logout();
    };

    // Fetch data based on role (admin, manager, or user)
    React.useEffect(() => {
        if (user.role === "admin") {
            fetchUsers();
        } else if (user.role === "manager") {
            fetchManagers();
        }
    }, [user]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
        >
            <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
                Dashboard
            </h2>

            <div className="space-y-6">
                {/* Profile Info Section */}
                <motion.div
                    className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-3">Profile Information</h3>
                    <p className="text-gray-200">Name: <span className="font-semibold">{user.name}</span></p>
                    <p className="text-gray-200">Email: <span className="font-semibold">{user.email}</span></p>
                </motion.div>

                {/* Role-based Data Display */}
                {user.role === "admin" || user.role === "manager" ? (
                    <motion.div
                        className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-3">
                            {user.role === "admin" ? "All Users" : "Managers & Users"}
                        </h3>
                        {isLoading ? (
                            <p className="text-gray-300">Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="text-left border-b border-gray-600">
                                            <th className="px-4 py-2 text-pink-400">Name</th>
                                            <th className="px-4 py-2 text-pink-400">Email</th>
                                            <th className="px-4 py-2 text-pink-400">Role</th>
                                            {user.role === "admin" && <th className="px-4 py-2 text-pink-400">Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(user.role === "admin" ? users : managers).map((userData) => (
                                            <tr key={userData._id} className="border-b border-gray-700 hover:bg-gray-700">
                                                <td className="px-4 py-2 text-gray-300">{userData.name}</td>
                                                <td className="px-4 py-2 text-gray-300">{userData.email}</td>
                                                <td className="px-4 py-2 text-gray-300">{userData.role}</td>
                                                {user.role === "admin" && (
                                                    <td className="px-4 py-2">
                                                        <button
                                                            onClick={() => deleteUser(userData._id)}
                                                            className="text-red-500 hover:text-red-700 font-semibold"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>
                ) : null}

                {/* Display for 'user' role */}
                {user.role === "user" && (
                    <motion.div
                        className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-semibold text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-3">Your Dashboard</h3>
                        <p className="text-gray-200">Welcome, <span className="font-semibold">{user.name}</span>!</p>
                        <p className="text-gray-200">Role: <span className="font-semibold">{user.role}</span></p>
                        <p className="text-gray-200">Email: <span className="font-semibold">{user.email}</span></p>
                        {/* You can add any user-specific data or actions here */}
                    </motion.div>
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Logout
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default DashboardPage;
