import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const isLoading = false;

    const handleChange = (index, value) => {
        const newCode = [...code];

        if (value.length === 1) {
            newCode[index] = value;
            setCode(newCode);

            if (index < 5 && value) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        const newCode = [...code];
        pasteData.split("").forEach((char, index) => {
            newCode[index] = char || "";
        });
        setCode(newCode);

        // Automatically focus the next input field after the last filled one
        const lastFilledIndex = pasteData.length - 1;
        if (lastFilledIndex < 5) {
            inputRefs.current[lastFilledIndex + 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        alert(`Verification code: ${verificationCode}`);
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
                    Verify Your Email
                </h2>
                <p className="text-center text-gray-300 mb-6">
                    Enter the 6-digit code sent to your email address.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : null} // Handle paste only on the first input
                                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                            />
                        ))}
                    </div>
                    <motion.button
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading || code.some((digit) => !digit)}
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default EmailVerificationPage;
