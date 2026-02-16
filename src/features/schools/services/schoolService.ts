import { schoolApi } from '../../../api/services';
import { type School, type CreateSchoolRequest, type SchoolListResponse } from '../types/school.types';

export const getSchools = async (page = 0, size = 10): Promise<SchoolListResponse> => {
    try {
        const response = await schoolApi.getAllSchools();
        const allSchools = response.data;

        // Mock pagination since backend returns full list
        const start = page * size;
        const end = start + size;
        const paginatedSchools = allSchools.slice(start, end) as School[];

        return {
            content: paginatedSchools,
            totalElements: allSchools.length,
            totalPages: Math.ceil(allSchools.length / size),
            size: size,
            number: page
        };
    } catch (error) {
        throw error;
    }
};

export const createSchool = async (data: CreateSchoolRequest): Promise<School> => {
    try {
        const response = await schoolApi.createSchool({ school: data });
        return response.data as School;
    } catch (error) {
        throw error;
    }
};

export const getSchoolById = async (id: string): Promise<School> => {
    try {
        const response = await schoolApi.getSchoolById({ schoolId: id });
        return response.data as School;
    } catch (error) {
        throw error;
    }
}

import apiClient from '../../../services/api/client';

export const updateSchool = async (id: string, data: Partial<CreateSchoolRequest>): Promise<School> => {
    try {
        const response = await apiClient.put(`/api/platform/v1/schools/${id}`, data);
        return response.data as School;
    } catch (error) {
        throw error;
    }
};

export const transitionSchoolStatus = async (id: string, status: School['status']): Promise<School> => {
    try {
        if (!status) throw new Error("Status is required");
        // Status enum is passed as string body
        const response = await schoolApi.transitionStatus({ schoolId: id, body: status });
        return response.data as School;
    } catch (error) {
        throw error;
    }
};

export const bootstrapAdmin = async (schoolId: string, data: import('../types/school.types').BootstrapAdminRequest): Promise<void> => {
    try {
        await schoolApi.bootstrapAdmin({ schoolId, bootstrapAdminRequest: data });
    } catch (error) {
        throw error;
    }
};
