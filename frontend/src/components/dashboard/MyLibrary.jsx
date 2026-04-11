import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Eye, Trash2, FolderOpen, Layers, ListChecks, FileText, HelpCircle, Code2, BarChart2, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONTENT_TYPES = {
    'flashcards': { label: 'Flashcards', icon: Layers, color: 'text-purple-400', border: 'border-purple-500/50' },

    'summary': { label: 'Summary', icon: FileText, color: 'text-green-400', border: 'border-green-500/50' },
    'mcq': { label: 'MCQ', icon: HelpCircle, color: 'text-blue-400', border: 'border-blue-500/50' },
    'review': { label: 'Code Review', icon: Code2, color: 'text-pink-400', border: 'border-pink-500/50' },
    'explain': { label: 'Code Explanation', icon: Code2, color: 'text-pink-400', border: 'border-pink-500/50' },
    'analysis': { label: 'Data Analysis', icon: BarChart2, color: 'text-teal-400', border: 'border-teal-500/50' },
    'visualize': { label: 'Data Visualizer', icon: PieChart, color: 'text-emerald-400', border: 'border-emerald-500/50' },
};

const MyLibrary = ({ filteredContent, filterType, setFilterType, setActiveTab, onDelete, onDeleteAll }) => {
    return (
        <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Library</h1>
                    <p className="text-slate-400">Manage and revisit your generated content.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 p-1 rounded-xl border border-white/10">
                    <div className="pl-3 pr-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="bg-transparent text-slate-300 text-sm font-medium focus:outline-none py-2 pr-4 cursor-pointer hover:text-white transition-colors"
                    >
                        <option value="all" className="bg-slate-900">All Types</option>
                        <option value="flashcards" className="bg-slate-900">Flashcards</option>

                        <option value="summary" className="bg-slate-900">Summaries</option>
                        <option value="mcq" className="bg-slate-900">MCQs</option>
                        <option value="review" className="bg-slate-900">Code Reviews</option>
                        <option value="explain" className="bg-slate-900">Code Explains</option>
                        <option value="analysis" className="bg-slate-900">Data Analysis</option>
                        <option value="visualize" className="bg-slate-900">Data Visualizer</option>
                    </select>

                    <button
                        onClick={onDeleteAll}
                        className="ml-2 mr-1 px-3 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold border border-red-500/20 flex items-center gap-2"
                        title="Delete all content"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Delete All</span>
                    </button>
                </div>
            </div>

            {filteredContent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent.map((item) => {
                        const typeInfo = CONTENT_TYPES[item.type] || { label: item.type, icon: FileText, color: 'text-slate-400', border: 'border-slate-500/50' };
                        const Icon = typeInfo.icon;
                        const date = new Date(item.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });

                        return (
                            <div key={item._id} className="group relative bg-slate-900 border border-white/5 rounded-2xl p-0 hover:bg-slate-800/80 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 overflow-hidden flex flex-col h-full">
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-2xl bg-slate-950/50 border border-white/5 ${typeInfo.color} group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-950/50 px-2 py-1 rounded-md border border-white/5">
                                            {typeInfo.label}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                        {item.meta?.topic || `${typeInfo.label} Generation`}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Created on {date}
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-950/30 border-t border-white/5 flex items-center justify-between gap-3">
                                    <Link
                                        to={`/results/${item._id}`}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-600/10 text-indigo-400 text-sm font-medium hover:bg-indigo-600 hover:text-white transition-all group/btn"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span>View Details</span>
                                    </Link>
                                    <button
                                        onClick={() => onDelete(item._id)}
                                        className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                                        title="Delete Item"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-3xl border border-dashed border-white/10 text-center">
                    <div className="p-4 bg-slate-800/50 rounded-full mb-4">
                        <FolderOpen className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Your library is empty</h3>
                    <p className="text-slate-400 max-w-xs mx-auto mb-6">You haven't generated any content yet. Go to the "Create New" tab to get started.</p>
                    <button
                        onClick={() => setActiveTab('create')}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
                    >
                        Create Content
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default MyLibrary;
