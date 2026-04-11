
const renderDataVisualizationDashboard = () => {
    const data = content.data || {};
    const { dashboard_title, scentific_summary, kpis = [], visualizations = [] } = data;

    const KPICard = ({ kpi }) => {
        const Icon = {
            dollar: DollarSign,
            users: Users,
            activity: Activity,
            'trending-up': TrendingUp,
            box: Box,
            calendar: Calendar
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

    const renderChartContent = (chart) => {
        const colors = chart.colors || ["#6366f1", "#14b8a6", "#a855f7", "#ec4899", "#f59e0b"];
        const CommonTooltip = () => (
            <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: '#f8fafc', fontSize: '12px' }}
                labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
            />
        );

        switch (chart.type) {
            case 'radar':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chart.data}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <Radar name={chart.title} dataKey="value" stroke={colors[0]} fill={colors[0]} fillOpacity={0.4} />
                            <Legend />
                            <CommonTooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                );
            case 'scatter':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                            <XAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis type="number" dataKey="value" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <CommonTooltip />
                            <Scatter name={chart.title} data={chart.data} fill={colors[0]} />
                        </ScatterChart>
                    </ResponsiveContainer>
                );
            case 'funnel':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <FunnelChart>
                            <CommonTooltip />
                            <Funnel dataKey="value" data={chart.data} isAnimationActive>
                                {chart.data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Funnel>
                        </FunnelChart>
                    </ResponsiveContainer>
                );
            case 'treemap':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <Treemap
                            data={chart.data}
                            dataKey="value"
                            aspectRatio={4 / 3}
                            stroke="#0f172a"
                            fill="#8884d8"
                        >
                            <CommonTooltip />
                        </Treemap>
                    </ResponsiveContainer>
                );
            case 'composed':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chart.data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.5} />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <CommonTooltip />
                            <Legend />
                            <Area type="monotone" dataKey="secondary" fill={colors[1]} stroke={colors[1]} fillOpacity={0.2} />
                            <Bar dataKey="value" barSize={20} fill={colors[0]} radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="value" stroke={colors[2] || "#fff"} dot={{ r: 4 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                );
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chart.data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chart.data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <CommonTooltip />
                            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                );
            default: // Default to Bar/Area/Line based on loose type matching or fallback
                const ChartComponent = chart.type && chart.type.includes('line') ? LineChart :
                    chart.type && chart.type.includes('area') ? AreaChart : BarChart;

                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <ChartComponent data={chart.data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.5} />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <CommonTooltip />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            {chart.type && chart.type.includes('area') ? (
                                <Area type="monotone" dataKey="value" stroke={colors[0]} fill={colors[0]} fillOpacity={0.3} />
                            ) : chart.type && chart.type.includes('line') ? (
                                <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={3} dot={{ r: 4 }} />
                            ) : (
                                <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]} />
                            )}
                        </ChartComponent>
                    </ResponsiveContainer>
                );
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
                        <BarChart2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{dashboard_title || "Analytics Dashboard"}</h1>
                        <p className="text-lg text-slate-300 font-light leading-relaxed max-w-4xl">{scentific_summary}</p>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            {kpis.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, i) => <KPICard key={i} kpi={kpi} />)}
                </div>
            )}

            {/* Visualization Grid (Bento Box Style) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[400px]">
                {visualizations.map((chart, i) => (
                    <div
                        key={chart.id || i}
                        className={`
                                bg-slate-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm flex flex-col group hover:border-white/10 transition-all
                                ${chart.layout === 'full' ? 'lg:col-span-2 xl:col-span-2' : ''}
                                ${chart.layout === 'third' ? 'xl:col-span-1' : ''}
                            `}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{chart.title}</h3>
                                <p className="text-sm text-slate-400 mt-1">{chart.description}</p>
                            </div>
                            <div className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <Share2 className="w-4 h-4 text-slate-400" />
                            </div>
                        </div>

                        <div className="flex-1 min-h-0 w-full">
                            {renderChartContent(chart)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
