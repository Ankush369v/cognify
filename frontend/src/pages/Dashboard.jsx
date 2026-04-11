import React, { useState, useEffect } from 'react';
import { LayoutDashboard, User, FolderOpen, Sparkles, LogOut, ChevronRight, PlusCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Tab Components
import CreateContent from '../components/dashboard/CreateContent';
import MyLibrary from '../components/dashboard/MyLibrary';
import UserProfile from '../components/dashboard/UserProfile';
import api from '../api/axios';

const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('create');
    const [filterType, setFilterType] = useState('all');
    const [user, setUser] = useState(null);
    const [contents, setContents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Tool State
    const [activeToolInfo, setActiveToolInfo] = useState('generate');
    const [selectedModel, setSelectedModel] = useState('llama-3.1');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, contentsRes] = await Promise.all([
                    api.get('/dashboard/profile'),
                    api.get('/dashboard')
                ]);
                setUser(profileRes.data.user);
                setContents(contentsRes.data.contents || []);
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        const tab = searchParams.get('tab');
        const tool = searchParams.get('tool');
        if (tab) setActiveTab(tab);
        if (tool) setActiveToolInfo(tool);
    }, [searchParams, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    };

    const filteredContent = filterType === 'all'
        ? contents
        : contents.filter(item => item.type === filterType);

    const handleModelChange = (model) => {
        setSelectedModel(model);
        localStorage.setItem('selectedModel', model);
    };

    const handleProfileUpdate = async (updatedData) => {
        try {
            const response = await api.post('/dashboard/profile', updatedData);
            setUser(response.data.user);
            setEditMode(false);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Profile update failed", err);
            alert(err.response?.data?.error || "Update failed");
        }
    };

    const handleDeleteContent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            const response = await api.delete(`/dashboard/delete/${id}`);
            if (response.data.success) {
                setContents(contents.filter(c => c._id !== id));
            }
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete item.");
        }
    };

    const handleDeleteAll = async () => {
        if (!window.confirm("WARNING: Are you sure you want to delete ALL your generated content? This action cannot be undone.")) return;

        try {
            const response = await api.delete('/dashboard/delete-all');
            if (response.data.success) {
                setContents([]);
                alert("All content deleted successfully.");
            }
        } catch (err) {
            console.error("Delete all failed", err);
            alert(err.response?.data?.error || "Failed to delete all items.");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 flex font-outfit pt-20 relative">

            {/* Sidebar Toggle Button (Floating when closed) */}
            <AnimatePresence>
                {!isSidebarOpen && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={() => setIsSidebarOpen(true)}
                        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 p-2 bg-indigo-600 rounded-r-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-colors"
                        title="Open Sidebar"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Sidebar Navigation */}
            <AnimatePresence mode='wait'>
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 288, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed left-0 top-20 h-[calc(100vh-5rem)] bg-slate-950 border-r border-white/5 p-6 z-40 hidden md:flex flex-col overflow-hidden whitespace-nowrap"
                    >
                        <div className="flex items-center justify-between mb-10 pl-2">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                <span className="font-bold text-slate-200 tracking-wide uppercase text-sm">
                                    AI Studio
                                </span>
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                                title="Collapse Sidebar"
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" />
                            </button>
                        </div>

                        <nav className="space-y-2 flex-1">
                            <button
                                onClick={() => setActiveTab('create')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'create' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <PlusCircle className="w-5 h-5 min-w-[20px]" />
                                <span className="font-medium">Create New</span>
                                {activeTab === 'create' && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <FolderOpen className="w-5 h-5 min-w-[20px]" />
                                <span className="font-medium">My Library</span>
                                {activeTab === 'overview' && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <User className="w-5 h-5 min-w-[20px]" />
                                <span className="font-medium">Profile</span>
                                {activeTab === 'profile' && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                            </button>
                        </nav>

                        {user && (
                            <div className="pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white min-w-[32px]">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] md:hidden mt-20"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 210 }}
                            className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-[280px] bg-slate-950/95 backdrop-blur-xl border-r border-white/10 z-[101] md:hidden p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="text-sm tracking-widest">DASHBOARD</span>
                                </div>
                            </div>

                            <nav className="space-y-4 flex-1">
                                <button
                                    onClick={() => { setActiveTab('create'); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'create' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    <span className="font-medium">Create New</span>
                                </button>
                                <button
                                    onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}
                                >
                                    <FolderOpen className="w-5 h-5" />
                                    <span className="font-medium">My Library</span>
                                </button>
                                <button
                                    onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Profile</span>
                                </button>
                            </nav>

                            {user && (
                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3 px-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate">{user.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full mt-6 flex items-center gap-2 text-red-400 p-4 rounded-xl hover:bg-red-500/10 transition-all font-bold text-sm"
                                    >
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <motion.main
                className={`relative w-full min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:pl-72' : 'md:pl-0'}`}
            >
                {/* Mobile Header (Hidden on Desktop) */}
                <header className="md:hidden sticky top-20 z-[45] bg-[#020617]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="font-bold text-sm tracking-widest text-slate-400 uppercase">
                            {activeTab.replace('-', ' ')}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 text-indigo-400 hover:text-white bg-indigo-500/10 rounded-lg border border-indigo-500/20"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                    </button>
                </header>

                <div className="p-6 lg:p-10 max-w-7xl mx-auto">
                    <AnimatePresence mode='wait'>
                        {activeTab === 'create' && (
                            <CreateContent
                                selectedModel={selectedModel}
                                onModelChange={handleModelChange}
                                activeToolInfo={activeToolInfo}
                                setActiveToolInfo={setActiveToolInfo}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                        )}

                        {activeTab === 'overview' && (
                            <MyLibrary
                                filteredContent={filteredContent}
                                filterType={filterType}
                                setFilterType={setFilterType}
                                setActiveTab={setActiveTab}
                                onDelete={handleDeleteContent}
                                onDeleteAll={handleDeleteAll}
                            />
                        )}

                        {activeTab === 'profile' && (
                            <UserProfile
                                user={user}
                                setUser={setUser}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                handleLogout={handleLogout}
                                onUpdate={handleProfileUpdate}
                                contentsCount={contents.length}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </motion.main>
        </div>
    );
};

export default Dashboard;
