import React from 'react';
import { Info, Layers, Brain } from 'lucide-react';

const FlashcardResult = ({ content }) => {
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
                    <p className="text-sm text-red-400/80">Tip: The AI could not generate Flashcards from the provided input.</p>
                </div>
            </div>
        );
    }

    const cards = Array.isArray(content.data) ? content.data : [];
    if (cards.length === 0) {
        return (
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm text-center">
                <p className="text-slate-400">No flashcards could be generated. Please provide a better structured document or context.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
                <div key={idx} className="group [perspective:1000px] min-h-[16rem] h-full">
                    <div className="relative h-full w-full rounded-2xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer grid">
                        {/* Front */}
                        <div className="[grid-area:1/1] p-8 flex flex-col justify-center items-center bg-slate-900 border border-white/10 rounded-2xl [backface-visibility:hidden]">
                            <Layers className="w-8 h-8 text-indigo-500 mb-4 opacity-50 shrink-0" />
                            <div className="flex-1 flex items-center justify-center w-full">
                                <div className="text-center text-white font-medium text-lg leading-relaxed whitespace-pre-wrap">
                                    {renderMarkdown(card.question)}
                                </div>
                            </div>
                            <span className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold shrink-0">Query</span>
                        </div>
                        
                        {/* Back */}
                        <div className="[grid-area:1/1] h-full w-full rounded-2xl bg-indigo-600 p-8 text-center text-slate-100 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center">
                            <Brain className="w-8 h-8 text-white/50 mb-4 shrink-0" />
                            <div className="flex-1 flex items-center justify-center w-full overflow-y-auto custom-scrollbar">
                                <div className="text-lg leading-relaxed whitespace-pre-wrap">
                                    {renderMarkdown(card.answer)}
                                </div>
                            </div>
                            <span className="mt-6 text-[10px] text-indigo-200 uppercase tracking-widest font-bold shrink-0">Concept</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FlashcardResult;
