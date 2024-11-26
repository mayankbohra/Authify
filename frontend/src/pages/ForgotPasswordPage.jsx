import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl shadow-lg overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text'>
                    Forgot Password
                </h2>

                {isSubmitted ? (
                    <div className='text-center'>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className='w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'
                        >
                            <Mail className='h-8 w-8 text-white' />
                        </motion.div>
                        <p className='text-gray-300 mb-6'>
                            If an account exists for <span className='text-cyan-400'>{email}</span>, you will receive a password reset link shortly.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <p className='text-gray-300 mb-6 text-center'>
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        <Input
                            Icon={Mail}
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                            type='submit'
                        >
                            {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
                        </motion.button>
                    </form>
                )}
            </div>

            <div className='px-8 py-4 bg-gray-800 flex justify-center'>
                <Link to={"/login"} className='text-sm text-cyan-400 hover:text-blue-400 hover:underline flex items-center'>
                    <ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
                </Link>
            </div>
        </motion.div>
    );
};

export default ForgotPasswordPage;
