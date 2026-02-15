import apiClient from '../../../services/api/client';
import { type AuthResponse, type PlatformUser } from '../../../types/auth.types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>('/api/platform/v1/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async (): Promise<PlatformUser> => {
    try {
        const response = await apiClient.get<PlatformUser>('/api/platform/v1/auth/me');
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
