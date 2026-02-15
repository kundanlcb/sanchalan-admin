import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardMetrics, getRecentActivity } from '../services/dashboardService';
import {
    School as SchoolIcon,
    CreditCard,
    Clock,
    TrendingUp,
    CheckCircle2,
    PlusCircle,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardHome: React.FC = () => {
    const { data: metrics, isLoading: metricsLoading } = useQuery({
        queryKey: ['dashboard-metrics'],
        queryFn: getDashboardMetrics,
    });

    const { data: activities, isLoading: activitiesLoading } = useQuery({
        queryKey: ['recent-activity'],
        queryFn: getRecentActivity,
    });

    if (metricsLoading || activitiesLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-gray-100 rounded-xl" />
                ))}
            </div>
        );
    }

    const cards = [
        { title: 'Total Schools', value: metrics?.totalSchools, icon: SchoolIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Active Subscriptions', value: metrics?.activeSubscriptions, icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
        { title: 'Pending Onboarding', value: metrics?.pendingOnboarding, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { title: 'Estimated Revenue', value: `₹${metrics?.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${card.bg}`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">Recent Activity</h3>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {activities?.map((activity) => (
                            <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-start gap-4">
                                <div className="mt-1">
                                    {activity.type === 'SCHOOL_CREATED' && <PlusCircle className="w-5 h-5 text-blue-500" />}
                                    {activity.type === 'IMPORT_COMPLETED' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                                    <p className="text-[10px] text-gray-400 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links / Shortcuts */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-6">Quick Links</h3>
                    <div className="space-y-3">
                        <Link to="/schools/new" className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                            <span className="text-sm font-medium text-gray-700">Add New School</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/subscriptions" className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                            <span className="text-sm font-medium text-gray-700">Manage Plans</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/support" className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                            <span className="text-sm font-medium text-gray-700">Support Center</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Internal Button component for now if common Button is not exported or different
const Button = ({ children, variant, size, className }: any) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = variant === 'ghost' ? "hover:bg-gray-100 hover:text-gray-900" : "bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90";
    const sizeClasses = size === 'sm' ? "h-8 px-3 text-xs" : "h-9 px-4 py-2 text-sm";

    return (
        <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
            {children}
        </button>
    );
};
