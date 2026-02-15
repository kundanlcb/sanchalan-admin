import apiClient from '../../../services/api/client';
import { type AuthResponse } from '../../../types/auth.types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await apiClient.post('/auth/logout');
    } catch (error) {
        console.error('Logout failed', error);
    }
};

export const refreshToken = async (): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/auth/refresh');
        return response.data;
    } catch (error) {
        throw error;
    }
};
