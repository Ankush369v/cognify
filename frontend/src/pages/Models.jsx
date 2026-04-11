import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MODELS } from '../constants/models';

const Models = () => {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Our <span className="text-indigo-500">Intelligence Engine</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-400"
                    >
                        We use a diverse fleet of state-of-the-art open-source models.
                        Each feature automatically routes your request to the expert model best suited for the job.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MODELS.map((model, index) => (
                        <motion.div
                            key={model.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm hover:border-indigo-500/30 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-2xl ${model.bg}`}>
                                    <model.icon className={`w-8 h-8 ${model.color}`} />
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-slate-800 border border-white/5 text-slate-300`}>
                                    {model.tag}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                {model.name}
                            </h2>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {model.fullDesc}
                            </p>

                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Best For:</h3>
                                <ul className="space-y-2">
                                    {model.bestFor.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                                            <ChevronRight className={`w-4 h-4 ${model.color}`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-white/5 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to test them out?</h3>
                        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                            Head over to the Dashboard and try the "Auto-Select" mode or choose your preferred engine manually.
                        </p>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-indigo-500/25"
                        >
                            Go to Dashboard
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Models;
