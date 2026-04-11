import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../FileUpload';
import api from '../../api/axios';
import { Loader2 } from 'lucide-react';

const SummaryForm = ({ selectedModel }) => {
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
        formData.append('summaryLength', formRef.current.summaryLength.value);
        formData.append('format', formRef.current.format.value);
        formData.append('tone', formRef.current.tone.value);
        formData.append('perspective', formRef.current.perspective.value);
        formData.append('focusKeywords', formRef.current.focusKeywords.value);
        formData.append('additionalInstructions', formRef.current.additionalInstructions.value);
        formData.append('model', selectedModel);

        try {
            const response = await api.post('/user/generate/summary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                navigate(`/results/${response.data.contentId}`);
            }
        } catch (err) {
            console.error("Summary Generation failed", err);
            setError(err.response?.data?.error || 'Failed to generate summary. Please try again.');
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
                    placeholder="Paste your text content here..."
                    className={`w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all resize-none ${file ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!!file}
                ></textarea>
                {file && <p className="text-xs text-amber-500/80">Input disabled because a file is selected.</p>}
                {textInput && <p className="text-xs text-amber-500/80">File upload disabled because text is entered.</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="summary-length" className="block text-sm font-medium text-slate-300">
                        Summary Length
                    </label>
                    <select
                        id="summary-length"
                        name="summaryLength"
                        defaultValue="medium"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="short">Short (Key Points)</option>
                        <option value="medium">Medium (Standard Summary)</option>
                        <option value="long">Long (Detailed Analysis)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="format" className="block text-sm font-medium text-slate-300">
                        Response Format
                    </label>
                    <select
                        id="format"
                        name="format"
                        defaultValue="paragraph"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="paragraph">Paragraphs</option>
                        <option value="bullet-points">Bullet Points</option>
                        <option value="executive-summary">Executive Summary</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="perspective" className="block text-sm font-medium text-slate-300">
                        Perspective / Angle
                    </label>
                    <select
                        id="perspective"
                        name="perspective"
                        defaultValue="general"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="general">General Audience</option>
                        <option value="technical">Technical Expert</option>
                        {/* <option value="business">Business Stakeholder</option> */}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="tone" className="block text-sm font-medium text-slate-300">
                        Summary Tone
                    </label>
                    <select
                        id="tone"
                        name="tone"
                        defaultValue="professional"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="professional">Professional</option>
                        <option value="academic">Academic</option>
                        <option value="simple">Simple / ELI5</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="focus-keywords" className="block text-sm font-medium text-slate-300">
                        Focus Keywords (Optional)
                    </label>
                    <input
                        type="text"
                        id="focus-keywords"
                        name="focusKeywords"
                        placeholder="e.g. AI, Future, Ethics"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all"
                    />
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
                    placeholder="Anything else you want to specify?"
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
                            Summarizing...
                        </>
                    ) : (
                        "Generate Summary"
                    )}
                </button>
            </div>
        </form>
    );
};

export default SummaryForm;
