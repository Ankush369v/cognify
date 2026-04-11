import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

const MCQResult = ({ content }) => {
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
                    <h2 className="text-xl font-bold text-red-400">Response Notice</h2>
                </div>
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">{renderMarkdown(content.data)}</div>
                <div className="mt-6 pt-6 border-t border-red-500/20">
                    <p className="text-sm text-red-400/80">Tip: The AI could not generate MCQs. Please provide a longer or more detailed text.</p>
                </div>
            </div>
        );
    }

    const mcqs = Array.isArray(content.data) ? content.data : [];
    if (mcqs.length === 0) {
        return (
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm text-center">
                <p className="text-slate-400">No questions could be generated. Please provide a better structured document or context.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {mcqs.map((q, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                            {idx + 1}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-6 leading-relaxed">
                                {renderMarkdown(q.question)}
                            </h3>
                            {Array.isArray(q.options) ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((opt, i) => {
                                        const optionLetter = String.fromCharCode(65 + i);
                                        const isCorrect = optionLetter === String(q.correct);
                                        return (
                                            <div
                                                key={i}
                                                className={`p-4 rounded-xl border transition-all ${isCorrect
                                                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                                                    : 'bg-white/5 border-white/10 text-slate-300'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">{renderMarkdown(opt)}</span>
                                                    {isCorrect && <CheckCircle2 className="w-4 h-4" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-500 text-sm">
                                    {renderMarkdown(q.answer || q.correct || "No options available for this question.")}
                                </div>
                            )}
                            {q.explanation && (
                                <div className="mt-6 p-4 bg-indigo-500/5 rounded-lg border border-indigo-500/10 flex gap-3">
                                    <Info className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                    <div className="text-sm text-slate-400 leading-relaxed">
                                        <span className="font-bold text-indigo-400">Explanation: </span>
                                        {renderMarkdown(q.explanation)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MCQResult;
