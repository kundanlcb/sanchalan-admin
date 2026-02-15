import React from 'react';
import { DashboardHome } from '../features/dashboard/components/DashboardHome';

export const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
                <p className="text-gray-500">Real-time metrics and recently active schools</p>
            </div>

            <DashboardHome />
        </div>
    );
};
