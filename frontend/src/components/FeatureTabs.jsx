import React from 'react';
import { HelpCircle, Layers, FileText, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    { id: 'generate', label: 'Generate MCQs', icon: HelpCircle, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/50' },
    { id: 'flashcards', label: 'Flashcards', icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/50' },
    { id: 'summaries', label: 'Summarizer', icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10', border: 'hover:border-green-500/50' },
    { id: 'code-tools', label: 'Code Tools', icon: Code2, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'hover:border-pink-500/50' },
];

const FeatureTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10 px-0">
            {features.map((feature) => (
                <motion.button
                    key={feature.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onTabChange(feature.id)}
                    className={`
            relative overflow-hidden rounded-2xl p-4 transition-all duration-300 border
            ${activeTab === feature.id
                            ? 'glass-panel border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                            : `bg-slate-800/40 border-white/5 ${feature.border} hover:bg-slate-800/60`
                        }
          `}
                >
                    <div className="flex flex-col items-center gap-3 relative z-10">
                        <div className={`p-3 rounded-xl transition-colors duration-300 ${feature.bg} ${activeTab === feature.id ? 'bg-white/10 ring-1 ring-white/20' : ''}`}>
                            <feature.icon className={`w-6 h-6 ${feature.color}`} />
                        </div>
                        <span className={`text-sm font-semibold tracking-wide ${activeTab === feature.id ? 'text-white' : 'text-slate-400'}`}>
                            {feature.label}
                        </span>
                    </div>

                    {activeTab === feature.id && (
                        <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    )}
                </motion.button>
            ))}
        </div>
    );
};

export default FeatureTabs;
