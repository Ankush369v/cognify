import React from 'react';
import { Info, Code2, CheckCircle2 } from 'lucide-react';

const CodeResult = ({ content }) => {
    const renderMarkdown = (text) => {
        if (typeof text !== 'string') return text;
        
        // Bold parsing
        const boldRegex = /\*\*(.*?)\*\*/g;
        const parts = text.split(boldRegex);
        return parts.map((part, i) => 
            i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
        );
    };

    if (typeof content.data === 'string') {
        return (
            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Info className="w-6 h-6 text-red-400" />
                    <h2 className="text-xl font-bold text-red-400">Analysis Notice</h2>
                </div>
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">{renderMarkdown(content.data)}</div>
            </div>
        );
    }

    const data = content.data || {};
    return (
        <div className="space-y-8">
            {/* Executive Summary & Complexity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-indigo-400" /> Executive Summary
                    </h2>
                    <div className="text-slate-300 leading-relaxed text-lg">
                        {renderMarkdown(data.summary || data.review_summary)}
                    </div>
                </div>

                {data.complexity && (
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-center">
                        <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Complexity Analysis</h3>
                        <div className="text-2xl font-mono font-bold text-white">{renderMarkdown(data.complexity)}</div>
                        <p className="text-slate-400 text-xs mt-4">Estimated time & space complexity for the analyzed logic.</p>
                    </div>
                )}
            </div>

            {/* Key Learnings / Best Practices */}
            {data.key_learnings?.length > 0 && (
                <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Architectural Insights & Best Practices
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.key_learnings.map((learning, i) => (
                            <div key={i} className="flex gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0 text-xs">{i+1}</div>
                                <div className="text-slate-300 text-sm leading-relaxed">{renderMarkdown(learning)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Functions / Modules */}
            {data.functions?.map((fn, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4 capitalize">{renderMarkdown(fn.name)}</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Logic Breakdown</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{renderMarkdown(fn.description)}</p>
                            <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                                <h5 className="text-xs font-bold text-emerald-400 uppercase mb-2">Correctness</h5>
                                <p className="text-slate-300 text-xs">{renderMarkdown(fn.correctness)}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {fn.potentialIssues?.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-3">Potential Issues</h4>
                                    <ul className="space-y-2">
                                        {fn.potentialIssues.map((issue, i) => (
                                            <li key={i} className="text-xs text-slate-400 flex gap-2">
                                                <span className="text-orange-500">•</span> {renderMarkdown(issue)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {fn.optimizations?.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3">Suggested Optimizations</h4>
                                    <ul className="space-y-2">
                                        {fn.optimizations.map((opt, i) => (
                                            <li key={i} className="text-xs text-slate-300 flex gap-2">
                                                <span className="text-indigo-500">→</span> {renderMarkdown(opt)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CodeResult;
