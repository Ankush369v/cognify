import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles,
    BookOpen,
    Zap,
    Code2,
    BarChart2,
    PieChart,
    ArrowRight,
    CheckCircle2,
    Cpu,
    ShieldCheck,
    Layout,
    FileText,
    Dna
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const FeatureSection = ({ feature, index, onFeatureClick }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-24 items-center py-12 lg:py-20 border-b border-white/5 last:border-0`}
        >
            <div className="flex-1 space-y-6">
                <div className={`inline-flex p-3 rounded-2xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 mb-2`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                    {feature.title}
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                    {feature.description}
                </p>
                <ul className="space-y-4 pt-4">
                    {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                            <div className={`mt-1 p-1 rounded-full bg-${feature.color}-500/10 text-${feature.color}-500 group-hover:scale-110 transition-transform`}>
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className="text-slate-300 font-medium">{benefit}</span>
                        </li>
                    ))}
                </ul>
                <div className="pt-6">
                    <button
                        onClick={() => onFeatureClick(feature.id)}
                        className={`inline-flex items-center gap-2 font-bold text-${feature.color}-400 hover:text-${feature.color}-300 transition-all group`}
                    >
                        Try {feature.shortLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full">
                <div className="relative group">
                    <div className={`absolute -inset-4 bg-gradient-to-tr from-${feature.color}-500/20 to-indigo-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                    <div className="relative glass-panel rounded-[2rem] border border-white/10 overflow-hidden aspect-video bg-slate-900/50 flex items-center justify-center p-8">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className={`w-20 h-20 rounded-3xl bg-${feature.color}-500/20 flex items-center justify-center animate-pulse`}>
                                <feature.icon className={`w-10 h-10 text-${feature.color}-400`} />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-48 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`h-full bg-${feature.color}-500`}
                                    />
                                </div>
                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                                    AI Engine Processing...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Features = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleFeatureClick = (featureId = null) => {
        if (isLoggedIn) {
            navigate(`/dashboard?tab=create${featureId ? `&tool=${featureId}` : ''}`);
        } else {
            navigate('/login');
        }
    };

    const features = [
        {
            id: 'analysis',
            shortLabel: 'Data Analyst',
            title: 'Advanced AI Data Analysis',
            color: 'indigo',
            icon: BarChart2,
            description: "Go beyond basic spreadsheets. Our AI Data Analyst performs complex statistical audits, correlation mapping, and trend decomposition automatically.",
            benefits: [
                "Executive-grade strategic recommendations based on raw math.",
                "Customizable Report Depth: From quick summaries to deep technical audits.",
                "Tone Control: Professional, Academic, or Storytelling styles.",
                "Multivariate analysis to uncover hidden drivers in your datasets."
            ]
        },
        {
            id: 'visualize',
            shortLabel: 'Visualizer',
            title: 'Interactive Data Visualizer',
            color: 'teal',
            icon: PieChart,
            description: "Transform raw CSV/Excel files into stunning, interactive PowerBI-style dashboards with embedded AI narrative insights.",
            benefits: [
                "Multiple Themes: Modern Dark, Corporate Light, Neon, and more.",
                "AI Narrative Insights: Contextual explanations for every chart.",
                "Wide Format Support: Area, Bar, Line, Pie, and complex multi-series charts.",
                "Responsive Layouts: Dashboards that adapt to any screen size."
            ]
        },
        {
            id: 'code-tools',
            shortLabel: 'Code Tools',
            title: 'Pro AI Developer Suite',
            color: 'pink',
            icon: Code2,
            description: "Expert-level code analysis and refactoring. Our tools act as a Senior Engineer reviewing your PRs for security and performance.",
            benefits: [
                "Analysis Depth: Choose between Quick Scans or Deep Security Audits.",
                "Educational Explanations: Understand the 'Why' behind every optimization.",
                "Security Focused: Detect vulnerable patterns and memory leaks instantly.",
                "Performance Tuning: Automatic refactoring for O(n) efficiency."
            ]
        },

        {
            id: 'generate',
            shortLabel: 'MCQ Generator',
            title: 'High-Fidelity MCQ Engine',
            color: 'purple',
            icon: Sparkles,
            description: "The gold standard for test preparation. Generate high-quality multiple choice questions aligned with Bloom's Taxonomy levels.",
            benefits: [
                "Bloom's Alignment: Focus on Remember, Understand, Apply, or Analyze.",
                "Tricky Tones: Toggle between direct questions or challenging 'brain-teasers'.",
                "Context-Aware: Questions are derived deeply from your specific source text.",
                "Export Ready: Easily save and review your generated question sets."
            ]
        },
        {
            id: 'flashcards',
            shortLabel: 'Flashcards',
            title: 'Active Recall Flashcards',
            color: 'blue',
            icon: BookOpen,
            description: "Master complex subjects using the science of active recall. Our cards optimize information density for maximum retention.",
            benefits: [
                "Custom Card Styles: Questions, Term/Definition, or Scenario-based fronts.",
                "Answer Depth Control: Choose from brief key points to comprehensive analysis.",
                "Visual Layout: Clean, distraction-free cards optimized for study flow.",
                "Topic Targeting: Force the AI to focus on specific dates, formulas, or names."
            ]
        },
        {
            id: 'summaries',
            shortLabel: 'Summarizer',
            title: 'Executive Information Distiller',
            color: 'emerald',
            icon: Zap,
            description: "Stop drowning in text. Distill 50-page documents into executive summaries, bulleted key points, or engaging narratives in seconds.",
            benefits: [
                "Perspective Control: Summaries for Technical Experts or Business Stakeholders.",
                "Format Flexibility: Paragraphs, Bullet Points, or Executive Briefings.",
                "Keyword Extraction: Automatically highlight the most critical concepts.",
                "Tone Matching: From simple ELI5 explanations to rigorous academic abstracts."
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/30">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold mb-6">
                            <Dna className="w-4 h-4" /> The Power of Multi-Modal AI
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 tracking-tight font-outfit">
                            Platform <span className="text-gradient">Capabilities</span>
                        </h1>
                        <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
                            Discover the full suite of AI-driven tools designed to accelerate your workflow,
                            deepen your learning, and transform how you interact with information.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Features Listing */}
            <div className="max-w-7xl mx-auto px-4 relative z-10 pb-32">
                {features.map((feature, index) => (
                    <FeatureSection key={feature.id} feature={feature} index={index} onFeatureClick={handleFeatureClick} />
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="bg-slate-900/50 border-y border-white/5 py-24 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px]" />
                </div>
                <div className="max-w-xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to start?</h2>
                    <p className="text-slate-400 mb-10 text-lg">
                        Join thousands of students and professionals who are already mastering their fields with Cognify AI.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/signup" className="btn-primary px-8 py-4 rounded-2xl font-bold">
                                    Create Free Account
                                </Link>
                                <button
                                    onClick={() => handleFeatureClick()}
                                    className="glass-button px-8 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5"
                                >
                                    Login to Dashboard
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => handleFeatureClick()}
                                className="btn-primary px-12 py-4 rounded-2xl font-bold"
                            >
                                Continue to Dashboard
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
