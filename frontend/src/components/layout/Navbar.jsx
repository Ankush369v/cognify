import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, BrainCircuit, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    // Mock auth state - in real app this comes from context
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check auth on route change
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (savedUser && savedUser !== 'undefined' && savedUser !== 'null' && token) {
            try {
                const parsedUser = JSON.parse(savedUser);
                if (parsedUser && (parsedUser.id || parsedUser._id)) {
                    setIsAuthenticated(true);
                    setUser(parsedUser);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (e) {
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/features' },
        { name: 'Docs', path: '/documentation' },
        { name: 'Models', path: '/models' },
        ...(isAuthenticated ? [{ name: 'Dashboard', path: '/dashboard' }] : []),
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-white/5' : 'bg-transparent border-transparent'
            }`}>
            <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group relative">
                        <div className="absolute inset-0 bg-indigo-500/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <motion.div
                            className="relative p-2.5 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl border border-white/20 z-10 overflow-hidden shadow-lg shadow-indigo-500/30"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <BrainCircuit className="w-7 h-7 text-white relative z-10" />
                        </motion.div>

                        <div className="flex flex-col z-10 font-outfit">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white tracking-tight">
                                Cognify
                            </span>
                            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.2em] leading-none mt-1 opacity-90">
                                Intelligent Amplified
                            </span>
                        </div>
                    </Link>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex items-center gap-8">
                            {/* Styling improvements to nav links */}
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) => `
                    text-sm font-medium transition-all duration-300 hover:text-white relative py-1 group
                    ${isActive ? 'text-white' : 'text-slate-400'}
                  `}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${link.path === location.pathname ? 'scale-x-100' : ''}`} />
                                </NavLink>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 pl-8 border-l border-white/5">
                            {isAuthenticated && !['/login', '/signup'].includes(location.pathname) ? (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        SignOut
                                    </button>
                                    <Link to="/dashboard" className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/20 ring-2 ring-white/10 hover:ring-indigo-500/50 transition-all transform hover:scale-105">
                                        {user?.username ? user.username.substring(0, 2).toUpperCase() : 'US'}
                                    </Link>
                                </div>
                            ) : !['/login', '/signup'].includes(location.pathname) ? (
                                <>
                                    <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            ) : null}
                        </div>
                    </div>

                    {/* Mobile Menu Button - Keeping mostly same but styled */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-950/95 border-b border-white/10 overflow-hidden backdrop-blur-xl"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => `
                    block text-base font-medium transition-colors p-2 rounded-lg
                    ${isActive ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div className="pt-6 border-t border-white/5 space-y-4">
                                {isAuthenticated && !['/login', '/signup'].includes(location.pathname) ? (
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="w-full flex items-center gap-2 text-slate-300 hover:text-red-400 p-2"
                                    >
                                        <LogOut className="w-4 h-4" /> SignOut
                                    </button>
                                ) : !['/login', '/signup'].includes(location.pathname) ? (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="block text-center text-slate-300 hover:text-white font-medium p-2"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full py-3 text-center text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
