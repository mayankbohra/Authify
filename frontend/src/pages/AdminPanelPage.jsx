import React from 'react';
import { motion } from 'framer-motion';
import { Loader, Mail, User, Lock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';

const AdminPanelPage = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState('manager');
    const { signup, error, isLoading } = useAuthStore();

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await signup(email, password, name, role);
            navigate('/verify-email');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-6">Admin Panel - Create Manager/Admin</h2>
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
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Users className="text-cyan-400" />
                    </div>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
                    >
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                <motion.button
                    className="mt-4 w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-bold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader className="animate-spin mx-auto" /> : 'Create Account'}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default AdminPanelPage;
