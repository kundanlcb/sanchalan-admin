import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import * as authService from './authService';
import { type AuthContextType, type PlatformUser } from '../../../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<PlatformUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('platformUser');
        const storedToken = sessionStorage.getItem('platformAuthToken');

        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user', e);
                sessionStorage.removeItem('platformUser');
                sessionStorage.removeItem('platformAuthToken');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await authService.login(email, password);
            // Assuming response structure matches AuthResponse
            const userData = response.user;
            const token = response.token;

            sessionStorage.setItem('platformAuthToken', token);
            sessionStorage.setItem('platformUser', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
        } finally {
            sessionStorage.removeItem('platformAuthToken');
            sessionStorage.removeItem('platformUser');
            setUser(null);
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
