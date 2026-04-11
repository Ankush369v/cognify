import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="inline-flex items-center justify-center p-6 bg-red-500/10 rounded-full mb-8"
                >
                    <AlertCircle className="w-16 h-16 text-red-500" />
                </motion.div>

                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-slate-300 mb-6">Page Not Found</h2>
                <p className="text-slate-500 max-w-md mx-auto mb-10">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                <Link to="/" className="btn-primary inline-flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
