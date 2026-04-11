import React from 'react';
import { FileText } from 'lucide-react';

const SummaryResult = ({ content }) => {
    const renderContent = (text) => {
        if (!text) return null;

        const lines = text.split('\n');
        return lines.map((line, index) => {
            const trimmedLine = line.trim();
            
            // Bold text parsing
            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = line.split(boldRegex);
            const contentWithBold = parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
            );

            // Sub-bullets (starting with +)
            if (trimmedLine.startsWith('+')) {
                const firstPart = parts[0].replace(/^\s*[\+]\s*/, '');
                const updatedContent = [firstPart, ...parts.slice(1)].map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
                );
                return (
                    <li key={index} className="ml-8 list-none flex gap-3 text-slate-400 mb-1">
                        <span className="text-indigo-500">•</span>
                        <div className="flex-1">{updatedContent}</div>
                    </li>
                );
            }

            // Main bullets (starting with * or -)
            if (trimmedLine.startsWith('*') || trimmedLine.startsWith('-')) {
                const firstPart = parts[0].replace(/^\s*[\*\-]\s*/, '');
                const updatedContent = [firstPart, ...parts.slice(1)].map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
                );

                return (
                    <li key={index} className="ml-4 list-none flex gap-3 text-slate-300 font-medium mb-2 mt-4 first:mt-0">
                        <span className="text-indigo-400 text-xl leading-none pt-1">•</span>
                        <div className="flex-1">{updatedContent}</div>
                    </li>
                );
            }

            // Regular paragraphs
            if (trimmedLine === '') return <div key={index} className="h-4" />;

            return (
                <p key={index} className="text-slate-300 leading-relaxed mb-4">
                    {contentWithBold}
                </p>
            );
        });
    };

    return (
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                    <FileText className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Executive Summary</h2>
            </div>
            <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-white">
                {renderContent(content.data)}
            </div>
        </div>
    );
};

export default SummaryResult;
