import React, { useState } from 'react';
import { PlatformUserList } from '../features/settings/components/PlatformUserList';
import { UserCog, Settings as SettingsIcon } from 'lucide-react';

export const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'general'>('users');

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-100 rounded-lg">
                    <SettingsIcon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-500">Manage platform configuration and access control.</p>
                </div>
            </div>

            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'users'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                >
                    <UserCog className="w-4 h-4" />
                    User Management
                </button>
                <button
                    onClick={() => setActiveTab('general')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'general'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                >
                    <SettingsIcon className="w-4 h-4" />
                    General
                </button>
            </div>

            {activeTab === 'users' && <PlatformUserList />}

            {activeTab === 'general' && (
                <div className="bg-white p-8 rounded-lg border border-gray-200 text-center text-gray-500">
                    <SettingsIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
                    <p>Platform-wide configuration settings coming soon.</p>
                </div>
            )}
        </div>
    );
};
