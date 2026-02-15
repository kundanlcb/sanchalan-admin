import apiClient from '../../../services/api/client';
import type {
    AcademicYear,
    SchoolClass,
    Section,
    Subject,
    CreateAcademicYearRequest,
    CreateClassRequest,
    CreateSectionRequest,
    CreateSubjectRequest
} from '../types/academic.types';

const BASE_URL = '/schools';

export const getAcademicYears = async (schoolId: string): Promise<AcademicYear[]> => {
    const response = await apiClient.get<AcademicYear[]>(`${BASE_URL}/${schoolId}/academic/years`);
    return response.data;
};

export const createAcademicYear = async (schoolId: string, data: CreateAcademicYearRequest): Promise<AcademicYear> => {
    const response = await apiClient.post<AcademicYear>(`${BASE_URL}/${schoolId}/academic/years`, data);
    return response.data;
};

export const getClasses = async (schoolId: string): Promise<SchoolClass[]> => {
    const response = await apiClient.get<SchoolClass[]>(`${BASE_URL}/${schoolId}/academic/classes`);
    return response.data;
};

export const createClass = async (schoolId: string, data: CreateClassRequest): Promise<SchoolClass> => {
    const response = await apiClient.post<SchoolClass>(`${BASE_URL}/${schoolId}/academic/classes`, data);
    return response.data;
};

export const getSections = async (schoolId: string, classId: number): Promise<Section[]> => {
    const response = await apiClient.get<Section[]>(`${BASE_URL}/${schoolId}/academic/classes/${classId}/sections`);
    return response.data;
};

export const createSection = async (schoolId: string, classId: number, data: CreateSectionRequest): Promise<Section> => {
    const response = await apiClient.post<Section>(`${BASE_URL}/${schoolId}/academic/classes/${classId}/sections`, data);
    return response.data;
};

export const getSubjects = async (schoolId: string): Promise<Subject[]> => {
    const response = await apiClient.get<Subject[]>(`${BASE_URL}/${schoolId}/academic/subjects`);
    return response.data;
};

export const createSubject = async (schoolId: string, data: CreateSubjectRequest): Promise<Subject> => {
    const response = await apiClient.post<Subject>(`${BASE_URL}/${schoolId}/academic/subjects`, data);
    return response.data;
};
