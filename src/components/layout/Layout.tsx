import React, { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '../../utils/cn';
import { useSidebar } from './SidebarContext';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isCollapsed } = useSidebar();

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar />
                <main className={cn(
                    "flex-1 overflow-y-auto p-4 lg:p-6 pb-20 transition-all duration-300",
                    isCollapsed ? "lg:ml-16" : "lg:ml-64"
                )}>
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
