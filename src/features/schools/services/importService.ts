import apiClient from '../../../services/api/client';
import type { ImportJob, ImportType } from '../types/import.types';

const BASE_URL = '/schools';

export const uploadImportFile = async (schoolId: string, type: ImportType, file: File): Promise<ImportJob> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await apiClient.post<ImportJob>(
        `${BASE_URL}/${schoolId}/imports`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

// Placeholder for polling status if implemented in backend
export const getImportStatus = async (schoolId: string, jobId: string): Promise<ImportJob> => {
    // This endpoint might need to be adjusted based on actual backend implementation
    // Assuming a generic job status endpoint or sub-resource
    const response = await apiClient.get<ImportJob>(`${BASE_URL}/${schoolId}/imports/${jobId}`);
    return response.data;
};
