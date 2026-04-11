import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../FileUpload';
import api from '../../api/axios';
import { Loader2, PieChart } from 'lucide-react';

const DataVisualizeForm = ({ selectedModel }) => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file && !textInput.trim()) {
            setError('Please upload a CSV/Excel file or enter raw data.');
            return;
        }

        setIsLoading(true);
        setError('');

        const formData = new FormData();
        if (file) formData.append('file', file);
        if (textInput) formData.append('textInput', textInput);
        formData.append('analysisType', formRef.current.analysisType.value);
        formData.append('focusColumns', formRef.current.focusColumns.value);
        formData.append('dashboardTheme', formRef.current.dashboardTheme.value);
        formData.append('includeInsights', formRef.current.includeInsights.checked);
        formData.append('visualizationGoal', formRef.current.visualizationGoal.value);
        formData.append('model', selectedModel);

        try {
            const response = await api.post('/user/generate/visualize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                navigate(`/results/${response.data.contentId}`);
            }
        } catch (err) {
            console.error("Data Visualization failed", err);
            setError(err.response?.data?.error || 'Failed to visualize data. Please try again.');
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

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex gap-3 text-emerald-300 text-sm">
                <PieChart className="w-5 h-5 flex-shrink-0" />
                <p>Upload a dataset to generate multiple interactive charts and visual dashboards instantly.</p>
            </div>

            <div className="space-y-4">
                <div className={textInput ? "opacity-50 pointer-events-none grayscale" : ""}>
                    <FileUpload
                        accept=".csv,.xlsx,.xls"
                        label="Upload Dataset"
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
                    <span className="px-2 bg-slate-950 text-slate-500">Or Paste Data Below</span>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="text-input" className="block text-sm font-medium text-slate-300">
                    Paste CSV Data
                </label>
                <textarea
                    id="text-input"
                    name="textInput"
                    rows="6"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="e.g. Date, Sales, Region..."
                    className={`w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all resize-none font-mono text-xs ${file ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!!file}
                ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="analysis-type" className="block text-sm font-medium text-slate-300">
                        Analysis Report Type
                    </label>
                    <select
                        id="analysis-type"
                        name="analysisType"
                        defaultValue="eda"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="eda">Exploratory Data Analysis (EDA)</option>                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="focus-columns" className="block text-sm font-medium text-slate-300">
                        Focus Columns (Optional)
                    </label>
                    <input
                        type="text"
                        id="focus-columns"
                        name="focusColumns"
                        placeholder="e.g. Sales, Date, Region"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="dashboard-theme" className="block text-sm font-medium text-slate-300">
                        Dashboard Theme (Style)
                    </label>
                    <select
                        id="dashboard-theme"
                        name="dashboardTheme"
                        defaultValue="modern"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="modern">Modern Dark (Default)</option>
                    </select>
                </div>

                <div className="flex items-center space-x-3 pt-6">
                    <div className="flex items-center h-5">
                        <input
                            id="include-insights"
                            name="includeInsights"
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-700 rounded focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
                        />
                    </div>
                    <div className="text-sm">
                        <label htmlFor="include-insights" className="font-medium text-slate-300">Include AI Narrative Insights</label>
                        <p className="text-slate-500 text-xs">Generate text analysis alongside charts.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="visualization-goal" className="block text-sm font-medium text-slate-300">
                    Visualization Goal (Optional)
                </label>
                <textarea
                    id="visualization-goal"
                    name="visualizationGoal"
                    rows="2"
                    placeholder="e.g., 'I want to see which region had the most growth in Q4'..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none transition-all resize-none placeholder:text-slate-600"
                />
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
                    className="btn-primary flex items-center gap-2 min-w-[180px] justify-center bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Visualizing...
                        </>
                    ) : (
                        "Generate Dashboards"
                    )}
                </button>
            </div>
        </form>
    );
};

export default DataVisualizeForm;
