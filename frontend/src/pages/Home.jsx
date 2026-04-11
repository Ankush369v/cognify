/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, Zap, BookOpen, Code2, Sparkles, ArrowRight, BarChart2, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TiltCard = ({ children, onClick, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`relative transform-gpu perspective-1000 ${className}`}
        >
            <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
            {/* Glare Effect */}
            <motion.div
                style={{
                    opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.2]),
                    background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), transparent 80%)`,
                    pointerEvents: "none",
                    position: "absolute",
                    inset: 0,
                    zIndex: 20,
                    mixBlendMode: "overlay",
                }}
            />
        </motion.div>
    );
};

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state

    useEffect(() => {
        // Check if user is logged in (simulated)
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleFeatureClick = (featureId) => {
        if (isLoggedIn) {
            navigate(`/dashboard?tab=create&tool=${featureId}`);
        } else {
            navigate('/login');
        }
    };

    const features = [
        { id: 'generate', label: 'Generate MCQs', icon: Sparkles, desc: "Create mostly accurate multiple choice questions instantly." },
        { id: 'flashcards', label: 'Flashcards', icon: BookOpen, desc: "Turn notes into flashcards for efficient active recall." },
        { id: 'summaries', label: 'Summarizer', icon: Zap, desc: "Condense complex documents into clear, concise summaries." },

        { id: 'code-tools', label: 'Code Tools', icon: Code2, desc: "Analyze, debug, and optimize your code snippets with AI." },
        { id: 'analysis', label: 'Data Analyst', icon: BarChart2, desc: "Automated insights and trend detection for Excel/CSV data." },
        { id: 'visualize', label: 'Data Visualizer', icon: PieChart, desc: "Interactive PowerBI-style dashboards for deep visual data storytelling." },
    ];

    return (
        <div className="min-h-screen overflow-x-hidden selection:bg-indigo-500/30">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] md:top-[-20%] left-[-10%] md:left-[-20%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/10 md:bg-indigo-600/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-float" />
                <div className="absolute top-[30%] md:top-[15%] right-[-10%] md:right-[-15%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-purple-600/10 md:bg-purple-600/20 rounded-full blur-[80px] md:blur-[150px] mix-blend-screen animate-float-delayed" />
                <div className="absolute bottom-[-10%] left-[10%] md:left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[100px] mix-blend-screen animate-float" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center lg:text-left flex flex-col items-center lg:items-start"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Next-Gen Learning Engine
                        </div>
                        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] font-outfit">
                            Unlock Your <br className="hidden sm:block" />
                            <span className="text-gradient text-glow px-2">Learning Potential</span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
                            Cognify uses advanced AI to transform your study materials into interactive MCQs, flashcards, and summaries in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleFeatureClick('generate')}
                                className="btn-primary group flex items-center justify-center gap-2 px-10"
                            >
                                Start Creating <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="glass-button px-10 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-center"
                            >
                                Watch Demo
                            </motion.button>
                        </div>

                        <div className="mt-12 flex items-center gap-6 text-slate-500 text-sm font-medium justify-center lg:justify-start">
                            <p>Trusted by students</p>
                        </div>
                    </motion.div>

                    {/* Hero Visual - Abstract Multimodal Hub */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative h-[300px] sm:h-[400px] w-full perspective-1000"
                    >
                        <div className="relative w-full h-full flex items-center justify-center transform-style-3d scale-[0.6] sm:scale-100">
                            {/* Central Core */}
                            <div className="relative z-20 animate-float">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full animate-pulse-slow"></div>
                                <div className="w-32 h-32 rounded-3xl bg-slate-900 border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.3)] flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20" />
                                    {/* Rotating Scanner Line */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-400/10 to-transparent w-full h-[20%] animate-[scan_3s_linear_infinite]" />
                                    <Sparkles className="w-16 h-16 text-indigo-400 relative z-10" />
                                </div>
                            </div>

                            {/* Floating Satellite Nodes (Representing Data Types) */}
                            {/* Node 1: Code */}
                            <div className="absolute top-1/4 left-1/4 animate-float-delayed z-10">
                                <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-white/10 bg-slate-800/80 backdrop-blur-md shadow-lg shadow-pink-500/10">
                                    <div className="p-2 rounded-lg bg-pink-500/20 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-pink-400/20 animate-ping opacity-20" />
                                        <Code2 className="w-5 h-5 text-pink-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-200">Code Analysis</span>
                                        <span className="text-[10px] text-pink-400 font-mono">Run: syntax.check()</span>
                                    </div>
                                </div>
                                {/* Data Stream Line */}
                                <div className="absolute top-1/2 -right-12 w-12 h-[1px] bg-gradient-to-r from-pink-500/50 to-transparent opacity-50 origin-left rotate-[20deg]" />
                            </div>

                            {/* Node 2: Study */}
                            <div className="absolute bottom-1/4 right-0 animate-float z-10" style={{ animationDelay: '1s' }}>
                                <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-white/10 bg-slate-800/80 backdrop-blur-md shadow-lg shadow-blue-500/10">
                                    <div className="p-2 rounded-lg bg-blue-500/20 relative">
                                        <BookOpen className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-200">Study Material</span>
                                        <span className="text-[10px] text-blue-400 font-mono">Loading PDF...</span>
                                    </div>
                                </div>
                            </div>

                            {/* Node 3: Real-time */}
                            <div className="absolute top-1/3 right-10 animate-float-delayed z-10" style={{ animationDelay: '2s' }}>
                                <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-white/10 bg-slate-800/80 backdrop-blur-md shadow-lg shadow-green-500/10">
                                    <div className="p-2 rounded-lg bg-green-500/20">
                                        <Zap className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-200">Real-time</span>
                                        <span className="text-[10px] text-green-400 font-mono">Latency: 12ms</span>
                                    </div>
                                </div>
                            </div>

                            {/* Node 4: Image/Vision */}
                            <div className="absolute bottom-1/3 left-0 animate-float z-10" style={{ animationDelay: '3s' }}>
                                <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-white/10 bg-slate-800/80 backdrop-blur-md shadow-lg shadow-orange-500/10">
                                    <div className="p-2 rounded-lg bg-orange-500/20">
                                        <div className="w-5 h-5 flex items-center justify-center text-orange-400 font-bold text-xs">IMG</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-200">Vision Analysis</span>
                                        <span className="text-[10px] text-orange-400 font-mono">Objects: 4 detected</span>
                                    </div>
                                </div>
                            </div>

                            {/* Node 5: Audio/Voice */}
                            <div className="absolute top-16 right-5 animate-float-delayed z-10" style={{ animationDelay: '1.5s' }}>
                                <div className="glass-panel p-3 rounded-2xl flex items-center gap-3 border border-white/10 bg-slate-800/80 backdrop-blur-md shadow-lg shadow-purple-500/10">
                                    <div className="p-1.5 rounded-lg bg-purple-500/20">
                                        <div className="w-4 h-4 rounded-full border-2 border-purple-400 animate-pulse" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-200">Audio Sync</span>
                                        <span className="text-[10px] text-purple-400 font-mono">Processing...</span>
                                    </div>
                                </div>
                            </div>

                            {/* Node 6: Data Analysis */}
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 animate-float z-10" style={{ animationDelay: '4s' }}>
                                <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-white/10 bg-slate-800/80 backdrop-blur-md shadow-lg shadow-teal-500/10">
                                    <div className="p-2 rounded-lg bg-teal-500/20">
                                        <BarChart2 className="w-5 h-5 text-teal-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-200">Data Insights</span>
                                        <span className="text-[10px] text-teal-400 font-mono">Trends Found: 7</span>
                                    </div>
                                </div>
                            </div>

                            {/* Connecting Lines (Decorative) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                                <circle cx="50%" cy="50%" r="180" fill="none" stroke="url(#gradient-ring)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_40s_linear_infinite]" />
                                <circle cx="50%" cy="50%" r="120" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                                <defs>
                                    <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Floating Particles */}
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
                                    style={{
                                        top: `${Math.random() * 80 + 10}%`,
                                        left: `${Math.random() * 80 + 10}%`,
                                        animationDelay: `${Math.random() * 5}s`,
                                        animationDuration: `${Math.random() * 3 + 2}s`
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Showcase */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Supercharge Your Studies</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to master your coursework, powered by state-of-the-art AI models.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <TiltCard
                                    className="h-full glass-panel p-8 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-colors group cursor-pointer"
                                    onClick={() => handleFeatureClick(feature.id)}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500/20">
                                        <feature.icon className="w-7 h-7 text-indigo-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.label}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
