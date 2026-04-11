import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import ModelSelector from '../ModelSelector';
import MCQForm from '../forms/MCQForm';
import FlashcardForm from '../forms/FlashcardForm';
import SummaryForm from '../forms/SummaryForm';

import CodeToolsForm from '../forms/CodeToolsForm';

import DataVisualizeForm from '../forms/DataVisualizeForm';

const TOOLS = [
    { id: 'generate', label: 'Generate MCQs', icon: 'HelpCircle', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/50', desc: "Create mostly accurate multiple choice questions instantly." },
    { id: 'flashcards', label: 'Flashcards', icon: 'Layers', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/50', desc: "Turn notes into flashcards for efficient active recall." },
    { id: 'summaries', label: 'Summarizer', icon: 'FileText', color: 'text-green-400', bg: 'bg-green-500/10', border: 'hover:border-green-500/50', desc: "Condense complex documents into clear, concise summaries." },
    { id: 'code-tools', label: 'Code Tools', icon: 'Code2', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'hover:border-pink-500/50', desc: "Analyze, debug, and optimize your code snippets with AI." },

    { id: 'visualize', label: 'Data Visualizer', icon: 'PieChart', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500/50', desc: "Transform datasets into beautiful, interactive charts and dashboards." },
];

import { HelpCircle, Layers, FileText, Code2, BarChart2, PieChart } from 'lucide-react';

const ICON_MAP = {
    HelpCircle,
    Layers,
    FileText,
    Code2,
    BarChart2,
    PieChart
};

const CreateContent = ({
    selectedModel,
    onModelChange,
    activeToolInfo,
    setActiveToolInfo,
    searchTerm,
    setSearchTerm
}) => {
    const filteredTools = TOOLS.filter(tool =>
        tool.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderToolContent = () => {
        switch (activeToolInfo) {
            case 'generate': return <MCQForm selectedModel={selectedModel} />;
            case 'flashcards': return <FlashcardForm selectedModel={selectedModel} />;
            case 'summaries': return <SummaryForm selectedModel={selectedModel} />;
            case 'code-tools': return <CodeToolsForm selectedModel={selectedModel} />;

            case 'visualize': return <DataVisualizeForm selectedModel={selectedModel} />;
            default: return <MCQForm selectedModel={selectedModel} />;
        }
    };

    return (
        <motion.div
            key="create"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">AI Studio</h1>
                    <p className="text-slate-400">Select a tool to start generating content.</p>
                </div>
                <ModelSelector selectedModel={selectedModel} onModelChange={onModelChange} activeTool={activeToolInfo} />
            </div>

            {/* Search & Tool Grid */}
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
                <div className="relative mb-8 max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search tools (e.g., 'mcq', 'summary')..."
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-4 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tool Tabs / Filtered Grid */}
                <div className="overflow-x-auto pb-4 mb-8 text-center scrollbar-thin scrollbar-thumb-indigo-500/20 scrollbar-track-slate-800/10">
                    <div className="inline-flex gap-4 text-left">
                        {filteredTools.map((tool) => {
                            const Icon = ICON_MAP[tool.icon];
                            return (
                                <button
                                    key={tool.id}
                                    onClick={() => setActiveToolInfo(tool.id)}
                                    className={`
                                        relative overflow-hidden rounded-2xl p-4 transition-all duration-300 border text-left group min-w-[160px]
                                        ${activeToolInfo === tool.id
                                            ? 'bg-indigo-600/10 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                                            : 'bg-slate-800/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10'
                                        }
                                    `}
                                >
                                    <div className={`p-3 rounded-xl w-fit mb-3 transition-colors duration-300 ${tool.bg} ${activeToolInfo === tool.id ? 'bg-indigo-500 text-white' : ''}`}>
                                        <Icon className={`w-6 h-6 ${activeToolInfo === tool.id ? 'text-white' : tool.color}`} />
                                    </div>
                                    <span className={`block text-sm font-bold tracking-wide mb-1 ${activeToolInfo === tool.id ? 'text-white' : 'text-slate-300'}`}>
                                        {tool.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active Tool Area */}
                {activeToolInfo && (
                    <motion.div
                        key={activeToolInfo}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                        className="bg-slate-950 border border-white/5 rounded-2xl p-6 md:p-8"
                    >
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                            {(() => {
                                const tool = TOOLS.find(t => t.id === activeToolInfo);
                                const Icon = ICON_MAP[tool?.icon] || Sparkles;
                                return (
                                    <>
                                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                                            <Icon className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">{tool?.label}</h2>
                                            <p className="text-sm text-slate-500">{tool?.desc}</p>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                        {renderToolContent()}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default CreateContent;
