import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const isLoading = false;

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate async action
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gradient-to-br from-purple-800 via-gray-900 to-red-800 bg-opacity-95 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
        >
            <div className="p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-transparent bg-clip-text">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin}>
                    <Input
                        Icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        Icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-end mb-4">
                        <Link to="/forgot-password" className="text-sm text-pink-400 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg
                                className="w-6 h-6 animate-spin mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l-3.5 3.5L12 16V12H4z"
                                ></path>
                            </svg>
                        ) : (
                            "Login"
                        )}
                    </motion.button>
                </form>
            </div>
            <div className="px-8 py-4 bg-gradient-to-t from-gray-800 to-gray-700 flex justify-center">
                <p className="text-sm text-gray-300">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-pink-400 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default LoginPage;
