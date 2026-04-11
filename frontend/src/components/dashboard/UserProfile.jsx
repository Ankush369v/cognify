import React from 'react';
import { motion } from 'framer-motion';
import { User, BadgeCheck, Sparkles, Layers } from 'lucide-react';

const UserProfile = ({ user, setUser, editMode, setEditMode, handleLogout, onUpdate, contentsCount }) => {
    const [formData, setFormData] = React.useState({ name: user.name, email: user.email });

    React.useEffect(() => {
        setFormData({ name: user.name, email: user.email });
    }, [user]);

    const handleSave = () => {
        onUpdate(formData);
    };

    const toggleEdit = () => {
        if (editMode) {
            // Cancel case: reset local form
            setFormData({ name: user.name, email: user.email });
        }
        setEditMode(!editMode);
    };
    return (
        <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-4xl mx-auto"
        >
            <div className="relative mb-20">
                {/* Balanced Cover Banner */}
                <div className="h-64 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                    {/* Richer Dark Gradient Base with Animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-slate-800 to-purple-800 animate-slow-pan" />

                    {/* Secondary Layer for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-rose-900/40" />

                    {/* Subtle Animated Blobs - Not Too Bright */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 mix-blend-screen animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 mix-blend-screen" />
                    <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-pink-500/20 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '1.5s' }} />

                    {/* Subtle Floating Particles */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" />
                        <div className="absolute top-32 right-32 w-1 h-1 bg-cyan-300/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                        <div className="absolute bottom-24 left-40 w-1.5 h-1.5 bg-pink-300/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                        <div className="absolute bottom-32 right-24 w-1 h-1 bg-purple-300/50 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                    </div>

                    {/* Grid Pattern - Kept as Original */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                    {/* Subtle Noise Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

                    {/* Shimmer Effect on Hover - Subtle */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    {/* Bottom Fade for Profile Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    {/* Subtle Outer Glow - Only on Hover */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Profile Header Card */}
                <div className="absolute -bottom-16 left-6 right-6 flex items-end justify-between">
                    <div className="flex items-end gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-[2rem] bg-slate-950 p-2 shadow-2xl ring-4 ring-slate-900/50">
                                <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-5xl font-bold text-white shadow-inner">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-slate-900 p-1.5 rounded-2xl border border-white/10 shadow-lg">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-4xl font-bold text-white tracking-tight">{user.name}</h1>
                                <BadgeCheck className="w-6 h-6 text-blue-400 fill-blue-500/10" />
                            </div>
                            <p className="text-slate-400 font-medium text-lg">{user.email}</p>
                        </div>
                    </div>
                    <div className="mb-4 hidden sm:flex gap-3">
                        {editMode && (
                            <button
                                onClick={toggleEdit}
                                className="px-5 py-2.5 rounded-xl font-medium transition-all bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            onClick={editMode ? handleSave : toggleEdit}
                            className={`px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg flex items-center gap-2 ${editMode
                                ? 'bg-indigo-600 text-white shadow-indigo-500/20 hover:bg-indigo-500'
                                : 'bg-white text-slate-900 hover:bg-slate-200'
                                }`}
                        >
                            {editMode ? (
                                <>
                                    <Sparkles className="w-4 h-4" /> Save Changes
                                </>
                            ) : (
                                "Edit Profile"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Stats Column */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Usage Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400"><Layers className="w-4 h-4" /></div>
                                    <span className="text-sm font-medium text-slate-300">Generated</span>
                                </div>
                                <span className="text-lg font-bold text-white">{contentsCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Column */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-xl font-bold text-white">Personal Information</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Username</label>
                                <input
                                    type="text"
                                    value={user.username || ''}
                                    disabled={true}
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-slate-400 focus:outline-none cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Display Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    disabled={!editMode}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled={!editMode}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-white mb-1">Sign Out</h3>
                            <p className="text-sm text-slate-500">Securely log out of your account on this device.</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-lg transition-colors text-sm"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UserProfile;
