import React, { useEffect } from 'react';
import { Bot } from 'lucide-react';
import { MODELS } from '../constants/models';

const ModelSelector = ({ selectedModel, onModelChange, activeTool }) => {
    const allModels = MODELS;

    // Filter models based on the active tool
    const availableModels = activeTool === 'code-tools'
        ? allModels.filter(m => m.category === 'code' || m.category === 'premium')
        : activeTool === 'analysis'
            ? allModels.filter(m => m.category === 'data' || m.category === 'general' || m.category === 'premium')
            : allModels.filter(m => m.category === 'general' || m.category === 'premium');

    // Auto-switch model if the current selection is not compatible with the active tool
    useEffect(() => {
        const isCompatible = availableModels.some(m => m.id === selectedModel);
        if (!isCompatible && availableModels.length > 0) {
            onModelChange(availableModels[0].id);
        }
    }, [activeTool, availableModels, selectedModel, onModelChange]);

    return (
        <div className="flex justify-center mb-0">
            <div className="bg-slate-900/40 backdrop-blur-md rounded-full p-1.5 pr-4 flex items-center gap-3 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 shadow-lg shadow-black/20">
                <div className="bg-indigo-500/20 p-2 rounded-full border border-indigo-400/20">
                    <Bot className="w-5 h-5 text-indigo-400" />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="model-select" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
                        AI Engine:
                    </label>
                    <select
                        id="model-select"
                        value={selectedModel}
                        onChange={(e) => onModelChange(e.target.value)}
                        className="bg-transparent text-slate-200 text-sm font-bold focus:outline-none cursor-pointer border-none py-1 pl-0 pr-8 focus:ring-0 appearance-none"
                    >
                        {availableModels.map((model) => (
                            <option key={model.id} value={model.id} className="bg-slate-900 text-slate-200 py-2">
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">
                        {allModels.find(m => m.id === selectedModel)?.desc || 'Hugging Face API'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ModelSelector;
