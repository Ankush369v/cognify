import React from 'react';
import {
    Activity, Box, Calendar, CheckCircle2, TrendingDown, TrendingUp, Users, Brain, Info, ListChecks, DollarSign, Layers, BarChart2
} from 'lucide-react';
import {
    ResponsiveContainer, BarChart, Bar, LineChart, Line,
    AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    ScatterChart, Scatter, Treemap
} from 'recharts';

const DashboardResult = ({ content }) => {
    if (typeof content.data === 'string') {
        return (
            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Info className="w-6 h-6 text-red-400" />
                    <h2 className="text-xl font-bold text-red-400">Analysis Notice</h2>
                </div>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{content.data}</p>
            </div>
        );
    }

    const data = content.data || {};
    const { dashboard_title, kpis = [], visualizations = [] } = data;
    const scentific_summary = data.scentific_summary || data.executive_summary;
    const {
        data_quality_audit,
        market_trends,
        anomalies = [],
        recommendations = [],
        statistical_insights = [],
        segmentation_analysis
    } = data;

    const KPICard = ({ kpi }) => {
        const Icon = {
            dollar: DollarSign,
            users: Users,
            activity: Activity,
            'trending-up': TrendingUp,
            box: Box,
            calendar: Calendar,
            layers: Layers
        }[kpi.icon] || Activity;

        const isPositive = kpi.trend === 'up';
        const isNeutral = kpi.trend === 'neutral';

        return (
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border ${isPositive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : isNeutral ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {kpi.change}
                    </div>
                </div>
                <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">{kpi.label}</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{kpi.value}</h3>
                </div>
            </div>
        );
    };



    const renderChartContent = (chart, index) => {
        const colors = chart.colors || ["#6366f1", "#14b8a6", "#a855f7", "#ec4899", "#f59e0b"];

        switch (chart.type) {
            case 'radar':
                return (
                    <ResponsiveContainer width="100%" height={300} minHeight={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chart.data}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <Radar name={chart.title} dataKey="value" stroke={colors[0]} fill={colors[0]} fillOpacity={0.4} />
                            <Legend />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#f8fafc', fontSize: '12px' }} labelStyle={{ color: '#94a3b8', marginBottom: '8px' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                );
            case 'scatter':
                return (
                    <ResponsiveContainer width="100%" height={300} minHeight={300}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                            <XAxis type="number" dataKey="x" name="X" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis type="number" dataKey="y" name="Y" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#f8fafc', fontSize: '12px' }} labelStyle={{ color: '#94a3b8', marginBottom: '8px' }} />
                            <Scatter name={chart.title} data={chart.data} fill={colors[0] || "#10b981"} />
                        </ScatterChart>
                    </ResponsiveContainer>
                );
            case 'treemap':
                return (
                    <ResponsiveContainer width="100%" height={300} minHeight={300}>
                        <Treemap data={chart.data} dataKey="value" aspectRatio={4 / 3} stroke="#0f172a" fill={colors[0] || "#6366f1"}>
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#f8fafc', fontSize: '12px' }} labelStyle={{ color: '#94a3b8', marginBottom: '8px' }} />
                        </Treemap>
                    </ResponsiveContainer>
                );
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={300} minHeight={300}>
                        <PieChart>
                            <Pie data={chart.data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {chart.data?.map((entry, i) => (
                                    <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#f8fafc', fontSize: '12px' }} labelStyle={{ color: '#94a3b8', marginBottom: '8px' }} />
                            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case 'area':
                return (
                    <ResponsiveContainer width="100%" height={300} minHeight={300}>
                        <AreaChart data={chart.data} margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                            <defs>
                                <linearGradient id={`color-${index}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={chart.themeColor === 'teal' ? '#14b8a6' : '#6366f1'} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={chart.themeColor === 'teal' ? '#14b8a6' : '#6366f1'} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.5} />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#f8fafc', fontSize: '12px' }} labelStyle={{ color: '#94a3b8', marginBottom: '8px' }} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area type="monotone" dataKey="value" stroke={chart.themeColor === 'teal' ? '#14b8a6' : '#6366f1'} fillOpacity={1} fill={`url(#color-${index})`} strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                );
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={300} minHeight={300}>
                        <LineChart data={chart.data} margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.5} />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#f8fafc', fontSize: '12px' }} labelStyle={{ color: '#94a3b8', marginBottom: '8px' }} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Line type="monotone" dataKey="value" stroke={chart.themeColor === 'teal' ? '#14b8a6' : chart.themeColor === 'purple' ? '#a855f7' : '#6366f1'} strokeWidth={3} dot={{ fill: '#0f172a', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            default: // bar
                return (
                    <ResponsiveContainer width="100%" height={300} minHeight={300}>
                        <BarChart data={chart.data} margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.5} />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#f8fafc', fontSize: '12px' }} labelStyle={{ color: '#94a3b8', marginBottom: '8px' }} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Bar dataKey="value" fill={chart.themeColor === 'teal' ? '#14b8a6' : chart.themeColor === 'purple' ? '#a855f7' : chart.themeColor === 'emerald' ? '#10b981' : '#6366f1'} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                );
        }
    };

    const SectionHeader = ({ icon: Icon, title, color }) => (
        <h3 className={`text-lg font-bold text-white mb-6 border-b border-white/5 pb-4 ${color} uppercase tracking-widest text-xs flex items-center gap-2`}>
            <Icon className="w-4 h-4" /> {title}
        </h3>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-3 bg-indigo-500 rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/20">
                        <BarChart2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-3xl font-bold text-white mb-2 leading-tight">{dashboard_title || "Analytics Dashboard"}</h1>
                        <div className="flex flex-wrap gap-2 sm:gap-4 mb-3">
                            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">
                                {data.dataset_overview?.rows || 0} Records Analyzed
                            </span>
                            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-bold text-purple-400 uppercase tracking-tighter">
                                {data.dataset_overview?.columns || 0} Attributes
                            </span>
                        </div>
                        <p className="text-sm sm:text-lg text-slate-400 font-light leading-relaxed max-w-4xl">
                            {typeof scentific_summary === 'string' ? scentific_summary : (scentific_summary?.text || scentific_summary?.summary || "No executive summary available for this dataset.")}
                        </p>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            {kpis.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, i) => <KPICard key={i} kpi={kpi} />)}
                </div>
            )}

            {/* Dataset Preview */}
            {content.preview && content.preview.length > 0 && (
                <div className="bg-slate-900/40 border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 backdrop-blur-sm overflow-hidden">
                    <SectionHeader icon={Layers} title="Dataset Snapshot" color="text-indigo-300" />
                    <div className="overflow-x-auto overflow-y-auto rounded-xl border border-white/5 max-h-72">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    {Object.keys(content.preview[0]).map((header, idx) => (
                                        <th key={idx} className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {content.preview.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        {Object.values(row).map((val, j) => (
                                            <td key={j} className="px-4 py-3 text-sm text-slate-300 font-light">{String(val)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min">
                {visualizations.map((chart, i) => (
                    <div
                        key={chart.id || i}
                        className={`bg-slate-900/50 border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 backdrop-blur-sm flex flex-col group hover:border-white/10 transition-all ${chart.layout === 'full' ? 'lg:col-span-2 xl:col-span-2' : ''}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors uppercase tracking-tight">{chart.title}</h3>
                                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-light">{chart.description}</p>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            {renderChartContent(chart, i)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Extended Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    {data_quality_audit && (
                        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                            <SectionHeader icon={CheckCircle2} title="Data Health Audit" color="text-emerald-400" />
                            <div className="flex items-center gap-6">
                                <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-emerald-500/20">
                                    <span className="text-2xl font-bold text-white">{data_quality_audit.score}%</span>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">{data_quality_audit.details}</p>
                            </div>
                        </div>
                    )}
                    {statistical_insights?.length > 0 && (
                        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                            <SectionHeader icon={Brain} title="Deep Statistical Insights" color="text-purple-400" />
                            <div className="space-y-4">
                                {statistical_insights.map((stat, i) => (
                                    <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <h4 className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-1">{typeof stat === 'object' ? stat.title : 'Discovery'}</h4>
                                        <p className="text-slate-300 text-sm leading-relaxed">{typeof stat === 'object' ? stat.text : stat}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {market_trends?.details?.length > 0 && (
                        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                            <SectionHeader icon={TrendingUp} title="Market & Trend Analysis" color="text-indigo-400" />
                            <div className="space-y-4">
                                {market_trends.details.map((trend, i) => (
                                    <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                        <h4 className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1">{typeof trend === 'object' ? trend.title : 'Pattern'}</h4>
                                        <p className="text-slate-300 text-sm leading-relaxed italic">{typeof trend === 'object' ? trend.text : trend}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {segmentation_analysis && (
                        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                            <SectionHeader icon={Users} title="Segmentation & Classification" color="text-blue-400" />
                            <p className="text-slate-400 text-sm leading-relaxed italic">{segmentation_analysis}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {anomalies?.length > 0 && (
                    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                        <SectionHeader icon={Info} title="Anomalies & Deviations" color="text-orange-400" />
                        <div className="space-y-4">
                            {anomalies.map((anomaly, i) => (
                                <div key={i} className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
                                    <h4 className="text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-1">{typeof anomaly === 'object' ? anomaly.title : 'Unusual Activity'}</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">{typeof anomaly === 'object' ? anomaly.text : anomaly}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {recommendations?.length > 0 && (
                    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                        <SectionHeader icon={ListChecks} title="Actionable Guidance" color="text-teal-400" />
                        <div className="space-y-4">
                            {recommendations.map((rec, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl items-start">
                                    <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</span>
                                    <div className="pt-1">
                                        <p className="text-slate-300 text-sm leading-relaxed">{typeof rec === 'object' ? (rec.text || JSON.stringify(rec)) : rec}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardResult;
