import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-800 via-gray-900 to-red-800 flex items-center justify-center relative overflow-hidden">
            {/* Gradient-Themed Loading Spinner */}
            <motion.div
                className="w-16 h-16 border-4 border-t-4 border-t-pink-400 border-purple-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingSpinner;
