import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    School,
    Wallet,
    LifeBuoy,
    Settings,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    ListTodo,
    X
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useSidebar } from './SidebarContext';
import { useAuth } from '../../features/auth/services/authContext';

const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Schools', path: '/schools', icon: School },
    { name: 'Finance', path: '/finance', icon: Wallet },
    { name: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
    { name: 'Features', path: '/features', icon: ListTodo },
    { name: 'Support', path: '/support', icon: LifeBuoy },
    { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
    const { isSidebarOpen, closeSidebar, isCollapsed, toggleCollapsed } = useSidebar();
    const { } = useAuth(); // Can use to hide items based on Platform Role if needed

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            <aside
                className={cn(
                    'fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50',
                    'lg:top-16 lg:h-[calc(100vh-4rem)]',
                    isCollapsed ? 'lg:w-16' : 'lg:w-64',
                    isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
                )}
            >
                <div className="flex items-center justify-between p-4 lg:hidden">
                    <span className="font-bold text-xl">Menu</span>
                    <button onClick={closeSidebar}><X className="w-5 h-5" /></button>
                </div>

                <button
                    onClick={toggleCollapsed}
                    className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm hover:bg-gray-50"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => closeSidebar()}
                            className={({ isActive }) => cn(
                                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-100',
                                isCollapsed && 'lg:justify-center'
                            )}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className={cn(
                                'font-medium transition-opacity duration-300',
                                isCollapsed ? 'lg:opacity-0 lg:w-0 overflow-hidden' : 'opacity-100'
                            )}>
                                {item.name}
                            </span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};
