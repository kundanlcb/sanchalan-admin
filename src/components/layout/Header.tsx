import { Menu, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import { useAuth } from '../../features/auth/services/authContext';
import { ThemeToggle } from '../common/ThemeToggle';

export const Header: React.FC = () => {
    const { toggleSidebar } = useSidebar();
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm transition-colors duration-200">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Mobile Menu Button + Logo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>

                    {/* Logo/Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                            <span className="text-white font-bold text-lg sm:text-xl">A</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
                                Sanchalak Admin
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Platform Administration</p>
                        </div>
                    </div>
                </div>

                {/* Right side: Theme toggle and user profile */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <ThemeToggle />

                    <div className="flex items-center gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors max-w-[140px] sm:max-w-none">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0 text-white font-bold">
                            {user?.fullName?.charAt(0) || <UserIcon className="w-4 h-4" />}
                        </div>
                        <div className="hidden md:block text-sm truncate">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                                {user?.fullName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.role}
                            </p>
                        </div>
                        <ChevronDown className="hidden sm:block w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    </div>

                    <button
                        onClick={logout}
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};
