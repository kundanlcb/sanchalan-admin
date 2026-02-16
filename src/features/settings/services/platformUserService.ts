import { apiClient } from '../../../services/api/client';
import type { PlatformUser, CreatePlatformUserRequest } from '../types/platformUser.types';

const BASE_URL = '/api/platform/v1/users';

export const getPlatformUsers = async (): Promise<PlatformUser[]> => {
    const response = await apiClient.get<PlatformUser[]>(BASE_URL);
    return response.data;
};

export const createPlatformUser = async (data: CreatePlatformUserRequest): Promise<PlatformUser> => {
    const response = await apiClient.post<PlatformUser>(BASE_URL, data);
    return response.data;
};

export const deletePlatformUser = async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
};
