import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../FileUpload';
import api from '../../api/axios';
import { Loader2 } from 'lucide-react';

const FlashcardForm = ({ selectedModel }) => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file && !textInput.trim()) {
            setError('Please upload a file or enter text content.');
            return;
        }

        setIsLoading(true);
        setError('');

        const formData = new FormData();
        if (file) formData.append('file', file);
        if (textInput) formData.append('textInput', textInput);
        formData.append('difficulty', formRef.current.difficulty.value);
        formData.append('focusTopics', formRef.current.focusTopics.value);
        formData.append('count', formRef.current.count.value);
        formData.append('cardStyle', formRef.current.cardStyle.value);
        formData.append('detailLevel', formRef.current.detailLevel.value);
        formData.append('additionalInstructions', formRef.current.additionalInstructions.value);
        formData.append('model', selectedModel);

        try {
            const response = await api.post('/user/generate/flashcards', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                navigate(`/results/${response.data.contentId}`);
            }
        } catch (err) {
            console.error("Flashcard Generation failed", err);
            setError(err.response?.data?.error || 'Failed to generate flashcards. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        if (formRef.current) formRef.current.reset();
        setFile(null);
        setTextInput('');
        setError('');
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div className={textInput ? "opacity-50 pointer-events-none grayscale" : ""}>
                    <FileUpload
                        accept=".txt,.pdf"
                        label="Upload Document"
                        onFileSelect={(selectedFile) => setFile(selectedFile)}
                        disabled={!!textInput}
                    />
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-950 text-slate-500">Or Paste Content Below</span>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="text-input" className="block text-sm font-medium text-slate-300">
                    Paste/Type Content Directly
                </label>
                <textarea
                    id="text-input"
                    name="textInput"
                    rows="6"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Paste your notes or text here..."
                    className={`w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all resize-none ${file ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!!file}
                ></textarea>
                {file && <p className="text-xs text-amber-500/80">Input disabled because a file is selected.</p>}
                {textInput && <p className="text-xs text-amber-500/80">File upload disabled because text is entered.</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label htmlFor="flashcard-difficulty" className="block text-sm font-medium text-slate-300">
                        Difficulty Level
                    </label>
                    <select
                        id="flashcard-difficulty"
                        name="difficulty"
                        defaultValue="intermediate"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="basic">Basic (Key Definitions)</option>
                        <option value="intermediate">Intermediate (Concepts)</option>
                        <option value="advanced">Advanced (Deep Analysis)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="count" className="block text-sm font-medium text-slate-300">
                        Number of Cards
                    </label>
                    <input
                        type="number"
                        id="count"
                        name="count"
                        min="5"
                        max="50"
                        defaultValue="10"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="focus-topics" className="block text-sm font-medium text-slate-300">
                        Focus Topics (Optional)
                    </label>
                    <input
                        type="text"
                        id="focus-topics"
                        name="focusTopics"
                        placeholder="e.g. Dates, Formulas, Names"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="card-style" className="block text-sm font-medium text-slate-300">
                        Front Card Style
                    </label>
                    <select
                        id="card-style"
                        name="cardStyle"
                        defaultValue="question"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="question">Direct Question</option>
                        <option value="term">Term / Definition</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="detail-level" className="block text-sm font-medium text-slate-300">
                        Answer Detail Level
                    </label>
                    <select
                        id="detail-level"
                        name="detailLevel"
                        defaultValue="moderate"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="brief">Brief (Key Points)</option>
                        <option value="moderate">Moderate (Explained)</option>
                        <option value="comprehensive">Comprehensive (Deep Dive)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="additional-instructions" className="block text-sm font-medium text-slate-300">
                    Additional Instructions (Optional)
                </label>
                <textarea
                    id="additional-instructions"
                    name="additionalInstructions"
                    rows="3"
                    placeholder="e.g. Use simple language, include examples in answers..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all resize-none"
                ></textarea>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl font-medium text-slate-400 hover:bg-white/5 transition-all"
                    disabled={isLoading}
                >
                    Reset
                </button>
                <button
                    type="submit"
                    className="btn-primary flex items-center gap-2 min-w-[180px] justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating Cards...
                        </>
                    ) : (
                        "Create Flashcards"
                    )}
                </button>
            </div>
        </form>
    );
};

export default FlashcardForm;
