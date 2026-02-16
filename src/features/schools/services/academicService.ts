import { academicStructureApi } from '../../../api/services';
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

export const getAcademicYears = async (schoolId: string): Promise<AcademicYear[]> => {
    const response = await academicStructureApi.getYears({ schoolId });
    return response.data.map(year => ({
        id: year.id!,
        name: year.name,
        startDate: year.startDate,
        endDate: year.endDate,
        active: !!year.current,
        schoolId: year.schoolId
    }));
};

export const createAcademicYear = async (schoolId: string, data: CreateAcademicYearRequest): Promise<AcademicYear> => {
    const response = await academicStructureApi.createYear({
        schoolId,
        academicYear: {
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            current: data.active,
            schoolId: schoolId
        } as any
    });
    const year = response.data;
    return {
        id: year.id!,
        name: year.name,
        startDate: year.startDate,
        endDate: year.endDate,
        active: !!year.current,
        schoolId: year.schoolId
    };
};

export const getClasses = async (schoolId: string): Promise<SchoolClass[]> => {
    const response = await academicStructureApi.getClasses({ schoolId });
    return response.data as any[];
};

export const createClass = async (schoolId: string, data: CreateClassRequest): Promise<SchoolClass> => {
    const response = await academicStructureApi.createClass({ schoolId, schoolClass: data as any });
    return response.data as any;
};

export const getSections = async (schoolId: string, classId: number): Promise<Section[]> => {
    const response = await academicStructureApi.getSections({ schoolId, classId });
    return response.data as any[];
};

export const createSection = async (schoolId: string, classId: number, data: CreateSectionRequest): Promise<Section> => {
    const response = await academicStructureApi.createSection({ schoolId, classId, section: data as any });
    return response.data as any;
};

export const getSubjects = async (schoolId: string): Promise<Subject[]> => {
    const response = await academicStructureApi.getSubjects({ schoolId });
    return response.data as any[];
};

export const createSubject = async (schoolId: string, data: CreateSubjectRequest): Promise<Subject> => {
    const response = await academicStructureApi.createSubject({ schoolId, subject: data as any });
    return response.data as any;
};
