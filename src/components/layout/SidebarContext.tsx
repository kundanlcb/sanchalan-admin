import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface SidebarContextType {
    isSidebarOpen: boolean;
    isCollapsed: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);
    const toggleCollapsed = () => setIsCollapsed(prev => !prev);

    return (
        <SidebarContext.Provider value={{
            isSidebarOpen,
            isCollapsed,
            toggleSidebar,
            closeSidebar,
            toggleCollapsed
        }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error('useSidebar must be used within SidebarProvider');
    return context;
};
