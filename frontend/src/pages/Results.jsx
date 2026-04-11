import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Copy, XCircle, Loader2 } from 'lucide-react';
import api from '../api/axios';

// Modular Feature Components
import MCQResult from '../components/dashboard/results/MCQResult';
import SummaryResult from '../components/dashboard/results/SummaryResult';
import FlashcardResult from '../components/dashboard/results/FlashcardResult';
import CodeResult from '../components/dashboard/results/CodeResult';
import DashboardResult from '../components/dashboard/results/DashboardResult';
import { handleExportPDF } from '../components/dashboard/results/exportUtils';

const Results = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);
    const [content, setContent] = useState(null);
    const [error, setError] = useState('');
    const contentRef = useRef(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get(`/dashboard/view/${id}`);
                if (response.data.success) {
                    setContent(response.data.content);
                }
            } catch (err) {
                console.error("Failed to fetch content", err);
                setError(err.response?.data?.error || "Failed to load results.");
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchContent();
    }, [id]);

    const handleCopy = () => {
        const text = JSON.stringify(content.data, null, 2);
        navigator.clipboard.writeText(text);
        alert("Content copied to clipboard!");
    };

    const handleExport = () => {
        handleExportPDF(content, setIsExporting);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                    <p className="text-slate-400 animate-pulse">Retrieving your insights...</p>
                </div>
            </div>
        );
    }

    if (error || !content) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto opacity-50" />
                    <h2 className="text-2xl font-bold text-white">Oops! Something went wrong</h2>
                    <p className="text-slate-400">{error || "The content you're looking for doesn't exist."}</p>
                    <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg mt-4 font-bold">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const renderHeader = () => (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/dashboard?tab=overview')}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white capitalize">{content.type.replace('-', ' ')} Result</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 uppercase tracking-wider">
                            {content.meta?.model || 'AI Generated'}
                        </span>
                        <span className="text-xs text-slate-500">
                            {new Date(content.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <button onClick={handleCopy} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors border border-white/10">
                    <Copy className="w-4 h-4" /> Copy JSON
                </button>
                <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {isExporting ? 'Exporting...' : 'Export PDF'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto font-outfit">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={content._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    {renderHeader()}

                    <main ref={contentRef} className="bg-[#020617] p-4 -m-4 rounded-xl">
                        {content.type === 'mcq' && <MCQResult content={content} />}
                        {content.type === 'summary' && <SummaryResult content={content} />}
                        {content.type === 'flashcards' && <FlashcardResult content={content} />}
                        {(content.type === 'explain' || content.type === 'review') && <CodeResult content={content} />}
                        {content.type === 'visualize' && <DashboardResult content={content} />}
                    </main>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Results;
