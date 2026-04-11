import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../FileUpload';
import api from '../../api/axios';
import { Loader2 } from 'lucide-react';

const CodeToolsForm = ({ selectedModel }) => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [codeText, setCodeText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file && !codeText.trim()) {
            setError('Please upload a file or paste your code.');
            return;
        }

        setIsLoading(true);
        setError('');

        const formData = new FormData();
        if (file) formData.append('file', file);
        formData.append('codeText', codeText);
        formData.append('operation', formRef.current.operation.value);
        formData.append('language', formRef.current.language.value);
        formData.append('analysisDepth', formRef.current.analysisDepth.value);
        formData.append('outputStyle', formRef.current.outputStyle.value);
        formData.append('additionalInstructions', formRef.current.additionalInstructions.value);
        formData.append('model', selectedModel);

        try {
            const response = await api.post('/user/generate/code-tools', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                navigate(`/results/${response.data.contentId}`);
            }
        } catch (err) {
            console.error("Code Tool execution failed", err);
            setError(err.response?.data?.error || 'Failed to analyze code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        if (formRef.current) formRef.current.reset();
        setFile(null);
        setCodeText('');
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
                <div className={codeText ? "opacity-50 pointer-events-none grayscale" : ""}>
                    <FileUpload
                        accept=".py,.java,.c,.cpp,.js,.ts,.html,.css,.txt"
                        label="Upload Code File"
                        onFileSelect={(selectedFile) => setFile(selectedFile)}
                        disabled={!!codeText}
                    />
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-950 text-slate-500">Or Paste Code Below</span>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="code-input" className="block text-sm font-medium text-slate-300">
                    Paste Your Code
                </label>
                <textarea
                    id="code-input"
                    name="codeText"
                    rows="6"
                    value={codeText}
                    onChange={(e) => setCodeText(e.target.value)}
                    placeholder="Paste your code snippet here..."
                    className={`w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all font-mono text-sm ${file ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!!file}
                ></textarea>
                {file && <p className="text-xs text-amber-500/80">Input disabled because a file is selected.</p>}
                {codeText && <p className="text-xs text-amber-500/80">File upload disabled because code is entered.</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="operation" className="block text-sm font-medium text-slate-300">
                        Select Action
                    </label>
                    <select
                        id="operation"
                        name="operation"
                        defaultValue="explain"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="explain">Explain Logic</option>
                        <option value="review">Security & Quality Review</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="language" className="block text-sm font-medium text-slate-300">
                        Programming Language
                    </label>
                    <select
                        id="language"
                        name="language"
                        defaultValue="auto"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="auto">Auto Detect</option>
                        <option value="javascript">JavaScript / TypeScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java / C#</option>
                        <option value="cpp">C / C++</option>
                        <option value="web">HTML / CSS</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="analysis-depth" className="block text-sm font-medium text-slate-300">
                        Analysis Depth
                    </label>
                    <select
                        id="analysis-depth"
                        name="analysisDepth"
                        defaultValue="standard"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="quick">Quick Scan (Fast)</option>
                        <option value="standard">Standard Review (Balanced)</option>
                        <option value="deep">Deep Security Audit (Detailed)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="output-style" className="block text-sm font-medium text-slate-300">
                        Output Style
                    </label>
                    <select
                        id="output-style"
                        name="outputStyle"
                        defaultValue="concise"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="concise">Concise & Direct</option>
                        <option value="educational">Educational / Tutorial</option>
                        <option value="technical">Highly Technical / Geek</option>
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
                    placeholder="e.g. Focus on memory usage, use modern syntax, add docstrings..."
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
                    className="btn-primary flex items-center gap-2 min-w-[160px] justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        "Analyze Code"
                    )}
                </button>
            </div>
        </form>
    );
};

export default CodeToolsForm;
