import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative z-10 border-t border-white/10 bg-slate-950/50 backdrop-blur-xl mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                                <BrainCircuit className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white font-outfit">
                                Cognify
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Empowering students and professionals with AI-driven study tools. Master any subject, faster.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase opacity-80">Platform</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link to="/features" className="hover:text-white hover:translate-x-1 transition-all inline-block">Features</Link></li>
                            <li><Link to="/models" className="hover:text-white hover:translate-x-1 transition-all inline-block">AI Models</Link></li>
                            <li><Link to="/dashboard?tab=create" className="hover:text-white hover:translate-x-1 transition-all inline-block">AI Studio</Link></li>
                            <li><Link to="/dashboard?tab=overview" className="hover:text-white hover:translate-x-1 transition-all inline-block">My Library</Link></li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase opacity-80">Support & Legal</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link to="/documentation" className="hover:text-white hover:translate-x-1 transition-all inline-block">Documentation</Link></li>
                            <li><Link to="/privacy" className="hover:text-white hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-white hover:translate-x-1 transition-all inline-block">Terms of Service</Link></li>
                            <li><a href="mailto:support@cognify.ai" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact Support</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase opacity-80">Stay Updated</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Get the latest updates and AI study tips directly in your inbox.
                        </p>
                        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                                />
                            </div>
                            <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-slate-500 text-xs">
                        &copy; {new Date().getFullYear()} Cognify AI. Empowering visual learning with Multi-Modal AI.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-500">
                        <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms</Link>
                        <span className="text-slate-700">|</span>
                        <span className="text-slate-500 flex items-center gap-1.5">
                            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Professionals
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
