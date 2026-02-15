import React from 'react';
import { Menu, LogOut, User as UserIcon } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import { useAuth } from '../../features/auth/services/authContext';
// import { ThemeToggle } from '../common/ThemeToggle'; // Omitted for MVP

export const Header: React.FC = () => {
    const { toggleSidebar } = useSidebar();
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                    <Menu className="w-6 h-6" />
                </button>
                <div className="font-bold text-xl text-blue-600">Sanchalak Admin</div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        {user?.fullName?.charAt(0) || <UserIcon className="w-4 h-4" />}
                    </div>
                    <div className="hidden sm:block text-sm">
                        <div className="font-medium">{user?.fullName}</div>
                        <div className="text-xs text-gray-500">{user?.role}</div>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
                    title="Logout"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};
