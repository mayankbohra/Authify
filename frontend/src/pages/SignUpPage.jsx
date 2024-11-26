import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Loader, Mail, User, Lock, Users } from 'lucide-react';

import Input from '../components/Input';
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from '../store/authStore';

const SignUpPage = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState('user'); // Default to 'user'

    const navigate = useNavigate();

    const { signup, error, isLoading } = useAuthStore();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await signup(email, password, name, role);
            navigate('/verify-email');
        } catch (error) {
            console.error(error);
        }
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
                    Create Account
                </h2>

                <form onSubmit={handleSignUp}>
                    <Input
                        Icon={User}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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

                    {/* Improved Role selection field with gap */}
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Users className="size-5 text-cyan-400" />
                        </div>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-800 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-500 transition duration-200"
                        >
                            <option value="user">User</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                    <PasswordStrengthMeter password={password} />

                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
                    </motion.button>
                </form>
            </div>
            <div className="px-8 py-4 bg-gradient-to-t from-gray-800 to-gray-700 flex justify-center">
                <p className="text-sm text-gray-300">
                    Already have an account?{' '}
                    <Link to="/login" className="text-pink-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default SignUpPage;
